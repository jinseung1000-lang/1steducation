
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">경남교육청 계약 멘토 AI</h1>
          <p className="text-xs text-gray-500 font-medium">2021 계약실무편람 기반 지능형 가이드</p>
        </div>
      </div>
      <div className="hidden md:block">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          신규 공무원 전용 헬프데스크
        </span>
      </div>
    </header>
  );
};

export default Header;
