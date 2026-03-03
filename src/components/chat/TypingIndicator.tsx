const TypingIndicator = () => {
  return (
    <div className="max-w-[48rem] mx-auto px-4 py-5">
      <div className="flex gap-4">
        <div className="w-7 h-7 rounded-full bg-chat-accent flex items-center justify-center shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex items-center gap-1 pt-2">
          <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-pulse-dot" style={{ animationDelay: "0s" }} />
          <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
