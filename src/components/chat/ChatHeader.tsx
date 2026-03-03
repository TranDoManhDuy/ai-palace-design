import { PanelLeft, ChevronDown, Share } from "lucide-react";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

const ChatHeader = ({ onToggleSidebar, onNewChat }: ChatHeaderProps) => {
  return (
    <header className="h-12 flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors"
        >
          <PanelLeft size={18} />
        </button>
        <button
          onClick={onNewChat}
          className="p-2 rounded-lg text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
      </div>

      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-chat-text text-sm font-medium hover:bg-chat-hover transition-colors">
        ChatGPT <ChevronDown size={14} className="text-chat-text-secondary" />
      </button>

      <button className="p-2 rounded-lg text-chat-text-secondary hover:text-chat-text hover:bg-chat-hover transition-colors">
        <Share size={18} />
      </button>
    </header>
  );
};

export default ChatHeader;
