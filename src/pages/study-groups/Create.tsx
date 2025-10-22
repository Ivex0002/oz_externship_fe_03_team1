import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { StudyGroupForm } from '../../types/StudyGroupTypes'
import BasicInfoSection from './sections/BasicInfoSection'
import PeriodSection from './sections/PeriodSection'
import LectureSection from './sections/LectureSection'
import BasicModal from '../../components/basicComponents/basicModal/BasicModal'
import { studyGroupFormMock } from '../../assets/dummyData/dummyStudyGroup'

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

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (window.location.pathname.includes('edit')) {
      setIsEdit(true)
      setForm(studyGroupFormMock)
    }
  }, [])

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

    if (isEdit) {
      alert('스터디 그룹이 수정되었습니다.')
    } else {
      alert('스터디 그룹이 생성되었습니다.')
    }
  }

  const handleBack = () => window.history.back()

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] py-10">
      <div className="mx-auto mb-8 flex h-[96px] w-[832px] items-center gap-[16px]">
        <button
          onClick={handleBack}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F3F4F6] text-gray-700 transition hover:bg-[#E5E7EB]"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex flex-col justify-center pt-[2px]">
          <h1 className="text-[24px] leading-[32px] font-bold text-gray-800">
            {isEdit ? '스터디 그룹 수정' : '새 스터디 그룹 만들기'}
          </h1>
          <p className="mt-[4px] text-[14px] leading-[20px] text-gray-500">
            {isEdit
              ? '스터디 그룹 정보를 수정해주세요.'
              : '함께 공부할 멤버들과 스터디 그룹을 시작해보세요'}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[832px] space-y-6">
        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <BasicInfoSection
            form={form}
            setForm={setForm}
            handleChange={handleChange}
          />
        </section>

        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <PeriodSection form={form} setForm={setForm} />
        </section>

        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <LectureSection form={form} setForm={setForm} />
        </section>

        <div className="flex justify-end gap-3 pt-8">
          <button
            onClick={handleBack}
            className="h-[50px] min-w-[80px] rounded-lg border border-[#D1D5DB] bg-white px-[25px] py-[13px] text-[14px] font-medium text-gray-800 transition hover:bg-gray-50"
          >
            취소
          </button>

          <button
            onClick={handleSubmit}
            className="h-[48px] min-w-[190px] rounded-lg bg-[#EAB308] px-[32px] py-[12px] text-[14px] font-semibold text-white transition hover:bg-[#DFA307]"
          >
            {isEdit ? '스터디 그룹 수정하기' : '스터디 그룹 만들기'}
          </button>
        </div>
      </main>

      <BasicModal />
    </div>
  )
}
