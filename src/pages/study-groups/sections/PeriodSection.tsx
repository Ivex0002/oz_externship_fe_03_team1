import { InputField } from '../../../components/basicComponents/input/BasicInput'
import type { StudyGroupForm } from '../../../types/studyGroup'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PeriodSection({ form, setForm, handleChange }: Props) {
  return (
    <section className="space-y-4 border-b border-gray-200 pb-6">
      <h2 className="text-lg font-semibold text-gray-700">
        스터디 기간 및 인원
      </h2>

      <div className="flex flex-wrap gap-4">
        <InputField
          label="스터디 시작일"
          name="startDate"
          placeholder="날짜를 선택하세요"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />
        <InputField
          label="스터디 종료일"
          name="endDate"
          placeholder="날짜를 선택하세요"
          type="date"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-700">최대 인원</label>
        <input
          type="range"
          min="2"
          max="10"
          value={form.maxMembers}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              maxMembers: Number(e.target.value),
            }))
          }
          className="w-full accent-amber-400"
        />
        <p className="mt-1 text-sm text-gray-600">
          {form.maxMembers}명 (2~10명)
        </p>
      </div>
    </section>
  )
}
