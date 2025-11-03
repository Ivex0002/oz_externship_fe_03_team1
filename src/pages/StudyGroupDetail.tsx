import { useState } from 'react';
import { StudyCalendar } from '../pages/study-group-detail/StudyCalendar';
import { StudyRecordList } from '../pages/study-group-detail/StudyRecordList';
import { StudyInfoAndCourses } from '../pages/study-group-detail/StudyInfoAndCourses';
import { StudyMemberList } from '../pages/study-group-detail/StudyMemberList';
import { StudyBannerSection } from '../pages/study-group-detail/StudyBannerSection';
import { studyGroupDetail } from '@/assets/dummyData/dummyStudyGroupDetail';
import dayjs from '@/lib/dayjs';
import { getStatusText } from '@/utils/statusFormatter';

export const StudyGroupDetail = () => {
  const currentUserIsLeader = studyGroupDetail.members.some(member => member.is_leader);
  const [isLeader, setIsLeader] = useState(currentUserIsLeader);
  const startDate = dayjs(studyGroupDetail.start_at).format('L');
  const endDate = dayjs(studyGroupDetail.end_at).format('L');
  const statusText = getStatusText(studyGroupDetail.status);
  const formattedInfo ={
    startDate: startDate,
    endDate: endDate,
    statusText: statusText,
    memberCount: `${studyGroupDetail.current_headcount}/${studyGroupDetail.max_headcount}`
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] mx-auto px-[80px]">

        <StudyBannerSection 

          isLeader={isLeader} 
          setIsLeader={setIsLeader} 
          formattedInfo={formattedInfo}
          title={studyGroupDetail.name}
          imgUrl={studyGroupDetail.profile_img_url}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <StudyCalendar groupId={studyGroupDetail.id} />
            <StudyRecordList groupId={studyGroupDetail.id} />
          </div>

          <div className="space-y-6 hidden lg:block">
            <StudyInfoAndCourses 
            formattedInfo={formattedInfo}
            lectures={studyGroupDetail.lectures}
            />
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