import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import { Conversation } from "@/types/chat";
import { useState } from "react";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
}

const ChatSidebar = ({ conversations, activeId, onSelect, onNew, onDelete, isOpen }: ChatSidebarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <aside className="w-[260px] h-full bg-chat-sidebar flex flex-col shrink-0">
      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-chat-text text-sm hover:bg-chat-hover transition-colors"
        >
          <Plus size={16} />
          <span>New chat</span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onMouseEnter={() => setHoveredId(conv.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelect(conv.id)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
              activeId === conv.id
                ? "bg-chat-hover text-chat-text"
                : "text-chat-text-secondary hover:bg-chat-hover hover:text-chat-text"
            }`}
          >
            <MessageSquare size={14} className="shrink-0 opacity-60" />
            <span className="truncate flex-1">{conv.title}</span>
            {hoveredId === conv.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                className="shrink-0 p-1 rounded hover:bg-chat-divider transition-colors text-chat-text-secondary hover:text-chat-text"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-chat-divider">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-chat-text-secondary text-sm">
          <div className="w-6 h-6 rounded-full bg-chat-accent flex items-center justify-center text-xs font-medium text-primary-foreground">
            U
          </div>
          <span className="truncate">User</span>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
