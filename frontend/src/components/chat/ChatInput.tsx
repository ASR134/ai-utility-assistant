import { useRef, useState, type KeyboardEvent } from "react";
import { SendHorizonal, Square } from "lucide-react";
import { Button } from "../common/Button";

interface ChatInputProps {
  onSend: (prompt: string, stream: boolean) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const [stream, setStream] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = prompt.trim().length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend(prompt.trim(), stream);
    setPrompt("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isLoading) return;
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 lg:px-6 py-4 shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Type a message… (Shift+Enter for newline)"
            disabled={disabled || isLoading}
            aria-label="Chat message input"
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 resize-none focus:outline-none min-h-[24px] max-h-[200px] disabled:opacity-50"
          />

          {isLoading ? (
            <Button
              variant="danger"
              size="sm"
              onClick={onStop}
              leftIcon={<Square className="w-3.5 h-3.5" />}
              aria-label="Stop generation"
            >
              Stop
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
              disabled={!canSend}
              leftIcon={<SendHorizonal className="w-3.5 h-3.5" />}
              aria-label="Send message"
            >
              Send
            </Button>
          )}
        </div>

        {/* Stream toggle */}
        <div className="flex items-center gap-2 mt-2 px-1">
          <label
            htmlFor="stream-toggle"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="relative">
              <input
                id="stream-toggle"
                type="checkbox"
                className="sr-only peer"
                checked={stream}
                onChange={(e) => setStream(e.target.checked)}
              />
              <div className="w-9 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 peer-checked:bg-indigo-500 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Streaming {stream ? "on" : "off"}
            </span>
          </label>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-auto">
            Enter to send
          </span>
        </div>
      </div>
    </div>
  );
}
