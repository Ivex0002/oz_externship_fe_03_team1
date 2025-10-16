import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';

const StudyGroups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">스터디 그룹</h1>
          <p className="text-gray-600">함께 공부하며 성장하는 스터디 그룹에 참여해보세요</p>
        </div>

        {/* 서치 바 */}
        <div className="mb-12">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="....."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* 진행 중인 스터디 그룹 섹션 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">진행중인 스터디</h2>
          <p className="text-gray-600 mb-8">현재 활발히 진행되고 있는 스터디 그룹들</p>
          <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              검색된 진행중인 스터디가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">새로운 스터디 그룹을 만들어보세요!</p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <span className="text-xl">+</span>
              <span>스터디 그룹 만들기</span>
            </button>
          </div>
        </div>

        {/* 완료된 스터디 그룹 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">완료된 스터디</h2>
          <p className="text-gray-600 mb-8">성공적으로 마무리된 스터디 그룹들</p>
          <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
              <img
                src="/medal.svg"
                alt="매달 아이콘"
                className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              검색된 완료된 스터디가 없습니다
            </h3>
            <p className="text-gray-600">아직 완료된 스터디 그룹이 없습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyGroups;