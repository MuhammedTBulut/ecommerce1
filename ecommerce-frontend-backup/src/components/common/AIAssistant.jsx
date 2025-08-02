import React, { useState } from 'react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI shopping assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue('');
  };

  const generateAIResponse = () => {
    const responses = [
      "I'd be happy to help you find the perfect product! Can you tell me more about what you're looking for?",
      "Based on your preferences, I can recommend some popular items from our catalog.",
      "Would you like me to help you filter products by category or price range?",
      "I can assist you with product comparisons, reviews, or finding the best deals!",
      "Let me help you navigate our store to find exactly what you need."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className={`ai-assistant-toggle ${isOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ai-toggle-btn"
          aria-label="Toggle AI Assistant"
        >
          <span className="ai-icon">🤖</span>
          {!isOpen && <span className="ai-badge animate-pulse">AI</span>}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window animate-slideInUp">
          <div className="ai-header">
            <div className="ai-header-info">
              <span className="ai-avatar">🤖</span>
              <div>
                <h4>AI Shopping Assistant</h4>
                <span className="ai-status">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ai-close-btn"
              aria-label="Close AI Assistant"
            >
              ×
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="ai-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about products..."
              className="ai-input"
            />
            <button type="submit" className="ai-send-btn" disabled={!inputValue.trim()}>
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;