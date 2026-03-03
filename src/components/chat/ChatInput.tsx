import { ArrowUp, Paperclip, Globe } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-[48rem] mx-auto px-4 pb-4">
      <div className="relative bg-chat-input border border-chat-input-border rounded-2xl">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT"
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent text-chat-text placeholder:text-chat-text-secondary text-[15px] px-4 pt-3.5 pb-12 resize-none focus:outline-none max-h-[200px]"
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
              <Paperclip size={18} />
            </button>
            <button className="p-2 rounded-lg text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
              <Globe size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className={`p-1.5 rounded-lg transition-colors ${
              value.trim() && !disabled
                ? "bg-chat-text text-chat-bg hover:opacity-80"
                : "bg-chat-divider text-chat-text-secondary cursor-not-allowed"
            }`}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
      <p className="text-xs text-chat-text-secondary text-center mt-2">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default ChatInput;
