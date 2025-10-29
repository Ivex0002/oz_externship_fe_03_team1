import { useState } from 'react'
import { dummyStudyRecordDetail } from '@/assets/dummyData/dummyStudyRecordDetail'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, User } from 'lucide-react'
import StudyRecordAISummary from './sections/StudyRecordAISummary'
import StudyRecordAttachments from './sections/StudyRecordAttachments'
import dayjs from '@/lib/dayjs'
import RecordBreadcrumb from '@/components/breadcrumb/RecordBreadcrumb'

export default function StudyRecordDetail() {
  const { data } = dummyStudyRecordDetail
  const { title, author, content, ai_summary, attachments, created_at } = data
  const [isImageError, setIsImageError] = useState(false)

  const handleBack = () => alert('스터디 그룹으로 돌아가기')

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <RecordBreadcrumb current="상세" />

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <section className="p-10">
          <div className="mb-4 flex items-start justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            <div className="flex gap-2">
              <BasicButton
                type="secondary"
                size="small"
                className="!h-[32px] !rounded-lg !bg-[#F3F4F6] !px-3 !py-[6px] !text-[14px] !font-medium !text-[#374151]"
                onClick={() => alert('수정하기')}
              >
                수정하기
              </BasicButton>

              <BasicButton
                type="danger"
                size="small"
                className="!h-[32px] !rounded-lg !bg-[#FEE2E2] !px-3 !py-[6px] !text-[14px] !font-medium !text-[#B91C1C] hover:!bg-[#FEE2E2] active:!bg-[#FEE2E2]"
                onClick={() => alert('삭제하기')}
              >
                삭제하기
              </BasicButton>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            {!isImageError && author.profile_image_url ? (
              <img
                src={author.profile_image_url}
                alt={author.nickname}
                className="h-9 w-9 rounded-full object-cover"
                onError={() => setIsImageError(true)}
              />
            ) : (
              <div className="bg-primary-100 flex h-9 w-9 items-center justify-center rounded-full">
                <User className="text-primary-600" size={20} />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                {author.nickname}
              </span>
              <span className="text-gray-400">·</span>
              <span>
                작성일: {dayjs(created_at).format('YYYY. MM. DD. A hh:mm')}
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <StudyRecordAISummary summaryData={ai_summary} />
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <div className="prose prose-neutral max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </section>

        <section className="border-t border-gray-200 px-10 pt-0 pb-8">
          <StudyRecordAttachments attachments={attachments} />
        </section>
      </div>

      <div className="mt-6 flex justify-start">
        <BasicButton
          type="ghost"
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
