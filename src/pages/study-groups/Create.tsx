import { useState } from 'react'
import type { StudyGroupForm } from '../../types/StudyGroupTypes'
import BasicInfoSection from './sections/BasicInfoSection'
import PeriodSection from './sections/PeriodSection'
import LectureSection from './sections/LectureSection'
import BasicModal from '../../components/basicComponents/basicModal/BasicModal'

export default function CreateStudyGroup() {
  const [form, setForm] = useState<StudyGroupForm>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxMembers: 2,
    lectures: [],
    image: null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.startDate) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    console.log('📦 제출 데이터:', form)
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-10">
      <div className="mx-auto mb-8 max-w-[832px]">
        <h1 className="text-2xl font-bold text-gray-800">
          새 스터디 그룹 만들기
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          함께 공부할 멤버들과 스터디 그룹을 시작해보세요
        </p>
      </div>

      <main className="mx-auto max-w-[896px] space-y-10 rounded-2xl bg-white p-10 shadow-sm">
        <BasicInfoSection
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
        <PeriodSection
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
        <LectureSection form={form} setForm={setForm} />

        <div className="flex justify-end gap-4 border-t border-gray-200 pt-8">
          <button
            onClick={() => console.log('취소')}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
          >
            스터디 그룹 만들기
          </button>
        </div>
      </main>

      <BasicModal />
    </div>
  )
}
