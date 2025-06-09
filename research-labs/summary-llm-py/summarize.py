# summarizer.py
from pypdf import PdfReader
from transformers import AutoTokenizer, TFBartForConditionalGeneration
import nltk
from nltk.tokenize import sent_tokenize

nltk.download('punkt', quiet=True)

PDF_PATH = "research_paper.pdf"
MODEL_NAME = "facebook/bart-large-cnn"
SUMMARY_PROMPT = "Summarize focusing on:\n- Problem\n- Methods\n- Results\n- Conclusions\n\nText:"
MAX_CHUNK_TOKENS = 768

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = TFBartForConditionalGeneration.from_pretrained(MODEL_NAME)

def load_pdf_text(pdf_path):
    if not pdf_path or not pdf_path.endswith(".pdf"):
        raise ValueError("Invalid PDF path")
    reader = PdfReader(pdf_path)
    text = " ".join(page.extract_text() or "" for page in reader.pages)
    if not text.strip():
        raise ValueError("Empty PDF content")
    return text

def chunk_text(text):
    sentences = sent_tokenize(text)
    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        length = len(tokenizer.encode(sentence))
        if length > MAX_CHUNK_TOKENS:
            if current_chunk:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_length = 0
            words = sentence.split()
            word_chunk, word_chunk_length = [], 0
            for word in words:
                word_length = len(tokenizer.encode(word))
                if word_chunk_length + word_length > MAX_CHUNK_TOKENS:
                    chunks.append(" ".join(word_chunk))
                    word_chunk = [word]
                    word_chunk_length = word_length
                else:
                    word_chunk.append(word)
                    word_chunk_length += word_length
            if word_chunk:
                chunks.append(" ".join(word_chunk))
        else:
            if current_length + length > MAX_CHUNK_TOKENS:
                chunks.append(" ".join(current_chunk))
                current_chunk = [sentence]
                current_length = length
            else:
                current_chunk.append(sentence)
                current_length += length

    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def summarize_text_chunk(text):
    inputs = tokenizer(
        text,
        return_tensors="tf",
        truncation=True,
        max_length=MAX_CHUNK_TOKENS
    )
    summary_ids = model.generate(
        inputs["input_ids"],
        max_length=200,
        min_length=100,
        num_beams=4,
        early_stopping=True
    )
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

def summarize_pdf(path):
    text = load_pdf_text(path)

    print(f"loaded pdf")
    chunks = chunk_text(f"{SUMMARY_PROMPT}\n\n{text}")

    print(chunks)
    return [summarize_text_chunk(chunk) for chunk in chunks]
