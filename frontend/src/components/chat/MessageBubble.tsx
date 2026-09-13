import type { ChatMessage } from "../../types/api";
import { CopyButton } from "../common/CopyButton";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser
            ? "bg-indigo-600 text-white"
            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Bubble */}
      <div className={`group flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
            ${isUser
              ? "bg-indigo-600 text-white rounded-tr-sm"
              : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm"
            }`}
        >
          {message.content || (
            <span className="flex gap-1 items-center h-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:300ms]" />
            </span>
          )}
          {message.streaming && message.content && (
            <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse align-middle" />
          )}
        </div>

        {/* Footer: timestamp + copy */}
        <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            {formatTime(message.timestamp)}
          </span>
          {!isUser && message.content && !message.streaming && (
            <CopyButton text={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}
