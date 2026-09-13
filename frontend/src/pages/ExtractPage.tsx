import { useState } from "react";
import { Scan, X } from "lucide-react";
import { useExtract } from "../hooks/useExtract";
import { PersonInfoCard } from "../components/extract/PersonInfoCard";
import { Button } from "../components/common/Button";
import { Textarea } from "../components/common/Textarea";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { FileText } from "lucide-react";

const EXAMPLE_TEXT =
  "My name is Sarah Johnson, I'm 32 years old and I work as a Senior Product Manager at Stripe. I'm based in San Francisco.";

export function ExtractPage() {
  const [text, setText] = useState("");
  const { result, isLoading, error, run, clear } = useExtract();

  const handleExtract = () => {
    if (text.trim()) run(text.trim());
  };

  const handleClear = () => {
    setText("");
    clear();
  };

  const handleExample = () => {
    setText(EXAMPLE_TEXT);
    clear();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
      {/* Input Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="extract-input"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Input Text
          </label>
          <button
            onClick={handleExample}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Try an example
          </button>
        </div>
        <Textarea
          id="extract-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (result || error) clear();
          }}
          placeholder="Paste text containing information about a person — name, age, job title, company, city..."
          rows={6}
          hint={`${text.length} characters`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="primary"
          onClick={handleExtract}
          loading={isLoading}
          disabled={!text.trim() || isLoading}
          leftIcon={<Scan className="w-4 h-4" />}
        >
          Extract Info
        </Button>
        {(text || result || error) && (
          <Button
            variant="ghost"
            onClick={handleClear}
            leftIcon={<X className="w-4 h-4" />}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Results */}
      {error && <ErrorMessage message={error} className="mb-4" />}

      {result ? (
        <PersonInfoCard data={result} />
      ) : (
        !error && !isLoading && (
          <EmptyState
            icon={FileText}
            title="No results yet"
            description="Enter text above and click Extract Info to identify person details like name, age, job title, company, and city."
          />
        )
      )}
    </div>
  );
}
