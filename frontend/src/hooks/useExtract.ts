import { useState, useCallback } from "react";
import { extract } from "../services/api";
import type { PersonInfo } from "../types/api";

export function useExtract() {
  const [result, setResult] = useState<PersonInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    const controller = new AbortController();
    try {
      const data = await extract({ text }, controller.signal);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Extraction failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, run, clear };
}
