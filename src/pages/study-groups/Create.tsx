import { useState } from 'react'

export default function CreateStudyGroup() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxMembers: 2,
  })

  const handleSubmit = () => {
    if (!form.name || !form.startDate) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    console.log('스터디 생성 요청 데이터:', form)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl space-y-8 p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          새 스터디 그룹 만들기
        </h1>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">기본 정보</h2>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="스터디 이름"
            className="mb-4 w-full rounded-lg border p-2"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="스터디 소개 (선택)"
            className="h-24 w-full rounded-lg border p-2"
          />
        </section>
      </main>
    </div>
  )
}
