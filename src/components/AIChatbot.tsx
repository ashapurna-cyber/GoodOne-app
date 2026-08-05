import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MessageSquare, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const AIChatbot: React.FC = () => {
  const { products, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Namaste! I am Goodie 🤖, your AI Assistant. How can I help you find products, track orders, or check today\'s offers?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Send query to Express /api/chat endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, catalog: products.map((p) => ({ title: p.title, price: p.price, category: p.category })) })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: data.reply || 'I am happy to assist you with GoodOne products!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Server response error');
      }
    } catch (err) {
      // Local fallback response engine
      setTimeout(() => {
        let replyText = 'I am here to help! You can explore Mobiles, Electronics, Fashion, or check your orders anytime in your Dashboard.';
        const lower = query.toLowerCase();
        if (lower.includes('phone') || lower.includes('mobile')) {
          replyText = 'We have hot deals on iPhone 15 Pro, Samsung Galaxy S24 Ultra, and Redmi Note 13 Pro 5G! Check out our Mobiles category for up to 30% OFF.';
        } else if (lower.includes('coupon') || lower.includes('discount')) {
          replyText = 'Use promo code "GOODONE10" at checkout to get an instant 10% discount on orders above ₹1,000!';
        } else if (lower.includes('delivery') || lower.includes('track')) {
          replyText = 'Free delivery is available on all orders above ₹499. You can track active shipments directly from your User Dashboard under "My Orders".';
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 600);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xs font-black pr-1 hidden sm:inline">Ask Goodie AI</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 w-[340px] sm:w-[380px] h-[480px] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wide">Goodie AI Assistant</h3>
                <span className="text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  Online • Powered by Gemini
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs font-medium shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span className={`text-[9px] block text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Goodie is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 overflow-x-auto flex gap-1.5 text-[10px] no-scrollbar">
            <button
              onClick={() => handleSendMessage('Best mobile deals under ₹30,000')}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-full border border-slate-200 dark:border-slate-600 whitespace-nowrap hover:bg-blue-50"
            >
              📱 Mobile Deals
            </button>
            <button
              onClick={() => handleSendMessage('Show active coupon codes')}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-full border border-slate-200 dark:border-slate-600 whitespace-nowrap hover:bg-blue-50"
            >
              🎟️ Promo Codes
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
