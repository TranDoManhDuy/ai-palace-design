import { Message } from "@/types/chat";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="max-w-[48rem] mx-auto px-4 py-5">
        <div className={`flex gap-4 ${isUser ? "justify-end" : ""}`}>
          {!isUser && (
            <div className="w-7 h-7 rounded-full bg-chat-accent flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
            <div
              className={`text-[15px] leading-7 ${
                isUser
                  ? "bg-chat-user-bubble text-chat-text px-4 py-2.5 rounded-2xl max-w-[85%] inline-block"
                  : "text-chat-text"
              }`}
            >
              {message.content.split("\n").map((line, i) => (
                <p key={i} className={line === "" ? "h-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
            {!isUser && (
              <div className="flex items-center gap-1 mt-2 -ml-1">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors"
                  title="Copy"
                >
                  <Copy size={14} />
                </button>
                <button className="p-1.5 rounded-md text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
                  <ThumbsUp size={14} />
                </button>
                <button className="p-1.5 rounded-md text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
                  <ThumbsDown size={14} />
                </button>
                <button className="p-1.5 rounded-md text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
                  <RotateCcw size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
