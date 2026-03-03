import { useState, useRef, useEffect, useCallback } from "react";
import { Message, Conversation } from "@/types/chat";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import TypingIndicator from "@/components/chat/TypingIndicator";

const FAKE_RESPONSES = [
  "That's a great question! Let me think about that for a moment.\n\nBased on my understanding, I'd say the answer involves several key factors that we should consider carefully. Would you like me to elaborate on any specific aspect?",
  "I'd be happy to help with that! Here's what I think:\n\nThe most important thing to consider is the context and requirements of your specific situation. There are multiple approaches we could take, each with their own trade-offs.",
  "Interesting! Let me break this down for you.\n\nFirst, we need to understand the fundamental concepts involved. Then we can look at practical applications and best practices that would be most relevant to your use case.",
  "Great question! Here's my perspective:\n\nThere are several ways to approach this. The best method depends on your specific needs, but I can outline the most common approaches and their advantages.",
  "I can definitely help with that. Here's a comprehensive overview:\n\nThe key points to keep in mind are efficiency, maintainability, and scalability. Let me know if you'd like me to dive deeper into any of these areas.",
];

const generateId = () => Math.random().toString(36).substring(2, 15);

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const messages = activeConversation?.messages ?? [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleNewChat = () => {
    setActiveConvId(null);
  };

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    if (!activeConvId) {
      // Create new conversation
      const newConv: Conversation = {
        id: generateId(),
        title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
        messages: [userMessage],
        createdAt: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newConv.id);

      // Simulate response
      simulateResponse(newConv.id);
    } else {
      // Add to existing
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, userMessage] }
            : c
        )
      );
      simulateResponse(activeConvId);
    }
  };

  const simulateResponse = (convId: string) => {
    setIsTyping(true);
    const delay = 1000 + Math.random() * 2000;

    setTimeout(() => {
      const response: Message = {
        id: generateId(),
        role: "assistant",
        content: FAKE_RESPONSES[Math.floor(Math.random() * FAKE_RESPONSES.length)],
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, response] }
            : c
        )
      );
      setIsTyping(false);
    }, delay);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) setActiveConvId(null);
  };

  return (
    <div className="flex h-screen bg-chat-bg overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConvId}
        onSelect={setActiveConvId}
        onNew={handleNewChat}
        onDelete={handleDeleteConversation}
        isOpen={sidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
        />

        {messages.length === 0 && !activeConvId ? (
          <WelcomeScreen />
        ) : (
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>
    </div>
  );
};

export default Index;
