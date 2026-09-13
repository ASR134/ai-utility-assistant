import { Trash2 } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { MessageList } from "../components/chat/MessageList";
import { ChatInput } from "../components/chat/ChatInput";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { Button } from "../components/common/Button";

export function ChatPage() {
  const { messages, isLoading, error, sendMessage, stopGeneration, clearMessages } = useChat();

  const handleSend = (prompt: string, stream: boolean) => {
    sendMessage({ prompt, stream });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      {messages.length > 0 && (
        <div className="flex justify-end px-4 lg:px-6 py-2 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            disabled={isLoading}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 lg:px-6 pb-2 max-w-3xl mx-auto w-full">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        onStop={stopGeneration}
        isLoading={isLoading}
      />
    </div>
  );
}
