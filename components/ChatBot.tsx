import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, ExternalLink, ChevronRight } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  options?: string[]; // New field for quick reply chips
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  // Initial message uses the options system manually for the first interaction
  const [messages, setMessages] = useState<Message[]>([
    { 
        id: '0', 
        role: 'model', 
        text: '¡Hola! Soy Neo. ¿Qué buscas hoy?',
        options: ["Ganar Dinero Gratis", "Invertir Capital", "Auditar una Estafa"] 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  // Function to process AI response and extract options
  const parseAIResponse = (rawText: string): { cleanText: string, options?: string[] } => {
      const optionRegex = /\|\|OPTIONS:\s*(\[.*?\])\|\|/;
      const match = rawText.match(optionRegex);

      if (match) {
          try {
              // Extract text before the options marker
              const cleanText = rawText.replace(optionRegex, '').trim();
              // Parse the JSON array string
              const options = JSON.parse(match[1]);
              return { cleanText, options };
          } catch (e) {
              console.error("Error parsing AI options:", e);
              return { cleanText: rawText.replace(optionRegex, '').trim() };
          }
      }
      return { cleanText: rawText };
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || !chatSessionRef.current || isLoading) return;

    setIsLoading(true);

    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);

    try {
      // 2. Get AI Response
      const result = await chatSessionRef.current.sendMessage({ message: textToSend });
      const rawResponse = result.text || "Error de conexión.";
      
      // 3. Parse options logic
      const { cleanText, options } = parseAIResponse(rawResponse);

      const botMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          role: 'model', 
          text: cleanText,
          options: options
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Error de sistema. Intenta reformular." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSend(input);
      setInput('');
  };

  const handleOptionClick = (option: string) => {
      handleSend(option);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      
      // If simple anchor like #directory, just scroll
      // If complex deep link like #method-1, modify hash so components react
      
      if (href.startsWith('#')) {
          // Push hash to trigger useEffects in components
          window.location.hash = href;
          
          // Fallback scroll just in case
          const targetId = href.replace('#', '');
          const element = document.getElementById(targetId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
              // Maybe it's a section ID derived from the item ID (e.g., #directory for #method-1)
              // But now we use precise IDs on items, so the specific element should exist.
              // If it's a scam link, WallOfShame handles it via hash change.
          }
      }
  };

  const renderFormattedText = (text: string) => {
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-neonGreen font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
              return (
                <a 
                    key={index} 
                    href={match[2]}
                    onClick={(e) => handleLinkClick(e, match[2])}
                    className="inline-flex items-center gap-1 text-techPurple bg-techPurple/10 px-1.5 py-0.5 rounded hover:bg-techPurple hover:text-white font-bold transition-all mx-1 text-xs uppercase tracking-wide no-underline border border-techPurple/30"
                >
                    {match[1]} <ExternalLink size={10} />
                </a>
              );
          }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-neon transition-all duration-300 group ${isOpen ? 'rotate-90 bg-surface border border-white/10' : 'bg-neonGreen text-black hover:scale-110'}`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} fill="currentColor" />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-techPurple rounded-full animate-ping"></span>}
      </button>

      <div className={`fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] bg-[#0c0c0c] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-40 border border-white/10 shadow-2xl ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 bg-black/80 backdrop-blur border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neonGreen to-techPurple p-[2px]">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <Sparkles size={18} className="text-white" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">Asistente Neo</h3>
                    <span className="text-[10px] text-neonGreen font-mono flex items-center gap-1">
                        ● ONLINE
                    </span>
                </div>
            </div>
            <button onClick={() => setMessages([])} className="text-[10px] text-gray-500 hover:text-white transition-colors">
                Reiniciar
            </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {/* Message Bubble */}
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-white text-black font-medium rounded-br-sm' 
                        : 'bg-[#1a1a1a] border border-white/10 text-gray-200 rounded-bl-sm'
                    }`}>
                        {renderFormattedText(msg.text)}
                    </div>

                    {/* Quick Reply Chips (Only show if it's the last message from model and not loading) */}
                    {msg.role === 'model' && msg.options && msg.id === messages[messages.length - 1].id && !isLoading && (
                        <div className="flex flex-wrap gap-2 mt-3 animate-fadeIn">
                            {msg.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-4 py-2 bg-neonGreen/10 border border-neonGreen/30 hover:bg-neonGreen hover:text-black text-neonGreen text-xs font-bold rounded-full transition-all flex items-center gap-1"
                                >
                                    {option} <ChevronRight size={12} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-[#1a1a1a] border border-white/5 p-3 rounded-2xl rounded-bl-sm flex gap-2 items-center">
                        <Loader2 size={16} className="animate-spin text-neonGreen" />
                        <span className="text-xs text-gray-500">Analizando...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={onFormSubmit} className="p-3 bg-black border-t border-white/10 flex gap-2">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe algo..."
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-neonGreen/50 transition-colors placeholder:text-gray-600"
            />
            <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-white text-black rounded-full hover:bg-neonGreen transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send size={18} />
            </button>
        </form>
      </div>
    </>
  );
};