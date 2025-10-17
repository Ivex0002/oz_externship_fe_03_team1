import React, { useState, useMemo } from 'react';
import { Search, Users, Calendar } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import '../App.css'; 

interface Study {
  id: number;
  title: string;
  description: string;
  members: number;
  maxMembers: number;
  startDate: string;
  endDate: string;
  category: string;
  status: 'active' | 'completed';
  lectures: Array<{
    title: string;
    instructor: string;
  }>;
  rating: number;
  reviewCount: number;
}

const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 더미 데이터

  const studies: Study[] = [
    {
      id: 1,
      title: '알고리즘 스터디',
      description: '코딩테스트 대비',
      members: 8,
      maxMembers: 10,
      startDate: '2024년 2월 1일',
      endDate: '2024년 4월 30일',
      category: '프로그래밍',
      status: 'active',
      lectures: [
        { title: 'React 완벽 마스터 강의', instructor: '강개발' },
        { title: 'Next.js 실전 가이드', instructor: '박코딩' }
      ],
      rating: 4.7,
      reviewCount: 3
    },
    {
      id: 2,
      title: '리액트 마스터하기',
      description: 'React 심화 학습',
      members: 5,
      maxMembers: 8,
      startDate: '2024년 1월 15일',
      endDate: '2024년 3월 15일',
      category: '웹개발',
      status: 'active',
      lectures: [
        { title: 'Python 데이터 사이언스', instructor: '이데이터' },
        { title: '머신러닝 입문', instructor: '김AI' }
      ],
      rating: 4.7,
      reviewCount: 3
    },
    {
      id: 3,
      title: '영어회화 스터디',
      description: '매일 영어로 대화',
      members: 12,
      maxMembers: 15,
      startDate: '2024년 9월 20일',
      endDate: '2024년 11월 30일',
      category: '어학',
      status: 'active',
      lectures: [
        { title: 'Python 데이터 사이언스', instructor: '이데이터' },
        { title: '머신러닝 입문', instructor: '김AI' }
      ],
      rating: 4.7,
      reviewCount: 3
    },
    {
      id: 4,
      title: '자바스크립트 기초',
      description: '자바스크립트 기본',
      members: 10,
      maxMembers: 10,
      startDate: '2023년 10월 1일',
      endDate: '2023년 12월 31일',
      category: '프로그래밍',
      status: 'completed',
      lectures: [
        { title: 'Node.js 백엔드 개발 완주', instructor: '박서버' },
        { title: 'Express.js 심화', instructor: '김노드' }
      ],
      rating: 4.7,
      reviewCount: 3
    },
    {
      id: 5,
      title: '토익 800+ 달성',
      description: '토익 고득점 학습',
      members: 6,
      maxMembers: 6,
      startDate: '2023년 9월 1일',
      endDate: '2023년 11월 30일',
      category: '어학',
      status: 'completed',
      lectures: [
        { title: 'Vue.js 완벽 마스터', instructor: '최뷰' },
        { title: 'Vuex 상태관리', instructor: '장리액트' }
      ],
      rating: 4.7,
      reviewCount: 3
    },
    {
      id: 6,
      title: '파이썬 데이터분석',
      description: 'Python 데이터 분석',
      members: 8,
      maxMembers: 8,
      startDate: '2023년 9월 1일',
      endDate: '2023년 12월 15일',
      category: '데이터',
      status: 'completed',
      lectures: [
        { title: 'TypeScript 마스터', instructor: '김타입' }
      ],
      rating: 4.7,
      reviewCount: 3
    }
  ];

  // 초성 검색 기능
  const getChosung = (text: string): string => {
    const chosung = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) - 44032;
      if (code > -1 && code < 11172) {
        result += chosung[Math.floor(code / 588)];
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  };

  const filteredActiveStudies = useMemo(() => {
    const activeStudies = studies.filter(s => s.status === 'active');
    
    if (!searchQuery.trim()) {
      return activeStudies;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return activeStudies.filter(study => {
      const title = study.title.toLowerCase();
      const description = study.description.toLowerCase();
      const category = study.category.toLowerCase();
      
      // 일반 검색
      const normalMatch = 
        title.includes(query) || 
        description.includes(query) || 
        category.includes(query);
      
      // 초성 검색
      const titleChosung = getChosung(study.title);
      const chosungMatch = titleChosung.includes(query.toUpperCase());
      
      return normalMatch || chosungMatch;
    });
  }, [searchQuery]);

  // 완료된 스터디는 검색 없이 전체 표시는 변경하지 않고 유지
  const completedStudies = studies.filter(s => s.status === 'completed');

  // 스터디 카드 컴포넌트
  const StudyCard: React.FC<{ study: Study }> = ({ study }) => (
    // 'gray-200'은 'color-gray-200'으로 변경
    <div className="bg-white rounded-xl border border-color-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* 카드 이미지 */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <img 
          src="/test1.svg"
          alt={study.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-color-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {study.status === 'active' ? '진행중' : '완료'}
          </span>
        </div>
        {/* 인원 */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-color-gray-800">
            {study.members}/{study.maxMembers}명
          </span>
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-color-gray-900 mb-3">{study.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-color-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          <span>스터디 기간</span>
        </div>
        <p className="text-sm text-color-gray-700 mb-4">{study.startDate} ~ {study.endDate}</p>
        
        <div className="flex items-center gap-2 text-sm text-color-gray-600 mb-2">
          <span className="font-semibold"> 스터디 강의 ({study.lectures.length})</span>
        </div>
        <div className="space-y-2 mb-6">
          {study.lectures.map((lecture, idx) => (
            <div key={idx}>
              <p className="text-sm font-medium text-color-gray-800">{lecture.title}</p>
              <p className="text-xs text-color-gray-500">{lecture.instructor}</p>
            </div>
          ))}
        </div>

        {/* 하단 버튼 영역 */}
        {study.status === 'active' ? (
          <div className="flex justify-end">
            <button className="text-color-primary-500 hover:text-color-primary-600 font-semibold text-sm flex items-center gap-1 transition-colors">
              자세히 보기
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-4 border-t border-color-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-color-gray-800">{study.rating}</span>
              <span className="text-sm text-color-gray-500">({study.reviewCount})</span>
            </div>
            <button className="text-color-primary-500 hover:text-color-primary-600 font-semibold text-sm flex items-center gap-1 transition-colors">
              자세히 보기
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-color-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">스터디 그룹</h1>
          <p className="text-gray-600">함께 공부하며 성장하는 스터디 그룹에 참여해보세요</p>
        </div>

        {/* 서치 바 */}
        <div className="mb-12">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="....."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-primary-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* 진행 중인 스터디 그룹 섹션 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">진행중인 스터디</h2>
              <p className="text-gray-600">현재 활발히 진행되고 있는 스터디 그룹들</p>
            </div>
            {filteredActiveStudies.length > 0 && (
              <span className="text-success-600 font-semibold">{filteredActiveStudies.length}개 진행중</span>
            )}
          </div>
          
          {filteredActiveStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredActiveStudies.map(study => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                검색된 진행중인 스터디가 없습니다
              </h3>
              <p className="text-gray-600 mb-6">새로운 스터디 그룹을 만들어보세요!</p>
              <BasicButton type='primary'>
                <span className="text-xl">+</span>
                <span>스터디 그룹 만들기</span>
              </BasicButton>
            </div>
          )}
        </div>

        {/* 완료된 스터디 그룹 */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">완료된 스터디</h2>
              <p className="text-gray-600">성공적으로 마무리된 스터디 그룹들</p>
            </div>
            {completedStudies.length > 0 && (
              <span className="text-gray-600 font-semibold">{completedStudies.length}건 완료됨</span>
            )}
          </div>
          
          {completedStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedStudies.map(study => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-16 flex flex-col items-center justify-center">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;