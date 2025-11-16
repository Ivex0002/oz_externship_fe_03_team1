import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useNavigate } from 'react-router'
import { useQueryStudyRecords } from '@/hooks/api/queries/useQueryStudyRecords'
import dayjs from '@/lib/dayjs'

interface StudyRecordListProps {
  groupId: string
}

export const StudyRecordList = ({ groupId }: StudyRecordListProps) => {
  const navigate = useNavigate()
  const { data, isPending, isError } = useQueryStudyRecords(groupId)
  const recordsList = data?.data?.data
  const handleWriteClick = () => {
    navigate(`/create_study_record/${groupId}`)
  }

  const handleRecordClick = (groupId: string, recordId: number) => {
    navigate(`/study_record_detail/${groupId}/${recordId}`)
  }

  if (isPending) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">
            스터디 기록을 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    )
  }

  // records 데이터 정규화 - API 응답이 배열이 아닐 수 있음
  // const recordsList = data

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">스터디 기록</h2>
        <BasicButton
          variant="primary"
          size="small"
          className="flex cursor-pointer items-center gap-2 !px-4 !py-2 !text-sm text-white"
          onClick={handleWriteClick}
        >
          <img
            src="/icons/pen.svg"
            alt="write"
            className="h-4 w-4 brightness-0 invert filter"
          />
          작성하기
        </BasicButton>
      </div>

      {recordsList?.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="mb-2 text-gray-500">
              아직 작성된 스터디 기록이 없습니다.
            </p>
            <p className="text-sm text-gray-400">
              첫 스터디 기록을 작성해보세요!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {recordsList?.map((record) => (
            <div
              key={record.id}
              className="hover:border-primary-400 hover:bg-primary-50/40 group cursor-pointer rounded-xl border border-gray-200 transition-all"
              onClick={() => handleRecordClick(groupId, record.id)}
            >
              <div className="flex items-center justify-between p-4">
                <h3 className="group-hover:text-primary-700 text-[28px] text-gray-900">
                  {record.title}
                </h3>
                <span className="text-xs font-[14px] text-gray-500">
                  {dayjs(record.created_at).format('YYYY. MM. DD A HH:mm')}
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 pb-4">
                <img
                  src="/member.svg"
                  alt={record.author.nickname}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {record.author.nickname}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/attachment.svg"
                      alt="파일 첨부"
                      className="filter: contrast-84; w-[8.5px] brightness-90 hue-rotate-182 invert-47 saturate-755 sepia-7"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      첨부파일 {record.files_count}개
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
