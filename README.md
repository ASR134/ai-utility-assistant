# AI Utility Assistant

A full-stack AI utility application built with **FastAPI**, **React**, **TypeScript**, and **Gemini**. 

## Features

### 💬 Chat

- Normal AI chat responses
- Streaming AI responses
- Gemini-powered text generation

### 📄 Structured Extraction

- Extracts structured information from text
- Returns validated JSON output
- Uses Pydantic schemas for request/response validation

### 🌐 Translation

- Translates text between languages
- Uses system instructions to control the model's behavior
- Includes request validation

### 🌤️ Weather

- Fetches real weather data using the Open-Meteo API
- Uses Gemini tool calling to determine when weather data is needed
- Demonstrates automatic tool/function calling with an external API

## Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- Gemini API
- Open-Meteo API
- Uvicorn

### Frontend

- React
- TypeScript
- Vite
- CSS

## Project Structure

```text
ai_utility_assistant/
├── .gitignore
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── llm/
│   │   │   ├── __init__.py
│   │   │   └── client.py
│   │   ├── schemas/
│   │   │   ├── chat.py
│   │   │   └── extraction.py
│   │   └── services/
│   │       └── weather.py
│   ├── experiments/
│   ├── tests/
│   ├── .env.example
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── chat/
    │   │   ├── common/
    │   │   ├── extract/
    │   │   ├── layout/
    │   │   └── weather/
    │   ├── hooks/
    │   └── pages/
    ├── .env.example
    ├── package.json
    └── package-lock.json
