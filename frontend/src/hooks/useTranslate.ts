import { useState, useCallback } from "react";
import { translate } from "../services/api";
import type { AllowedLanguage, TranslateResponse } from "../types/api";

export function useTranslate() {
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (text: string, to_language: AllowedLanguage) => {
      setIsLoading(true);
      setError(null);
      setResult(null);
      try {
        const data = await translate({ text, to_language });
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Translation failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, run, clear };
}
