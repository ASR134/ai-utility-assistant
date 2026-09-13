import { useState } from "react";
import { Languages, ArrowRightLeft, X, Copy, Check } from "lucide-react";
import { useTranslate } from "../hooks/useTranslate";
import { Button } from "../components/common/Button";
import { Textarea } from "../components/common/Textarea";
import { Select } from "../components/common/Select";
import { ErrorMessage } from "../components/common/ErrorMessage";
import type { AllowedLanguage } from "../types/api";

// Backend enforces exactly these four languages
const LANGUAGES: { value: AllowedLanguage; label: string }[] = [
  { value: "English", label: "🇬🇧 English" },
  { value: "Hindi", label: "🇮🇳 Hindi" },
  { value: "Spanish", label: "🇪🇸 Spanish" },
  { value: "French", label: "🇫🇷 French" },
];

export function TranslatePage() {
  const [sourceText, setSourceText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState<AllowedLanguage>("Spanish");
  const [copied, setCopied] = useState(false);
  const { result, isLoading, error, run, clear } = useTranslate();

  const handleTranslate = () => {
    if (sourceText.trim()) run(sourceText.trim(), targetLanguage);
  };

  const handleClear = () => {
    setSourceText("");
    clear();
  };

  const handleCopy = async () => {
    if (!result?.response) return;
    await navigator.clipboard.writeText(result.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
      {/* Language Selector */}
      <div className="mb-6">
        <Select
          label="Translate to"
          id="target-language"
          value={targetLanguage}
          onChange={(e) => {
            setTargetLanguage(e.target.value as AllowedLanguage);
            clear();
          }}
          options={LANGUAGES}
        />
      </div>

      {/* Source Text */}
      <div className="mb-6">
        <Textarea
          label="Source Text"
          id="source-text"
          value={sourceText}
          onChange={(e) => {
            setSourceText(e.target.value);
            if (result || error) clear();
          }}
          placeholder="Enter text to translate..."
          rows={5}
          hint={`${sourceText.length} characters`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="primary"
          onClick={handleTranslate}
          loading={isLoading}
          disabled={!sourceText.trim() || isLoading}
          leftIcon={<Languages className="w-4 h-4" />}
        >
          Translate
        </Button>
        {(sourceText || result || error) && (
          <Button
            variant="ghost"
            onClick={handleClear}
            leftIcon={<X className="w-4 h-4" />}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} className="mb-6" />}

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Translation — {targetLanguage}
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors
                ${copied
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="px-5 py-5">
            <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {result.response ?? "No translation returned"}
            </p>
          </div>
          {(result.input_tokens !== null || result.output_tokens !== null) && (
            <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {result.input_tokens} input · {result.output_tokens} output tokens
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
