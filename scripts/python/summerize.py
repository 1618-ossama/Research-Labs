
import torch
from pypdf import PdfReader
from transformers import pipeline, AutoTokenizer
import nltk
from nltk.tokenize import sent_tokenize
import os
import sys

PDF_PATH = "rust_research.pdf"  # Set your PDF file path here
MODEL_NAME = "google/pegasus-large"  # Recommended smaller model for CPU

# DEVICE is fixed to -1 (CPU) for non-GPU processing as requested.
DEVICE = -1

MAX_CHUNK_TOKENS_OVERRIDE = None  # Set to an integer like 500 if you want smaller chunks than the model allows

BATCH_SIZE = 8  # Batch size for parallel summarization. Keep lower for CPU (e.g., 4-16).
SUMMARY_RATIO = 0.25  # Target ratio of summary length to input chunk length
SUMMARY_MIN_LEN_FIXED = None
SUMMARY_MAX_LEN_FIXED = None

SUMMARY_PROMPT = ""  # Text to prepend to EACH chunk before sending to the model.
OUTPUT_FILE = None  # Output file path to save the final joined summary

# --- NLTK Download Check ---
try:
    nltk.data.find('tokenizers/punkt')
    print("[+] NLTK punkt tokenizer found.")
except LookupError:
    print("[+] NLTK punkt tokenizer not found. Downloading...")
    try:
        nltk.download('punkt', quiet=True)
        print("[+] Download 'punkt' complete.")
    except Exception as e:
        print(f"[!] Error downloading NLTK 'punkt' tokenizer: {e}")
        sys.exit(1)

try:
    nltk.data.find('tokenizers/punkt_tab')
    print("[+] NLTK punkt_tab resource found.")
except LookupError:
    print("[+] NLTK punkt_tab resource not found. Downloading...")
    try:
        nltk.download('punkt_tab', quiet=True)
        print("[+] Download 'punkt_tab' complete.")
    except Exception as e:
        print(f"[!] Error downloading NLTK 'punkt_tab' resource: {e}")
        sys.exit(1)


def load_pdf_text(pdf_path):
    """Loads text from a PDF file."""
    if not pdf_path:
         raise ValueError("Error: PDF_PATH is not set in the script configuration.")
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Error: PDF file not found at {pdf_path}")
    try:
        reader = PdfReader(pdf_path)
        text = " ".join(page.extract_text() or "" for page in reader.pages)
        text = text.replace('\n', ' ').replace('\r', '').replace('\t', ' ')
        text = ' '.join(text.split())
        return text
    except Exception as e:
        raise IOError(f"Error reading PDF file {pdf_path}: {e}")


def split_into_chunks(text, tokenizer, model_max_length, summary_prompt, max_chunk_tokens_override=None):
    """Splits text into chunks based on sentence boundaries and model's token limit."""
    if not text:
        return []

    sentences = sent_tokenize(text)
    chunks = []
    current_chunk_sentences = []

    prompt_token_count = len(tokenizer.encode(summary_prompt, add_special_tokens=False))
    buffer_tokens = 5
    effective_max_len = model_max_length - prompt_token_count - buffer_tokens

    if effective_max_len <= 0:
        print(f"[!] Error: Model max length ({model_max_length}) is too small to accommodate the prompt ({prompt_token_count} tokens) plus internal buffer ({buffer_tokens}). Reduce prompt length or use a model with a larger context window.")
        sys.exit(1)

    if max_chunk_tokens_override is not None:
        if max_chunk_tokens_override > effective_max_len:
            print(f"[!] Warning: max_chunk_tokens_override ({max_chunk_tokens_override}) is larger than the model's effective maximum ({effective_max_len}). Using model's effective maximum.")
            max_chunk_limit = effective_max_len
        else:
            max_chunk_limit = max_chunk_tokens_override
    else:
        max_chunk_limit = effective_max_len

    print(f"[+] Splitting text into chunks (max {max_chunk_limit} content tokens per chunk)...")

    for sentence in sentences:
        tentative_sentences = current_chunk_sentences + [sentence]
        tentative_text = " ".join(tentative_sentences)

        tentative_content_tokens = len(tokenizer.encode(tentative_text, add_special_tokens=False))

        if tentative_content_tokens > max_chunk_limit:
            if current_chunk_sentences:
                chunks.append(" ".join(current_chunk_sentences))
            current_chunk_sentences = [sentence]
            single_sentence_content_tokens = len(tokenizer.encode(sentence, add_special_tokens=False))
            if single_sentence_content_tokens > max_chunk_limit:
                print(f"[!] Warning: A single sentence content ({single_sentence_content_tokens} tokens) exceeds the chunk limit ({max_chunk_limit}). This sentence will form its own chunk.")
                chunks.append(sentence)
                current_chunk_sentences = []
                continue
        else:
            current_chunk_sentences = tentative_sentences

    if current_chunk_sentences:
        chunks.append(" ".join(current_chunk_sentences))

    print(f"[+] Prepared {len(chunks)} chunks for summarization based on model token limits.")
    return chunks


