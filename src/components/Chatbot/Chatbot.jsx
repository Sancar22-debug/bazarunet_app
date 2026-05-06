import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { useTransactions } from '../../contexts/TransactionContext';
import { aiService } from '../../services/aiService';

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      type: 'bot', 
      content: "Hello! I'm your AI financial assistant for BazaraNet. How can I help you?", 
      isAI: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { getMetrics } = useTransactions();

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = { 
      id: Date.now().toString(), 
      type: 'user', 
      content: inputValue 
    };
    
    setMessages(prev => [...prev, userMsg]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const metrics = getMetrics();
      const response = await aiService.analyzeFinancialData(query, metrics, '');
      
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          type: 'bot', 
          content: response, 
          isAI: true 
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          type: 'bot', 
          content: "Error connecting to AI.", 
          isAI: false 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="card chat-container" style={{ padding: 0 }}>
      <div className="chat-header">
        <Bot size={24} color="var(--primary)" />
        <span>BazaraNet AI Assistant</span>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {isTyping && (
          <div 
            style={{ 
              color: 'var(--text-muted)', 
              fontSize: '14px', 
              fontStyle: 'italic' 
            }}
          >
            AI is typing...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your finances..." 
        />
        <button onClick={handleSend} disabled={isTyping}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};