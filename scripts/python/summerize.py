from pypdf import PdfReader
from transformers import pipeline, AutoTokenizer, TFBartForConditionalGeneration
import nltk
from nltk.tokenize import sent_tokenize
import tensorflow as tf
import os
import sys
import time

# Configuration
PDF_PATH = "research_paper.pdf"
MODEL_NAME = "facebook/bart-large-cnn"  # Same model, TensorFlow version
SUMMARY_PROMPT = "Summarize focusing on:\n- Problem\n- Methods\n- Results\n- Conclusions\n\nText:"
MAX_CHUNK_TOKENS = 768  # Reduced for TensorFlow safety
STREAM_DELAY = 0.05

# Initialize NLTK
nltk.download('punkt', quiet=True)

def load_pdf_text(pdf_path):
    """Extract text from PDF with validation"""
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at {pdf_path}")
    reader = PdfReader(pdf_path)
    text = " ".join(page.extract_text() or "" for page in reader.pages)
    if not text.strip():
        raise ValueError("Extracted PDF text is empty")
    return text

def chunk_text(text, tokenizer):
    """Split text into token-limited chunks"""
    sentences = sent_tokenize(text)
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(tokenizer.encode(sentence))
        
        # Handle oversized sentences
        if sentence_length > MAX_CHUNK_TOKENS:
            if current_chunk:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_length = 0
            
            words = sentence.split()
            word_chunk = []
            word_chunk_length = 0
            
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
            if current_length + sentence_length > MAX_CHUNK_TOKENS:
                chunks.append(" ".join(current_chunk))
                current_chunk = [sentence]
                current_length = sentence_length
            else:
                current_chunk.append(sentence)
                current_length += sentence_length
    
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    return chunks

def stream_summary(model, tokenizer, text):
    """Generate and stream summary using TensorFlow"""
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
    
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    
    for word in summary.split():
        sys.stdout.write(word + " ")
        sys.stdout.flush()
        time.sleep(STREAM_DELAY)
    print("\n" + "="*60)

def main():
    print("Loading TensorFlow model (may take several minutes)...")
    
    try:
        # Load TensorFlow variant explicitly
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = TFBartForConditionalGeneration.from_pretrained(MODEL_NAME)
    except Exception as e:
        print(f"Model loading failed: {str(e)}")
        print("Try: pip install tensorflow transformers")
        return
    
    print("Processing PDF...")
    try:
        text = load_pdf_text(PDF_PATH)
        chunks = chunk_text(f"{SUMMARY_PROMPT}\n\n{text}", tokenizer)
    except Exception as e:
        print(f"PDF processing error: {str(e)}")
        return
    
    print(f"Summarizing in {len(chunks)} parts:")
    for i, chunk in enumerate(chunks, 1):
        print(f"\nPart {i}/{len(chunks)}:")
        stream_summary(model, tokenizer, chunk)

if __name__ == "__main__":
    main()
