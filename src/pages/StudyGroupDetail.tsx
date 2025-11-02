import { useState } from 'react';
import { StudyCalendar } from '../pages/study-group-detail/StudyCalendar';
import { StudyRecordList } from '../pages/study-group-detail/StudyRecordList';
import { StudyInfoAndCourses } from '../pages/study-group-detail/StudyInfoAndCourses';
import { StudyMemberList } from '../pages/study-group-detail/StudyMemberList';
import { StudyBannerSection } from '../pages/study-group-detail/StudyBannerSection';
import { studyGroupDetail } from '@/assets/dummyData/dummyStudyGroupDetail';

export const StudyGroupDetail = () => {
  const currentUserIsLeader = studyGroupDetail.members.some(member => member.is_leader);
  const [isLeader, setIsLeader] = useState(currentUserIsLeader);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] max-w-7xl mx-auto px-6">

        <StudyBannerSection 
          isLeader={isLeader} 
          setIsLeader={setIsLeader} 
          studyGroup={studyGroupDetail} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <StudyCalendar groupId={studyGroupDetail.id} />
            <StudyRecordList groupId={studyGroupDetail.id} />
          </div>

          <div className="space-y-6 hidden lg:block">
            <StudyInfoAndCourses studyGroup={studyGroupDetail} />
            <StudyMemberList 
              members={studyGroupDetail.members}
              currentHeadcount={studyGroupDetail.current_headcount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};