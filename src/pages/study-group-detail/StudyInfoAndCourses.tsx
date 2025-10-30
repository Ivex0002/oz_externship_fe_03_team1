import React from 'react';
import type { StudyGroup } from '@/types/StudyGroupTypes';
import { lectureList } from '@/assets/dummyData/lectureList'; // 또는 실제 경로

interface StudyInfoAndCoursesProps {
  studyGroup: StudyGroup;
}

export const StudyInfoAndCourses: React.FC<StudyInfoAndCoursesProps> = ({ 
  studyGroup 
}) => {
  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  // 상태 한글 변환
  const getStatusText = (status: string) => {
    switch(status) {
      case 'ONGOING': return '진행중';
      case 'PENDING': return '모집중';
      case 'ENDED': return '종료';
      default: return status;
    }
  };

  // 테스트용: lectureList에서 5개 가져오기
  const testLectures = lectureList.slice(0, 5);
  const lectureCount = testLectures.length;
  const shouldScroll = lectureCount > 2;

  return (
    <>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* 스터디 정보 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 정보</h2>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">인원</span>
            <span className="text-gray-900">{studyGroup.current_headcount} / {studyGroup.max_headcount}명</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">시작일</span>
            <span className="text-gray-900">{formatDate(studyGroup.start_at)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">종료일</span>
            <span className="text-gray-900">{formatDate(studyGroup.end_at)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">상태</span>
            <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
              {getStatusText(studyGroup.status)}
            </span>
          </div>
        </div>
      </div>

      {/* 스터디 강의 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 강의</h2>

        {/* 스크롤 가능한 컨테이너 */}
        <div 
          className={`space-y-6 ${shouldScroll ? 'overflow-y-auto hide-scrollbar max-h-[600px]' : ''}`}
        >
          {testLectures.map((lecture) => (
            <div
              key={lecture.id}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
            >
              {/* 강의 이미지 */}
              <div className="relative w-full">
                <img
                  src="/React.svg"
                  alt={lecture.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>

              {/* 강의 정보 */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1">
                  {lecture.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{lecture.instructor}</p>

                <button className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm flex items-center gap-1 group">
                  강의 바로가기
                  <img
                    src="/move.svg"
                    alt="move"
                    className="w-4 h-4 group-hover:opacity-70"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};