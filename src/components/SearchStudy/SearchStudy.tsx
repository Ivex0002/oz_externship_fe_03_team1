import React, { useMemo } from 'react';
import { Users, Calendar, Star } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';

interface Lecture {
  title: string;
  instructor: string;
}

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
  lectures: Lecture[];
  rating: number;
  reviewCount: number;
  userHasReview?: boolean;
  cover?: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < filled ? 'text-primary-400' : 'text-gray-300'}`}
          fill={i < filled ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const StudyCard: React.FC<{ study: Study; showReview?: boolean }> = ({ study, showReview = false }) => {
  const hasReview = !!study.userHasReview;
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
        {study.cover && (
          <img
            src={study.cover}
            alt={study.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${study.status === 'active' ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {study.status === 'active' ? '진행중' : '완료'}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-gray-800">{study.members}/{study.maxMembers}명</span>
        </div>
      </div>

      {/* 내용영역 */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{study.description}</p>

        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{study.startDate} ~ {study.endDate}</span>
          </div>
        </div>

        <div className="flex-1 mb-4 space-y-2">
          <div className="text-sm text-gray-700 font-semibold">스터디 강의 ({study.lectures.length})</div>
          <div className="text-sm text-gray-600 space-y-1">
            {study.lectures.map((lec, idx) => (
              <div key={idx}>
                <div className="text-sm font-medium text-gray-800">{lec.title}</div>
                <div className="text-xs text-gray-500">{lec.instructor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼/리뷰 영역 */}
        {showReview ? (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">스터디 리뷰</span>
                <div className="flex items-center gap-1">
                  <StarRating rating={study.rating} />
                  <span className="text-sm font-semibold text-gray-600">{study.rating}</span>
                  <span className="text-sm text-gray-500">({study.reviewCount})</span>
                </div>
              </div>
              <button 
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => alert(`상세보기: ${study.title}`)}
              >
                상세보기
              </button>
            </div>
            
            <BasicButton
              type={hasReview ? 'secondary' : 'primary'}
              size="medium"
              onClick={() => {
                if (hasReview) alert(`리뷰 수정: ${study.title}`);
                else alert(`리뷰 작성: ${study.title}`);
              }}
            >
              {hasReview ? '리뷰 수정하기' : '리뷰 참여하기'}
            </BasicButton>
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button className="text-primary-500 hover:text-primary-600 font-semibold text-sm flex items-center gap-1 transition-colors">
              자세히 보기 <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 진행중인 스터디 컴포넌트
export const ActiveStudies: React.FC = () => {
  const studies: Study[] = useMemo<Study[]>(
    () => [
      // {
      //   id: 1,
      //   title: 'React 실무 프로젝트 스터디',
      //   description: '팀으로 리얼 프로젝트 진행',
      //   members: 8,
      //   maxMembers: 10,
      //   startDate: '2024년 2월 1일',
      //   endDate: '2024년 4월 30일',
      //   category: '프로그래밍',
      //   status: 'active',
      //   lectures: [
      //     { title: 'React 완벽 마스터 강의', instructor: '강개발' },
      //     { title: 'Next.js 실전 가이드', instructor: '박코딩' },
      //   ],
      //   rating: 4.7,
      //   reviewCount: 3,
      //   cover: '/test1.svg',
      // },
      // {
      //   id: 2,
      //   title: 'Python 데이터 분석 스터디',
      //   description: '데이터 분석 실습과 피드백',
      //   members: 6,
      //   maxMembers: 8,
      //   startDate: '2024년 1월 15일',
      //   endDate: '2024년 3월 15일',
      //   category: '데이터',
      //   status: 'active',
      //   lectures: [
      //     { title: 'Python 데이터 사이언스', instructor: '이데이터' },
      //     { title: '머신러닝 입문', instructor: '김AI' },
      //   ],
      //   rating: 4.3,
      //   reviewCount: 2,
      //   cover: '/test1.svg',
      // },
      // {
      //   id: 3,
      //   title: '영어회화 스터디',
      //   description: '매일 영어로 대화하는 모임',
      //   members: 12,
      //   maxMembers: 15,
      //   startDate: '2024년 9월 20일',
      //   endDate: '2024년 11월 30일',
      //   category: '어학',
      //   status: 'active',
      //   lectures: [
      //     { title: '토론 기반 회화', instructor: '제니' },
      //     { title: '발음 교정', instructor: '마이클' },
      //   ],
      //   rating: 4.0,
      //   reviewCount: 5,
      //   cover: '/test1.svg',
      // },
    ],
    []
  );

  const activeStudies = useMemo(() => studies.filter(s => s.status === 'active'), [studies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">진행중인 스터디</h2>
              <p className="text-gray-600">현재 활발히 진행되고 있는 스터디 그룹들</p>
            </div>
            <div>
              <span className="inline-block text-success-800 text-base font-semibold rounded-full bg-success-100 py-1 px-3">
                {activeStudies.length}개 진행중
              </span>
            </div>
          </div>

          {activeStudies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {activeStudies.map(study => (
                <StudyCard key={study.id} study={study} showReview={false} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">진행중인 스터디가 없습니다</h3>
              <p className="text-gray-600 mb-6">새로운 스터디 그룹을 만들어보세요!</p>
              <BasicButton type="primary" size="large">
                <span className="text-xl mr-2">+</span>
                <span>스터디 그룹 만들기</span>
              </BasicButton>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// 완료된 스터디 컴포넌트
export const CompletedStudies: React.FC = () => {
  const studies: Study[] = useMemo<Study[]>(
    () => [
      // {
      //   id: 4,
      //   title: 'Node.js 백엔드 개발팀',
      //   description: '실전 백엔드 프로젝트',
      //   members: 4,
      //   maxMembers: 6,
      //   startDate: '2023년 10월 1일',
      //   endDate: '2023년 12월 31일',
      //   category: '프로그래밍',
      //   status: 'completed',
      //   lectures: [
      //     { title: 'Node.js 백엔드 개발 완주', instructor: '박서버' },
      //     { title: 'Express.js 심화', instructor: '김백엔드' },
      //   ],
      //   rating: 4.7,
      //   reviewCount: 3,
      //   userHasReview: true,
      //   cover: '/test1.svg',
      // },
      // {
      //   id: 5,
      //   title: 'Vue.js 마스터 스터디',
      //   description: '프론트엔드 마스터 과정',
      //   members: 6,
      //   maxMembers: 8,
      //   startDate: '2023년 8월 1일',
      //   endDate: '2023년 11월 30일',
      //   category: '웹개발',
      //   status: 'completed',
      //   lectures: [
      //     { title: 'Vue.js 완벽 마스터', instructor: '정뷰' },
      //     { title: 'Vuex 상태관리', instructor: '김상태' },
      //   ],
      //   rating: 4.7,
      //   reviewCount: 3,
      //   userHasReview: false,
      //   cover: '/test1.svg',
      // },
      // {
      //   id: 6,
      //   title: 'TypeScript 심화 스터디',
      //   description: '타입 시스템과 실무 적용',
      //   members: 5,
      //   maxMembers: 6,
      //   startDate: '2023년 9월 1일',
      //   endDate: '2023년 12월 15일',
      //   category: '프로그래밍',
      //   status: 'completed',
      //   lectures: [{ title: 'TypeScript 마스터', instructor: '김타입' }],
      //   rating: 4.7,
      //   reviewCount: 3,
      //   userHasReview: true,
      //   cover: '/test1.svg',
      // },
    ],
    []
  );

  const completedStudies = useMemo(() => studies.filter(s => s.status === 'completed'), [studies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">완료된 스터디</h2>
              <p className="text-gray-600">성공적으로 마무리된 스터디 그룹들</p>
            </div>
            <div>
              <span className="inline-block text-gray-800 text-base font-semibold rounded-full bg-gray-100 py-1 px-3">
                {completedStudies.length}건 완료됨
              </span>
            </div>
          </div>

          {completedStudies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {completedStudies.map(study => (
                <StudyCard key={study.id} study={study} showReview={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">완료된 스터디가 없습니다</h3>
              <p className="text-gray-600">아직 완료된 스터디 그룹이 없습니다</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// 데모용 컴포넌트 (둘 다 확인할 수 있도록) 연결 시 필요없는 코드
const StudyComponents: React.FC = () => {
  return (
    <div>
      <ActiveStudies />
      <CompletedStudies />
    </div>
  );
};

export default StudyComponents;