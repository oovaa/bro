#!/usr/bin/env python3
"""
Gemini Stream Echo - CLI tool that takes input in a loop, streams it to Google Gemini via LangChain,
and displays the response in real-time.
Requires GOOGLE_API_KEY in .env file.
"""

import os

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate


def main():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print(
            "Error: Set GOOGLE_API_KEY in .env file (get one from https://aistudio.google.com/app/apikey)"
        )
        return

    # Initialize the model
    model = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",  # Or "geminiXX-pro" for a different variant
        google_api_key=api_key,
        temperature=0.7,  # Adjust for creativity (0-1)
    )

    # Simple prompt template (you can enhance this for chat history if needed)
    prompt_template = ChatPromptTemplate.from_template(
        "You are a helpful assistant. Respond to this: {input}"
    )
    chain = prompt_template | model

    print("Gemini Stream Echo - Type something and I'll stream a response from Gemini!")
    print("Type 'quit' or 'exit' to stop (or press Ctrl+C)\n")

    while True:
        try:
            # Get input from user
            user_input = input("You: ").strip()

            # Check for exit commands
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break

            if not user_input:
                print("Please enter something to chat about.\n")
                continue

            # Stream the response
            print("Gemini: ", end="", flush=True)
            for chunk in chain.stream({"input": user_input}):
                print(chunk.content, end="", flush=True)  # Print chunks as they arrive
            print("\n")  # New line after full response

        except KeyboardInterrupt:
            print("\n\nCaught Ctrl+C - Goodbye!")
            break
        except Exception as e:
            print(f"\nError: {e} (Check your API key or internet connection)\n")


if __name__ == "__main__":
    main()
