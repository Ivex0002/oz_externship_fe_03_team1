import { useState } from 'react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import { StudyCalendar } from './study-group-detail/StudyCalendar';
import { StudyPostList } from './study-group-detail/StudyPostList';
import { StudyInfoAndCourses } from './study-group-detail/StudyInfoAndCourses';
import { StudyMemberList } from './study-group-detail/StudyMemberList';
import { dummySchedule } from '@/assets/dummyData/dummySchedule';
import { studyGroup } from '@/assets/dummyData/studyGroup.ts';
import { StudyBannerSection } from './study-group-detail/StudyBannerSection.tsx';

/**
 * 인터페이스 정의
 */
interface Post {
  title: string;
  author: string;
  date: string;
  time: string;
  attachments: number;
}

const StudyGroupDetail = () => {
  const [isLeader, setIsLeader] = useState(studyGroup.is_leader);
  const [_hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // StudyPostList용 더미 데이터 (나중에 API로 대체)
  const posts: Post[] = [
    { title: '첫 번째 스터디 후기', author: '김철수', date: '2025.10.26', time: '14:30', attachments: 2 },
    { title: '두 번째 스터디 자료', author: '이영희', date: '2025.10.28', time: '16:00', attachments: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] max-w-7xl mx-auto px-6">

        {/* 1. 배너 섹션 컴포넌트 */}
        <StudyBannerSection 
          isLeader={isLeader} 
          setIsLeader={setIsLeader} 
          studyGroup={studyGroup} 
          BasicButton={BasicButton} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 왼쪽: 스케줄 관리 + 스터디 기록 (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">

            {/* 2. 달력 부분 컴포넌트 */}
            <StudyCalendar 
              schedule={dummySchedule} 
              BasicButton={BasicButton}
            />

            {/* 3. 스터디 기록 컴포넌트 */}
            <StudyPostList 
              posts={posts} 
              BasicButton={BasicButton}
            />
          </div>

          {/* 오른쪽: 스터디 정보 + 강의 + 멤버 (숨겨진 블록) */}
          <div className="space-y-6 hidden lg:block">

            {/* 4. 스터디 정보와 스터디 강의 컴포넌트 */}
            <StudyInfoAndCourses 
              studyGroup={studyGroup} 
            />

            {/* 5. 멤버 목록 컴포넌트 */}
            <StudyMemberList 
              participants={dummySchedule.participants}
              isLeader={isLeader}
              showTooltip={showTooltip}
              setHoveredMember={setHoveredMember}
              setShowTooltip={setShowTooltip}
              BasicButton={BasicButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupDetail;