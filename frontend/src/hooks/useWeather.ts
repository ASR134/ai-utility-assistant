import { useState, useCallback } from "react";
import { getWeather } from "../services/api";
import type { WeatherResponse } from "../types/api";

export function useWeather() {
  const [result, setResult] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await getWeather({ prompt });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Weather request failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, search, clear };
}
