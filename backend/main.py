from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

# Load a Hugging Face model for generating flashcards
flashcard_generator = pipeline("text2text-generation", model="iarfmoose/t5-base-question-generator")

@app.get("/")
def home():
    return {"message": "FastAPI is running!"}

@app.post("/generate-flashcards")
def generate_flashcards(text: str):
    try:
        result = flashcard_generator(f"generate question: {text}", max_length=50)
        return {"question": result[0]["generated_text"], "answer": text}
    except Exception as e:
        return {"error": str(e)}