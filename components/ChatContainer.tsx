
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">무엇을 도와드릴까요?</h2>
          <p className="max-w-md text-gray-600 leading-relaxed">
            경남교육청 2021 계약실무편람에 대해 궁금한 점을 물어보세요.<br/>
            공사, 용역, 물품 계약 절차부터 금액 기준까지 차근차근 알려드립니다.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
            {msg.role === 'assistant' && (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-1">
                <span className="text-xs font-bold">AI</span>
              </div>
            )}
            <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.content}
              <div className={`mt-2 text-[10px] ${msg.role === 'user' ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="flex flex-row gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white animate-pulse">
              <span className="text-xs font-bold">AI</span>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
