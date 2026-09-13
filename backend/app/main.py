# pyrefly: ignore [missing-import]
from fastapi import FastAPI, status
from app.schemas.chat import ChatRequest, ChatResponse, ExtractionRequest, TranslateRequest, TranslateResponse, WeatherRequest, WeatherResponse
from app.schemas.extraction import PersonInfo
from app.llm.client import generate_text, extract_person_info, generate_text_stream, translate_text, weather_assistant
# pyrefly: ignore [missing-import]
from fastapi.responses import StreamingResponse
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Utility Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message" : "AI Utility Assistant is running"
    }


@app.post(
    "/chat",
    status_code=status.HTTP_200_OK,
)
async def chat(
    request : ChatRequest,
):
    if request.stream:
        return StreamingResponse(
            generate_text_stream(
                prompt=request.prompt,
                system_instructions=request.system_instructions,
            ),
            media_type="text/plain",
        )
    
    result = await generate_text(
        prompt=request.prompt,
        system_instructions=request.system_instructions,
    )

    usage =  result.usage_metadata
    return ChatResponse(
        response=result.text,
        input_tokens=usage.prompt_token_count if usage else None,
        output_tokens=usage.candidates_token_count if usage else None,
    )# input_tokens + output_tokens <= context window limit


@app.post(
    "/extract",
    response_model=PersonInfo,# runs model_validate on the function return object (expects a dict like obj (like in 1st route) or existing pydantic model instance(like in 2nd route))
    status_code=status.HTTP_200_OK,
)
async def extract(
    request : ExtractionRequest,
):
    return await extract_person_info(text=request.text)


@app.post(
    "/translate",
    response_model=TranslateResponse,
    status_code=status.HTTP_200_OK,
)
async def translate(request : TranslateRequest):

    result = await translate_text(
        text=request.text,
        to_language=request.to_language,
    )

    usage = result.usage_metadata

    return {
        "response" : result.text,
        "input_tokens" : usage.prompt_token_count if usage else None,
        "output_tokens" : usage.candidates_token_count if usage else None,
    }


@app.post(
    "/weather",
    response_model=WeatherResponse,
    status_code=status.HTTP_200_OK,
)
async def weather(request : WeatherRequest):

    result = await weather_assistant(request.prompt)

    return {
        "response" : result.text
    }