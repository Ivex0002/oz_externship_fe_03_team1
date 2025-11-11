import { StudyCalendar } from '../pages/study-group-detail/StudyCalendar';
import { StudyRecordList } from '../pages/study-group-detail/StudyRecordList';
import { StudyInfoAndCourses } from '../pages/study-group-detail/StudyInfoAndCourses';
import { StudyMemberList } from '../pages/study-group-detail/StudyMemberList';
import { StudyBannerSection } from '../pages/study-group-detail/StudyBannerSection';
import { studyGroupDetail } from '@/assets/dummyData/dummyStudyGroupDetail';
import dayjs from '@/lib/dayjs';
import { getStatusText } from '@/utils/statusFormatter';
import { storeAccessToken } from '@/store/storeAccessToken';
import { useEffect } from 'react';

export const StudyGroupDetail = () => {
  const {setAccessToken}=storeAccessToken() //토큰확인용 푸시 전 삭제
  const startDate = dayjs(studyGroupDetail.start_at).format('L');
  const endDate = dayjs(studyGroupDetail.end_at).format('L');
  const statusText = getStatusText(studyGroupDetail.status);
  const formattedInfo ={
    startDate: startDate,
    endDate: endDate,
    statusText: statusText,
    memberCount: `${studyGroupDetail.current_headcount}/${studyGroupDetail.max_headcount}`
  }
  useEffect(() => { //토큰확인용 푸시 전 삭제
  setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyOTE5ODUwLCJpYXQiOjE3NjI4MzM0NTAsImp0aSI6Ijc4Y2E4MTEzYjcwYjQzYjk5YTViYWEwNTk0YzE0YWIwIiwidXNlcl9pZCI6IjEifQ.P2lkDEPTYSCDu0lVNwRHFk23MJDZULvJlgnQbfdz2Uk")
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] mx-auto px-[80px]">

        <StudyBannerSection 
          isLeader={studyGroupDetail.is_me_leader} 
          formattedInfo={formattedInfo}
          title={studyGroupDetail.name}
          imgUrl={studyGroupDetail.profile_img_url}
          studyGroupId={studyGroupDetail.uuid}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <StudyCalendar groupId={studyGroupDetail.uuid} />
            <StudyRecordList groupId={studyGroupDetail.uuid} />
          </div>

          <div className="space-y-6 hidden lg:block">
            <StudyInfoAndCourses 
            formattedInfo={formattedInfo}
            lectures={studyGroupDetail.lectures}
            />
            <StudyMemberList 
              members={studyGroupDetail.members}
              currentHeadcount={studyGroupDetail.current_headcount}
              isLeader={studyGroupDetail.is_me_leader}
              studyGroupId={studyGroupDetail.uuid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};