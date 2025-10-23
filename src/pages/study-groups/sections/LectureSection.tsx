import { Book } from 'lucide-react'
import { BasicButton } from '../../../components/basicComponents/BasicButton/BasicButton'
import type { StudyGroupForm } from '../../../types/StudyGroupTypes'
import { useModal } from '../../../hooks/useModal'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
}

export default function LectureSection({ form }: Props) {
  const { openModal } = useModal()

  const handleOpenLectureModal = () => {
    openModal('/modal/choosing_lecture', '강의 선택')
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] leading-[28px] font-medium text-[#111827]">
            강의 선택
          </h2>
          <p className="mt-[2px] text-[14px] leading-[20px] text-[#4B5563]">
            스터디에서 함께 공부할 강의를 선택하세요 (최대 5개)
          </p>
        </div>

        <BasicButton type="primary" onClick={handleOpenLectureModal}>
          + 강의 추가하기
        </BasicButton>
      </div>

      {form.lectures.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Book
            className="mb-2 text-[#6B7280]"
            style={{ width: '27px', height: '30px' }}
          />
          <p className="text-sm text-gray-600">아직 선택된 강의가 없습니다.</p>
          <p className="mt-1 text-xs text-gray-400">
            강의 추가하기 버튼을 클릭해서 강의를 선택해보세요.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {form.lectures.map((lecture, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-800"
            >
              {lecture}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
