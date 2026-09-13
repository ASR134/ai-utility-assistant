import { useRef, useEffect } from "react";
import type { ChatMessage } from "../../types/api";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "../common/EmptyState";
import { MessageSquare } from "lucide-react";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="Start a conversation"
        description="Type a message below to chat with the AI assistant. You can enable streaming to see responses as they're generated."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 py-6 max-w-3xl mx-auto w-full">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
