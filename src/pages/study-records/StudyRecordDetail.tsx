import { dummyStudyRecordDetail } from '@/assets/dummyData/dummyStudyRecordDetail'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import StudyRecordAISummary from './StudyRecordAISummary'
import dayjs from '@/lib/dayjs'

export default function StudyRecordDetail() {
  const { data } = dummyStudyRecordDetail
  const { title, author, content, ai_summary, attachments, created_at } = data

  const handleBack = () => {
    alert('스터디 그룹으로 돌아가기')
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <div className="flex gap-2">
            <button className="rounded-lg bg-[#F3F4F6] px-3 py-1.5 text-sm font-medium text-[#374151] transition hover:bg-gray-100">
              수정하기
            </button>
            <button className="rounded-lg bg-[#FEE2E2] px-3 py-1.5 text-sm font-medium text-[#B91C1C] transition hover:bg-[#FCA5A5]/40">
              삭제하기
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={author.profile_image_url}
            alt={author.nickname}
            className="h-9 w-9 rounded-full"
          />
          <span>
            작성일: {dayjs(created_at).format('YYYY. MM. DD. A hh:mm')}
          </span>
        </div>

        <div className="-mx-10 my-6 border-t border-gray-200" />

        <StudyRecordAISummary summaryData={ai_summary} />

        <div className="-mx-10 my-6 border-t border-gray-200" />

        <section className="prose prose-neutral mb-10 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </section>

        <section className="rounded-xl border border-gray-200 bg-[#FAFAFA] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-gray-800">
            <img
              src="/icons/attachment.svg"
              alt="attachment"
              className="h-[15px] w-[13px]"
            />
            <h3 className="text-lg font-semibold">
              첨부 파일 ({attachments.length}개)
            </h3>
          </div>

          <div className="space-y-3">
            {attachments.map((file) => (
              <div
                key={file.filename}
                className="flex items-center justify-between rounded-lg border border-[#E4E0C6] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/icons/file.svg"
                    alt="file"
                    className="h-[15px] w-[13px] opacity-80"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.filename}
                    </p>
                    <p className="text-xs text-gray-500">다운로드 가능</p>
                  </div>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  다운로드
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <BasicButton
            type="outline"
            size="medium"
            className="flex items-center gap-2 border-gray-300 text-gray-800 hover:bg-gray-50"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            스터디 그룹으로 돌아가기
          </BasicButton>
        </div>
      </div>
    </div>
  )
}
