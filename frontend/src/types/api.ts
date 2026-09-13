// ============================================================
// API Types — derived from FastAPI backend schemas exactly
// ============================================================

// ---- /chat ----
export interface ChatRequest {
  prompt: string;
  system_instructions?: string | null;
  stream?: boolean;
}

export interface ChatResponse {
  response: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
}

// ---- /extract ----
export interface ExtractionRequest {
  text: string; // min_length=1 enforced by backend
}

// Matches backend PersonInfo pydantic model exactly
export interface PersonInfo {
  name: string | null;
  age: number | null;
  job_title: string | null;
  company: string | null;
  city: string | null;
}

// ---- /translate ----
export type AllowedLanguage = "English" | "Hindi" | "Spanish" | "French";

export interface TranslateRequest {
  text: string; // min_length=1 enforced by backend
  to_language: AllowedLanguage;
}

export interface TranslateResponse {
  response: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
}

// ---- /weather ----
export interface WeatherRequest {
  prompt: string; // min_length=1 enforced by backend
}

export interface WeatherResponse {
  response: string;
}

// ---- Error Handling ----
export interface ApiError {
  detail: string | ValidationError[] | unknown;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

// ---- Chat UI message model ----
export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  streaming?: boolean;
}