def summarize_chunks_batched(summarizer, chunks, batch_size, summary_ratio, summary_min_len_fixed, summary_max_len_fixed, summary_prompt=""):
    """Summarizes a list of text chunks in batches with an optional prompt."""
    summaries = []
    total_chunks = len(chunks)
    print(f"[+] Starting summarization in batches of {batch_size}...")

    reference_chunk_tokens = 1000
    base_max_len = summary_max_len_fixed if summary_max_len_fixed is not None else int(reference_chunk_tokens * summary_ratio)
    base_min_len = summary_min_len_fixed if summary_min_len_fixed is not None else int(base_max_len * 0.5)

    final_max_len = min(base_max_len, summarizer.model.config.max_length)
    final_max_len = max(final_max_len, 10)

    final_min_len = min(base_min_len, final_max_len)
    final_min_len = max(final_min_len, 5)

    print(f"[+] Using summary length parameters: min_length={final_min_len}, max_length={final_max_len}")
    if summary_prompt:
        print(f"[+] Using summary prompt: '{summary_prompt}'")

    for i in range(0, total_chunks, batch_size):
        batch = chunks[i : i + batch_size]
        print(f"  Processing batch {i // batch_size + 1}/{(total_chunks + batch_size - 1) // batch_size} (Chunks {i+1} to {min(i + batch_size, total_chunks)})...")

        if summary_prompt:
            prompted_batch = [summary_prompt + (" " if not summary_prompt[-1].isspace() else "") + chunk for chunk in batch]
        else:
            prompted_batch = batch

        try:
            batch_summaries = summarizer(
                prompted_batch,
                max_length=final_max_len,
                min_length=final_min_len,
                do_sample=False
            )

            summaries.extend([s["summary_text"].strip() for s in batch_summaries])

        except Exception as e:
            print(f"[!] Error summarizing batch starting at chunk {i+1}: {e}")
            summaries.extend(["[Error summarizing this section]"] * len(batch))

    return summaries


def main():
    effective_device = DEVICE
    if effective_device == -1:
        print("[+] Using CPU (-1) for summarization.")
    else:
        print(f"[+] Using device {effective_device} as configured.")

    print(f"[+] Loading PDF from {PDF_PATH}...")
    try:
        text = load_pdf_text(PDF_PATH)
        if not text or len(text.split()) < 100:
            print(f"[!] Warning: Could not extract substantial text from {PDF_PATH}. Summary may be poor or empty.")
    except (FileNotFoundError, IOError, ValueError) as e:
        print(f"[!] Error: {e}")
        sys.exit(1)

    print(f"[+] Loading summarization model '{MODEL_NAME}' on device {effective_device}...")
    try:
<<<<<<< HEAD
        summarizer = pipeline("summarization", model=MODEL_NAME,device=effective_device)
=======
        summarizer = pipeline("summarization", model=MODEL_NAME,token="", device=effective_device)
>>>>>>> 23b9847... Updates
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model_max_length = summarizer.model.config.max_position_embeddings

        print("\n[!] Model Information:")
        print(f"    Model loaded: '{MODEL_NAME}'")
        print(f"    Model max input tokens: {model_max_length}")
        print(f"    Model max output tokens: {summarizer.model.config.max_length}")
        print(f"    Using device: {'CPU' if effective_device == -1 else f'GPU {effective_device}'}")

    except Exception as e:
        print(f"[!] Error loading model or tokenizer {MODEL_NAME}: {e}")
        sys.exit(1)

    chunks = split_into_chunks(text, tokenizer, model_max_length, SUMMARY_PROMPT, MAX_CHUNK_TOKENS_OVERRIDE)

    if not chunks:
        print("[!] No text chunks generated based on model token limits. Cannot summarize.")
        sys.exit(0)

    print("[+] Summarizing chunks in batches...")
    final_summary = ""
    try:
        summaries = summarize_chunks_batched(
            summarizer,
            chunks,
            batch_size=BATCH_SIZE,
            summary_ratio=SUMMARY_RATIO,
            summary_min_len_fixed=SUMMARY_MIN_LEN_FIXED,
            summary_max_len_fixed=SUMMARY_MAX_LEN_FIXED,
            summary_prompt=SUMMARY_PROMPT
        )
        final_summary = " ".join(summaries)
    except Exception as e:
        print(f"[!] An unexpected error occurred during the summarization process: {e}")

    print("\n" + "="*30 + "\n[+] Final Summary:\n" + "="*30 + "\n")
    print(final_summary.strip())

    if OUTPUT_FILE:
        try:
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                f.write(final_summary.strip())
            print(f"[+] Final summary saved to {OUTPUT_FILE}")
        except Exception as e:
            print(f"[!] Error saving output to {OUTPUT_FILE}: {e}")

if __name__ == "__main__":
    main()
