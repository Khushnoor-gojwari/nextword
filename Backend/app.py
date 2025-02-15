from fastapi import FastAPI
from pydantic import BaseModel
from transformers import TFGPT2LMHeadModel, GPT2Tokenizer
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# Add CORS middleware to handle requests from React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or specify allowed origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Or specify allowed methods like ["GET", "POST"]
    allow_headers=["*"],  # Or specify allowed headers like ["Content-Type"]
)

# Load GPT-2 Model and Tokenizer (TensorFlow version)
model = TFGPT2LMHeadModel.from_pretrained("gpt2")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Request model
class TextRequest(BaseModel):
    text: str
    num_words: int  # Added number of words for prediction

@app.post("/predict")
async def predict_next_word(request: TextRequest):
    # Encode input text
    inputs = tokenizer.encode(request.text, return_tensors="tf")

    # Generate predictions with randomness control
    outputs = model.generate(
        inputs, 
        max_length=inputs.shape[1] + request.num_words, 
        num_return_sequences=1,  
        temperature=0.7,  # Higher temperature = more randomness (default is 1.0)
        top_k=50,  # Limits choices to top 50 words, reducing repetition
        top_p=0.9,  # Nucleus sampling to allow diversity
        repetition_penalty=1.2  # Discourages repetitive words
    )

    predicted_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return {"predicted_text": predicted_text}  # Send full predicted text back
  # Send full predicted text back to the frontend

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
