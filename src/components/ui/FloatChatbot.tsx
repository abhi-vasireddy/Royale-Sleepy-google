import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Welcome to Royale Sleepy. How can I help you find the perfect mattress today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage,
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, something went wrong. Please chat with us on WhatsApp for immediate assistance!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl lux-shadow w-[340px] mb-4 overflow-hidden border border-gray-100 flex flex-col h-[450px]"
          >
            <div className="bg-brand-dark text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-medium">Sleep Concierge</h3>
                <p className="text-xs text-gray-300">AI Assistant</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-brand-dark text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-2 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our mattresses..."
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-4 pr-12 py-3 outline-none focus:border-brand-gold transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-brand-dark text-white rounded-full disabled:opacity-50"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center lux-shadow transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'bg-white text-brand-dark' : 'bg-brand-dark text-white'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
