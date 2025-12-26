
import React from 'react';

interface SidebarProps {
  onQuickQuery: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onQuickQuery }) => {
  const categories = [
    { title: '제1장 계약일반', color: 'bg-gray-100', icon: '📋' },
    { title: '제2장 공사계약', color: 'bg-blue-50', icon: '🏗️' },
    { title: '제3장 용역계약', color: 'bg-green-50', icon: '🛠️' },
    { title: '제4장 물품계약', color: 'bg-orange-50', icon: '📦' },
  ];

  const quickLinks = [
    "공사 수의계약 금액 기준은?",
    "추정가격과 예정가격의 차이",
    "용역 계약 업무 절차 알려줘",
    "계약 시 필요한 서류 목록",
    "여성기업 수의계약 한도"
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-gray-200 bg-white sticky top-0 overflow-y-auto p-6 gap-8">
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">편람 주요 카테고리</h3>
        <div className="space-y-2">
          {categories.map((cat, idx) => (
            <div key={idx} className={`${cat.color} p-3 rounded-xl border border-transparent hover:border-blue-200 transition-all cursor-default`}>
              <span className="mr-2">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700">{cat.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">자주 묻는 질문</h3>
        <div className="flex flex-col gap-2">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onQuickQuery(link)}
              className="text-left text-sm p-3 rounded-lg border border-gray-100 hover:bg-blue-50 hover:border-blue-200 text-gray-600 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto bg-yellow-50 p-4 rounded-xl border border-yellow-100">
        <p className="text-xs text-yellow-800 leading-relaxed">
          <strong>⚠️ 공지사항:</strong><br />
          이 AI는 2021년 편람을 기준으로 합니다. 2024년 최신 법령 변경 사항은 꼭 별도로 확인하세요.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
