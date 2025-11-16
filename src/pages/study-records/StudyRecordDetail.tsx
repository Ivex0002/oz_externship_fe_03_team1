import { ArrowLeft } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'
import { StudyRecordHeader } from './sections/StudyRecordHeader'
import { StudyRecordAISummary } from './sections/StudyRecordAISummary'
import { StudyRecordAttachments } from './sections/StudyRecordAttachments'
import { useQueryRecordDetail } from '@/hooks/api/queries/useQueryRecordDetail'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

export const StudyRecordDetail = () => {
  const { studyGroupId, studyRecordId } = useParams()
  const { data, error, isError, isPending } = useQueryRecordDetail(
    studyRecordId && studyGroupId
      ? { groupId: studyGroupId, noteId: Number(studyRecordId) }
      : { groupId: '', noteId: 0 }
  )
  if (isPending) <div>로딩중...</div>
  if (isError) toast.error(error.message)

  const recordData = data && data.data.data

  if (!recordData) return null

  const handleBack = () => {
    // TODO: 추후 navigate('/study-groups/ID') 등으로 연결 예정
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <RecordBreadcrumb current="상세" />

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <section className="p-10">
          <StudyRecordHeader
            title={recordData.title}
            author={recordData.author}
            created_at={recordData.created_at}
          />
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <StudyRecordAISummary summaryData={recordData.ai_summary} />
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <div className="prose prose-neutral max-w-none">
            <pre>{recordData.content}</pre>
          </div>
        </section>

        <section className="border-t border-gray-200 px-10 pt-0 pb-8">
          <StudyRecordAttachments attachments={recordData.attachments} />
        </section>
      </div>

      <div className="mt-6 flex justify-start">
        <BasicButton
          variant="ghost"
          size="medium"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          스터디 그룹으로 돌아가기
        </BasicButton>
      </div>
    </div>
  )
}
