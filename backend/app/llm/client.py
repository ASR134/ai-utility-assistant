import os
from google import genai
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
from app.services.weather import get_weather

from app.schemas.extraction import PersonInfo

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY is None:
    raise ValueError("Gemini api key not found")

client = genai.Client(api_key=API_KEY)


async def generate_text(
        prompt : str,
        system_instructions : str | None=None,
):

    response = await client.aio.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
        config={
            "system_instruction" : system_instructions,
        }
    )

    return response



async def generate_text_stream(
        prompt : str,
        system_instructions : str | None = None,
):
    response = await client.aio.models.generate_content_stream(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={
                "system_instruction" : system_instructions,
            }
        )

    async for chunk in response:
        if chunk.text:
            yield chunk.text

    
async def extract_person_info(
        text : str,
):
    system_instruction = (
        "You are an information extraction assistant."
        "Your task is to extract information about a person from the user's text."
        "Rules:"
        "- Extract only information explicitly stated in the user's text."
        "- Never guess or infer missing information."
        "- Never invent information"
        "- If a field is not present, return null"
    )
    response = await client.aio.models.generate_content(
        model = "gemini-3.5-flash-lite",
        contents=text,
        config={
            "response_mime_type" : "application/json",# constrains the format of the string content in response.text
            "response_schema" : PersonInfo,
            "system_instruction" : system_instruction,
        }
    )

    return PersonInfo.model_validate_json(response.text) # type: ignore


async def translate_text(
        text : str,
        to_language : str,
):
    system_instruction = (
    "You are an expert language translator."
    f"Translate the text provided by the user into {to_language}. "
    "Only output the translated text with no extra commentary, "
    "explanations, or formatting."
    )
    response = await client.aio.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=text,
        config={
            "system_instruction" : system_instruction,
        }
    )

    return response


async def weather_assistant(prompt : str):

    system_instruction = (
        "You are a weather assistant"
        "When the user asks for weather information for a city,"
        "always use the get_weather tool to retrieve the weather."
        "Do not guess weather information."
        "Do not answer weather questions from your own knowledge."
    )
    response = await client.aio.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
        config={
            "tools" : [get_weather],
            "system_instruction" : system_instruction
        },
    )

    return response # sdk handles the actual execution and sends the result back to gemini automatically.
