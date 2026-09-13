import { useState, type KeyboardEvent } from "react";
import { Search, CloudSun, X } from "lucide-react";
import { useWeather } from "../hooks/useWeather";
import { WeatherResult } from "../components/weather/WeatherResult";
import { Button } from "../components/common/Button";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";

const EXAMPLE_PROMPTS = [
  "What's the weather like in Mumbai?",
  "How's the weather in London today?",
  "Tell me the current weather in New York",
  "Weather in Tokyo right now",
];

export function WeatherPage() {
  const [prompt, setPrompt] = useState("");
  const { result, isLoading, error, search, clear } = useWeather();

  const handleSearch = () => {
    if (prompt.trim()) search(prompt.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setPrompt("");
    clear();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-8 py-8">
      {/* Search Input */}
      <div className="mb-4">
        <label
          htmlFor="weather-prompt"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
        >
          Ask about the weather
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="weather-prompt"
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (result || error) clear();
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. What's the weather in Paris?"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900
                text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSearch}
            loading={isLoading}
            disabled={!prompt.trim() || isLoading}
            leftIcon={<Search className="w-4 h-4" />}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Example prompts */}
      {!result && !error && (
        <div className="flex flex-wrap gap-2 mb-8">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPrompt(p);
                search(p);
              }}
              className="px-3 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-neutral-700
                text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800
                hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Clear */}
      {(result || error) && (
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            leftIcon={<X className="w-3.5 h-3.5" />}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Error */}
      {error && <ErrorMessage message={error} className="mb-4" />}

      {/* Result */}
      {result ? (
        <WeatherResult response={result.response} />
      ) : (
        !error && !isLoading && (
          <EmptyState
            icon={CloudSun}
            title="Ask about any city"
            description="Type a natural language question like 'What's the weather in Berlin?' and the AI will fetch live weather data."
          />
        )
      )}
    </div>
  );
}
