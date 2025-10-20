import { BasicButton } from '../../../components/basicComponents/BasicButton/BasicButton'
import type { StudyGroupForm } from '../../../types/StudyGroupTypes'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
}

export default function LectureSection({ form }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">강의 선택</h2>

      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        <p>아직 선택된 강의가 없습니다.</p>
        <p className="mt-1 text-xs text-gray-400">
          강의 추가하기 버튼을 눌러 선택하세요.
        </p>
      </div>

      <div className="flex justify-end">
        <BasicButton type="primary">+ 강의 추가하기</BasicButton>
      </div>
    </section>
  )
}
