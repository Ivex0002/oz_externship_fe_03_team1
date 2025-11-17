import { StudyCalendar } from '../pages/study-group-detail/StudyCalendar'
import { StudyRecordList } from './study-group-detail/StudyRecordList'
import { StudyInfoAndCourses } from '../pages/study-group-detail/StudyInfoAndCourses'
import { StudyMemberList } from '../pages/study-group-detail/StudyMemberList'
import { StudyBannerSection } from '../pages/study-group-detail/StudyBannerSection'
import dayjs from '@/lib/dayjs'
import { getStatusText } from '@/utils/statusFormatter'
import { useParams } from 'react-router'
import { useQueryStudyGroupDetail } from '@/hooks/api/queries/useQueryStudyGroupDetail'
import { toast } from 'react-toastify'

export const StudyGroupDetail = () => {
  const params = useParams()
  const { studyGroupId } = params
  const { data, error, isError, isPending } = useQueryStudyGroupDetail({
    groupId: studyGroupId,
  })
  const studyGroupDetailData = data && data.data
  if (!studyGroupDetailData) return <div>페이지를 찾을 수 없습니다.</div>
  if (isError) toast.error(error.message)
  if (isPending) <div> 로딩중... </div>

  const startDate = dayjs(studyGroupDetailData.start_at).format('L')
  const endDate = dayjs(studyGroupDetailData.end_at).format('L')
  const statusText = getStatusText(studyGroupDetailData.status)
  const formattedInfo = {
    startDate: startDate,
    endDate: endDate,
    statusText: statusText,
    memberCount: `${studyGroupDetailData.current_headcount}/${studyGroupDetailData.max_headcount}`,
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="px-[80px] pt-[60.5px]">
        <StudyBannerSection
          isLeader={studyGroupDetailData.is_me_leader}
          formattedInfo={formattedInfo}
          title={studyGroupDetailData.name}
          imgUrl={studyGroupDetailData.profile_img_url}
          studyGroupId={studyGroupDetailData.uuid}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <StudyCalendar groupId={studyGroupDetailData.uuid} />
            <StudyRecordList groupId={studyGroupDetailData.uuid} />
          </div>

          <div className="hidden space-y-6 lg:block">
            <StudyInfoAndCourses
              formattedInfo={formattedInfo}
              lectures={studyGroupDetailData.lectures}
            />
            <StudyMemberList
              members={studyGroupDetailData.members}
              currentHeadcount={studyGroupDetailData.current_headcount}
              isLeader={studyGroupDetailData.is_me_leader}
              studyGroupId={studyGroupDetailData.uuid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
