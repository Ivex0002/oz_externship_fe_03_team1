import { useState } from 'react'
import { dummyStudyRecordDetail } from '@/assets/dummyData/dummyStudyRecordDetail'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

export default function StudyRecordDetail() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(true)
  const { data } = dummyStudyRecordDetail
  const { title, author, content, ai_summary, attachments, created_at } = data

  const handleBack = () => {
    alert('스터디 그룹으로 돌아가기')
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* ✅ 전체 카드 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        {/* 제목 + 수정/삭제 */}
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

        {/* 작성자 정보 */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={author.profile_image_url}
            alt={author.nickname}
            className="h-9 w-9 rounded-full"
          />
          <span className="font-medium text-gray-700">{author.nickname}</span>
          <span>·</span>
          <span>{new Date(created_at).toLocaleString()}</span>
        </div>

        {/* ✅ 구분선 */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* ✅ AI 요약 박스 */}
        <section className="mb-10 rounded-xl border border-[#E4E0C6] bg-[#FEFCE8] p-6">
          <button
            onClick={() => setIsSummaryOpen((prev) => !prev)}
            className="flex w-full items-center justify-between text-left font-semibold text-gray-800"
          >
            <div className="flex items-center gap-2">
              <img src="/icons/ai-summary.svg" alt="AI" className="h-5 w-5" />
              <span>AI 학습 내용 요약</span>
            </div>
            {isSummaryOpen ? <ChevronUp /> : <ChevronDown />}
          </button>

          {isSummaryOpen && (
            <div className="mt-4 space-y-4 text-gray-800">
              <p className="leading-relaxed">{ai_summary.summary}</p>

              <div>
                <h3 className="mb-2 flex items-center gap-1 font-semibold text-gray-800">
                  <span>📌</span> 학습한 키워드
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ai_summary.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-[#FFF8D1] px-3 py-1 text-sm font-medium text-[#B68500]"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-1 font-semibold text-gray-800">
                  <span>📚</span> 추가 학습 추천 주제
                </h3>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                  {ai_summary.recommendations.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* 본문 */}
        <section className="prose prose-neutral mb-10 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </section>

        {/* 첨부 파일 */}
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

        {/* 돌아가기 버튼 */}
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
