
import React, { useState, useCallback } from 'react';
import { Message } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import { getGeminiResponse } from './services/gemini';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await getGeminiResponse(text, history);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || '죄송합니다. 답변을 가져오지 못했습니다.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const onQuickQuery = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onQuickQuery={onQuickQuery} />
      
      <div className="flex-1 flex flex-col h-full relative">
        <Header />
        
        <ChatContainer messages={messages} isTyping={isTyping} />

        <div className="p-4 md:p-6 bg-gradient-to-t from-gray-50 pt-10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="max-w-4xl mx-auto flex gap-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 계약 절차나 금액을 물어보세요..."
              className="flex-1 px-4 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`p-3 rounded-xl transition-all ${
                input.trim() && !isTyping 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
          <p className="text-[10px] text-center mt-3 text-gray-400">
            본 AI 서비스는 2021 계약실무편람을 학습하였습니다. 법적인 효력을 갖지는 않으며 실무 참고용으로 활용하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
