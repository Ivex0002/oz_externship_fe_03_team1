import React from 'react';
import { Users } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import test1 from '/medal.svg';

interface ActiveStudiesProps {
  title?: string;
  description?: string;
}

interface CompletedStudiesProps {
  title?: string;
  description?: string;
}

// 진행중인 스터디 컴포넌트
export const ActiveStudies: React.FC<ActiveStudiesProps> = ({ 
  title = "검색된 진행중인 스터디가 없습니다",
  description = "새로운 스터디 그룹을 만들어보세요"
}) => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <BasicButton type="primary" size="large">
          <span className="text-xl mr-2">+</span>
          <span>스터디 그룹 만들기</span>
        </BasicButton>
      </div>
    </section>
  );
};

// 완료된 스터디 컴포넌트
export const CompletedStudies: React.FC<CompletedStudiesProps> = ({ 
  title = "검색된 완료된 스터디가 없습니다",
  description = "아직 완료된 스터디 그룹이 없습니다"
}) => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 p-16 flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <img src={test1} alt="메달 아이콘" className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </section>
  );
};