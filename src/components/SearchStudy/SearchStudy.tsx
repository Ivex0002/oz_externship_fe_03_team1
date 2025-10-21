import React, { useMemo } from 'react';
import { Users, Calendar, Star } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import test1 from '../../assets/dummyData/medal.svg'
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
// 더미 데이터 자리
    ],
    []
  );

  const activeStudies = useMemo(() => studies.filter(s => s.status === 'active'), [studies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-12">
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
// 더미 데이터 자리
    ],
    []
  );

  const completedStudies = useMemo(() => studies.filter(s => s.status === 'completed'), [studies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section>
          {completedStudies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {completedStudies.map(study => (
                <StudyCard key={study.id} study={study} showReview={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <img
                src={test1}
                alt="메달 아이콘"
                className="w-12 h-12 text-gray-400" 
                />
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