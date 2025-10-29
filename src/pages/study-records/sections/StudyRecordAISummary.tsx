import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type AISummaryProps = {
  summaryData: {
    title: string
    summary: string
    keywords: string[]
    recommendations: string[]
  }
}

export default function StudyRecordAISummary({ summaryData }: AISummaryProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/icons/ai-summary.svg"
            alt="AI"
            className="h-[15px] w-[15px]"
          />
          <h2 className="text-lg font-semibold text-gray-900">
            AI 학습 내용 요약
          </h2>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-800"
        >
          {isOpen ? (
            <>
              <EyeOff size={16} className="text-gray-500" />
              접기
            </>
          ) : (
            <>
              <Eye size={16} className="text-gray-500" />
              펼치기
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="rounded-xl bg-[#FEFCE8] p-6 text-gray-800">
          <p className="mb-4">{summaryData.title}</p>

          <div className="space-y-6">
            <section>
              <h3 className="mb-2 font-semibold">학습 내용 요약</h3>
              <p className="leading-relaxed text-gray-700">
                {summaryData.summary}
              </p>
            </section>

            <section>
              <h3 className="mb-2 font-semibold">학습한 키워드</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {summaryData.keywords.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 font-semibold">
                추가로 학습하면 좋은 내용 추천
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {summaryData.recommendations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
