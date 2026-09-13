from pydantic import BaseModel, Field
from typing import Literal

class ChatRequest(BaseModel):
    prompt : str
    system_instructions : str | None = None
    stream : bool = False


class ChatResponse(BaseModel):
    response : str | None
    input_tokens : int | None
    output_tokens : int | None

class ExtractionRequest(BaseModel):
    text : str = Field(min_length=1)


class TranslateRequest(BaseModel):
    text : str = Field(min_length=1)
    to_language : Literal["English","Hindi","Spanish","French"] = Field(description="Allowed Languages : English,Hindi,Spanish,French")


class TranslateResponse(BaseModel):
    response : str | None
    input_tokens : int | None
    output_tokens : int | None


class WeatherRequest(BaseModel):
    prompt : str = Field(min_length=1)


class WeatherResponse(BaseModel):
    response : str