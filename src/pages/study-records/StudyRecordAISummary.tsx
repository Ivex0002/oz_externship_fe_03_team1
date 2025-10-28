import { dummyStudyRecordAISummary } from '@/assets/dummyData/dummyStudyRecordAISummary'

export default function StudyRecordAISummary() {
  const { data } = dummyStudyRecordAISummary

  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-gray-800">
      <h2 className="mb-2 font-semibold">📘 {data.title}</h2>
      <p className="mb-3 leading-relaxed">{data.summary}</p>

      <div className="mb-3">
        <h3 className="mb-1 text-sm font-medium text-gray-700">핵심 키워드</h3>
        <ul className="list-inside list-disc text-sm text-gray-600">
          {data.keywords.map((kw) => (
            <li key={kw}>{kw}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-700">
          추천 학습 주제
        </h3>
        <ul className="list-inside list-disc text-sm text-gray-600">
          {data.recommendations.map((rec) => (
            <li key={rec}>{rec}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        생성 일시: {new Date(data.generated_at).toLocaleString()}
      </p>
    </div>
  )
}
