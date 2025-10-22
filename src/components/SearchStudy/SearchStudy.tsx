import React from 'react';
import { Users } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import test1 from '/medal.svg';
import type { StudyGroup } from '@/types/StudyGroup';

interface ActiveStudiesProps {
  studies?: StudyGroup[];
}

interface CompletedStudiesProps {
  studies?: StudyGroup[];
}

// 진행중인 스터디 컴포넌트
export const ActiveStudies: React.FC<ActiveStudiesProps> = ({ studies = [] }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-12">
          {studies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">진행중인 스터디가 없습니다</h3>
              <p className="text-gray-600 mb-6">새로운 스터디 그룹을 만들어보세요</p>
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
export const CompletedStudies: React.FC<CompletedStudiesProps> = ({ studies = [] }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section>
          {studies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <img src={test1} alt="메달 아이콘" className="w-12 h-12 text-gray-400" />
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