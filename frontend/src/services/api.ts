import type {
  ChatRequest,
  ChatResponse,
  ExtractionRequest,
  PersonInfo,
  TranslateRequest,
  TranslateResponse,
  WeatherRequest,
  WeatherResponse,
  ApiError,
} from "../types/api";

// Base URL — loaded from environment variables (e.g. .env.development)
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

// Shared error helpers

/** Extracts a human-readable message from a FastAPI error response */
export async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as ApiError;
    if (typeof body.detail === "string") {
      return body.detail;
    }
    if (Array.isArray(body.detail)) {
      return body.detail.map((e) => e.msg).join(", ");
    }
    return `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

class ApiCallError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiCallError";
    this.status = status;
  }
}

async function requireOk(res: Response): Promise<void> {
  if (!res.ok) {
    const msg = await extractErrorMessage(res);
    throw new ApiCallError(msg, res.status);
  }
}

// Chat

/** Non-streaming chat — POST /chat with stream: false */
export async function chat(
  request: ChatRequest,
  signal?: AbortSignal
): Promise<ChatResponse> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: false }),
    signal,
  });
  await requireOk(res);
  return res.json() as Promise<ChatResponse>;
}

/**
 * Streaming chat — POST /chat with stream: true.
 * Backend returns media_type="text/plain" with raw text chunks.
 * Calls onChunk for each decoded text piece; resolves when stream ends.
 */
export async function streamChat(
  request: ChatRequest,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: true }),
    signal,
  });
  await requireOk(res);

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body for streaming");

  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    if (chunk) onChunk(chunk);
  }
}

// Extract

/** POST /extract — returns structured PersonInfo */
export async function extract(
  request: ExtractionRequest,
  signal?: AbortSignal
): Promise<PersonInfo> {
  const res = await fetch(`${BASE_URL}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });
  await requireOk(res);
  return res.json() as Promise<PersonInfo>;
}

// Translate

/** POST /translate */
export async function translate(
  request: TranslateRequest,
  signal?: AbortSignal
): Promise<TranslateResponse> {
  const res = await fetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });
  await requireOk(res);
  return res.json() as Promise<TranslateResponse>;
}

// Weather

/** POST /weather — prompt is a natural-language question */
export async function getWeather(
  request: WeatherRequest,
  signal?: AbortSignal
): Promise<WeatherResponse> {
  const res = await fetch(`${BASE_URL}/weather`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });
  await requireOk(res);
  return res.json() as Promise<WeatherResponse>;
}
