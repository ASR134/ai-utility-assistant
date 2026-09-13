import { useState, useCallback, useRef } from "react";
import { streamChat } from "../services/api";
import type { ChatMessage, ChatRequest } from "../types/api";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (request: ChatRequest) => {
      if (isLoading) return;

      setError(null);

      // Add user message
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: request.prompt,
        timestamp: new Date(),
      };

      // Placeholder assistant message (will be filled as chunks arrive)
      const assistantId = generateId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await streamChat(
          request,
          (chunk) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + chunk }
                  : m
              )
            );
          },
          controller.signal
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // User stopped generation — keep whatever was streamed
        } else {
          const msg =
            err instanceof Error ? err.message : "An unexpected error occurred";
          setError(msg);
          // Remove the empty assistant bubble on hard error
          setMessages((prev) =>
            prev.filter((m) => !(m.id === assistantId && m.content === ""))
          );
        }
      } finally {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m
          )
        );
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [isLoading]
  );

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const clearMessages = useCallback(() => {
    if (!isLoading) setMessages([]);
  }, [isLoading]);

  return { messages, isLoading, error, sendMessage, stopGeneration, clearMessages };
}
