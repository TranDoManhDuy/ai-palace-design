const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full bg-chat-accent flex items-center justify-center mx-auto mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-chat-text mb-1">What can I help with?</h1>
      </div>
    </div>
  );
};

export default WelcomeScreen;
