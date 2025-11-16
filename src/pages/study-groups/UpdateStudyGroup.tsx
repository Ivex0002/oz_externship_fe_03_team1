import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { BasicInfoSection } from './sections/BasicInfoSection'
import { PeriodSection } from './sections/PeriodSection'
import { LectureSection } from './sections/LectureSection'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import dayjs from '@/lib/dayjs'
import { useNavigate, useParams } from 'react-router'
import { storeDatePicker } from '@/store/storeDatePicker'
import { toast } from 'react-toastify'
import { useModal } from '@/hooks/useModal'
import { useUpdateStudyGroupMutation } from '@/hooks/api/mutations/useUpdateStudyGroupMutation'
import type { StudyGroupForm, StudyGroupUpdate } from '@/types/StudyGroupTypes'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'

export const UpdateStudyGroup = () => {
  const { studyGroupId } = useParams()
  const navigate = useNavigate()
  const { openConfirm } = useModal()

  const { startDate, endDate, reset, setStartDate, setEndDate } =
    storeDatePicker()

  const { mutateAsync: updateGroup } = useUpdateStudyGroupMutation()

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

  const { data: detailData } = useQuery({
    queryKey: ['studyGroupDetail', studyGroupId],
    queryFn: () => api.v1.studies.groups(studyGroupId!).GET(),
    enabled: !!studyGroupId,
  })

  useEffect(() => {
    if (!detailData?.data) return
    const d = detailData.data

    const formattedLectures = d.lectures.map((lec: any) => ({
      uuid: lec.uuid ?? lec,
      title: lec.title ?? '',
      instructor: lec.instructor ?? '',
      thumbnail_img_url: lec.thumbnail_img_url ?? '',
      url_link: lec.url_link ?? '',
    }))

    setForm({
      name: d.name,
      introduction: d.introduction || '',
      profile_img_url: d.profile_img_url,
      start_at: d.start_at,
      end_at: d.end_at,
      max_headcount: d.max_headcount,
      status: d.status,
      lectures: formattedLectures,
    })

    setStartDate(new Date(d.start_at))
    setEndDate(new Date(d.end_at))
  }, [detailData])

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

    const payload: StudyGroupUpdate = {
      name: form.name,
      introduction: form.introduction || '',
      profile_img_url: form.profile_img_url || null,
      start_at: dayjs(startDate).format('YYYY-MM-DD'),
      end_at: dayjs(endDate).format('YYYY-MM-DD'),
      max_headcount: form.max_headcount,
      lectures: form.lectures.map((l) => l.uuid),
    }

    try {
      await updateGroup({ group_uuid: studyGroupId!, payload })
      toast.success('스터디 그룹이 수정되었습니다!')
      reset()
      navigate(`/study_group_detail/${studyGroupId}`)
    } catch (err) {
      toast.error('수정 실패')
    }
  }

  const handleBack = () => {
    openConfirm({
      message: '수정을 취소하시겠어요?',
      onConfirm: async () => {
        reset()
        navigate(`/study_group_detail/${studyGroupId}`)
      },
      confirmText: '확인',
      cancelText: '취소',
    })
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] py-10">
      <div className="mx-auto mb-8 flex h-[96px] w-[832px] items-center gap-4">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">스터디 그룹 수정</h1>
          <p className="mt-1 text-sm text-gray-500">
            스터디 그룹 정보를 수정해주세요.
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
            수정 완료
          </BasicButton>
        </div>
      </main>
    </div>
  )
}
