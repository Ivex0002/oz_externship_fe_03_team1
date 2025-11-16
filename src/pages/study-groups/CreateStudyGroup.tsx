import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { BasicInfoSection } from './sections/BasicInfoSection'
import { PeriodSection } from './sections/PeriodSection'
import { LectureSection } from './sections/LectureSection'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import dayjs from '@/lib/dayjs'
import { useNavigate } from 'react-router'
import { storeDatePicker } from '@/store/storeDatePicker'
import { toast } from 'react-toastify'
import { useModal } from '@/hooks/useModal'
import { useCreateStudyGroupMutation } from '@/hooks/api/mutations/useCreateStudyGroupMutation'
import type { StudyGroupForm, StudyGroupPost } from '@/types/StudyGroupTypes'

export const CreateStudyGroup = () => {
  const [form, setForm] = useState<StudyGroupForm>({
    name: '',
    introduction: '',
    profile_img_url: '',
    start_at: '',
    end_at: '',
    max_headcount: 5,
    status: 'PENDING',
    lectures: [],
  })

  const { startDate, endDate, reset } = storeDatePicker()
  const navigate = useNavigate()
  const { openConfirm } = useModal()
  const { mutateAsync: createStudyGroup } = useCreateStudyGroupMutation()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !startDate || !endDate) {
      toast.warn('필수 항목을 모두 입력해주세요.')
      return
    }

    const payload: StudyGroupPost = {
      name: form.name,
      introduction: form.introduction || '',
      profile_img_url: form.profile_img_url || null,
      start_at: dayjs(startDate).format('YYYY-MM-DD'),
      end_at: dayjs(endDate).format('YYYY-MM-DD'),
      max_headcount: form.max_headcount,
      lectures: [...form.lectures.map((le) => le.uuid)],
    }

    try {
      const res = await createStudyGroup(payload)
      if (!res.data) {
        toast.error('스터디 그룹 생성 실패')
        return
      }
      toast.success('스터디 그룹이 생성되었습니다!')
      navigate(`/study_group_detail/${res.data.uuid}`)
      reset()
    } catch (err) {
      console.error(err)
      toast.error('스터디 그룹 생성 실패')
    }
  }

  const handleBack = () => {
    openConfirm({
      message: '정말 취소하시겠어요?',
      onConfirm: async () => {
        reset()
        navigate('/')
      },
      confirmText: '확인',
      cancelText: '취소',
    })
  }

  return (
    <div className="relative min-h-screen w-screen bg-[#FAFAFA] py-10">
      <div className="mx-auto mb-8 flex h-[96px] w-[832px] items-center gap-4">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            새 스터디 그룹 만들기
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            함께 공부할 멤버들과 스터디 그룹을 시작해보세요.
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
          <LectureSection />
        </section>

        <div className="flex justify-end gap-3 pt-8">
          <BasicButton variant="outline" onClick={handleBack}>
            취소
          </BasicButton>
          <BasicButton variant="primary" onClick={handleSubmit}>
            스터디 그룹 만들기
          </BasicButton>
        </div>
      </main>
    </div>
  )
}
