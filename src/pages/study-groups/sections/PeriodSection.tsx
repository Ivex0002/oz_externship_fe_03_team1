import { useModal } from '../../../hooks/useModal'
import { BasicInput } from '../../../components/basicComponents/input/BasicInput'
import type { StudyGroupForm } from '../../../types/StudyGroupTypes'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PeriodSection({ form, setForm }: Props) {
  const { openModal } = useModal()

  const handleOpenDatePicker = (type: 'start' | 'end') => {
    openModal(`/modal/date-picker?target=${type}`, '날짜 선택')
  }

  return (
    <section className="space-y-4 border-b border-gray-200 pb-6">
      <h2 className="text-lg font-semibold text-gray-700">
        스터디 기간 및 인원
      </h2>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-800">
            스터디 시작일<span className="text-[#EF4444]">*</span>
          </label>
          <div
            className="cursor-pointer"
            onClick={() => handleOpenDatePicker('start')}
          >
            <BasicInput
              name="startDate"
              placeholder="날짜를 선택하세요"
              readOnly
              value={form.startDate}
              className="!h-[50px] !w-full !rounded-lg !border !border-[#D1D5DB] !bg-white !px-[17px] !py-[13px] !text-gray-700 placeholder:!text-gray-400 focus:!border-amber-400 focus:!ring-1 focus:!ring-amber-400"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-800">
            스터디 종료일 <span className="text-[#EF4444]">*</span>
          </label>
          <div
            className="cursor-pointer"
            onClick={() => handleOpenDatePicker('end')}
          >
            <BasicInput
              name="endDate"
              placeholder="날짜를 선택하세요"
              readOnly
              value={form.endDate}
              className="!h-[50px] !w-full !rounded-lg !border !border-[#D1D5DB] !bg-white !px-[17px] !py-[13px] !text-gray-700 placeholder:!text-gray-400 focus:!border-amber-400 focus:!ring-1 focus:!ring-amber-400"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          최대 인원 <span className="text-[#EF4444]">*</span>
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={form.maxMembers}
          onChange={(e) =>
            setForm((prev: StudyGroupForm) => ({
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
