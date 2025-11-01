// StudyGroupDetail.tsx
import { useState } from 'react';
import { StudyCalendar } from '../pages/study-group-detail/StudyCalendar';
import { StudyRecordList } from '../pages/study-group-detail/StudyRecordList';
import { StudyInfoAndCourses } from '../pages/study-group-detail/StudyInfoAndCourses';
import { StudyMemberList } from '../pages/study-group-detail/StudyMemberList';
import { StudyBannerSection } from '../pages/study-group-detail/StudyBannerSection';
import { studyGroupDetail } from '@/assets/dummyData/dummyStudyGroupDetail';
import { dummySchedule } from '@/assets/dummyData/dummySchedule';

interface Record {
  title: string;
  author: string;
  date: string;
  time: string;
  attachments: number;
}

export const StudyGroupDetail = () => {
  // API 데이터의 members 배열에서 현재 사용자가 리더인지 확인
  const currentUserIsLeader = studyGroupDetail.members.some(member => member.is_leader);
  const [isLeader, setIsLeader] = useState(currentUserIsLeader);

  // StudyRecordList용 더미 데이터 (나중에 API로 대체)
  const records: Record[] = [
    { 
      title: '첫 번째 스터디 후기', 
      author: '김철수', 
      date: '2025.10.26', 
      time: '14:30', 
      attachments: 2 
    },
    { 
      title: '두 번째 스터디 자료', 
      author: '이영희', 
      date: '2025.10.28', 
      time: '16:00', 
      attachments: 1 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] max-w-7xl mx-auto px-6">

        {/* 1. 배너 섹션 컴포넌트 */}
        <StudyBannerSection 
          isLeader={isLeader} 
          setIsLeader={setIsLeader} 
          studyGroup={studyGroupDetail} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 왼쪽: 스케줄 관리 + 스터디 기록 (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">

            {/* 2. 달력 부분 컴포넌트 */}
            <StudyCalendar schedule={dummySchedule} />

            {/* 3. 스터디 기록 컴포넌트 */}
            <StudyRecordList records={records} />
          </div>

          {/* 오른쪽: 스터디 정보 + 강의 + 멤버 */}
          <div className="space-y-6 hidden lg:block">

            {/* 4. 스터디 정보와 스터디 강의 컴포넌트 */}
            <StudyInfoAndCourses studyGroup={studyGroupDetail} />

            {/* 5. 멤버 목록 컴포넌트 - API의 members 사용 */}
            <StudyMemberList 
              members={studyGroupDetail.members}
              isLeader={isLeader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};