// components/ChatUI.js
"use client";

import { useState, useRef, useEffect } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scrolls the chat window to the bottom on every new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handles sending a message and calling the backend API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;

    // Add user's message to the state
    const newUserMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    // Clear the input and set loading state
    setInput('');
    setLoading(true);

    try {
      // API call to the Next.js Route Handler
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newUserMessage.text }),
      });

      const data = await response.json();
      const newAiMessage = { sender: 'ai', text: data.answer };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

    } catch (error) {
      console.error('API call failed:', error);
      const errorMessage = { sender: 'ai', text: 'Sorry, I am unable to answer that right now. Please try again later.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Messages Container - Flex container with scrollable content */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollable" style={{ overflowY: 'auto !important' }} >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-md ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-xl bg-gray-200 text-gray-800 rounded-bl-none">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input and Send Button */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}