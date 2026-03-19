import os
from dotenv import load_dotenv
from google import genai

# Load the hidden environment variables from the .env file
load_dotenv()

# Initialize the client (it will automatically find the GEMINI_API_KEY)
client = genai.Client()

# Generate a response
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain how antigravity would work in a few sentences."
)

print(response.text)