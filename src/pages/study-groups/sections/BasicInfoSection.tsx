import { useState, useRef } from 'react'
import { InputField } from '../../../components/basicComponents/input/BasicInput'
import type { StudyGroupForm } from '../../../types/StudyGroup'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Bold,
  Italic,
  Code2,
  Link as LinkIcon,
  Heading1,
  List,
} from 'lucide-react'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function BasicInfoSection({
  form,
  setForm,
  handleChange,
}: Props) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.')
      return
    }
    setForm((prev) => ({ ...prev, image: file }))
  }

  return (
    <section className="space-y-6 border-b border-gray-200 pb-6">
      <h2 className="text-lg font-semibold text-gray-700">기본 정보</h2>

      <div className="w-[766px]">
        <label className="mb-1 block text-[14px] font-medium text-gray-800">
          스터디 그룹명
          <span className="ml-1 text-[#EF4444]">*</span>
        </label>
        <InputField
          name="name"
          placeholder="스터디 그룹의 이름을 입력하세요"
          required
          value={form.name}
          onChange={handleChange}
          className="!h-[50px] !w-[766px] !rounded-lg !border !border-[#D1D5DB] !bg-white !px-[17px] !py-[13px] !text-gray-700 placeholder:!text-gray-400 focus:!border-amber-400 focus:!ring-1 focus:!ring-amber-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          스터디 그룹 소개 (선택사항)
        </label>

        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#F9FAFB] px-4 py-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTab('edit')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  tab === 'edit'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                작성
              </button>
              <button
                type="button"
                onClick={() => setTab('preview')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  tab === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                미리보기
              </button>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Bold size={18} className="cursor-pointer hover:text-amber-500" />
              <Italic
                size={18}
                className="cursor-pointer hover:text-amber-500"
              />
              <Code2
                size={18}
                className="cursor-pointer hover:text-amber-500"
              />
              <LinkIcon
                size={18}
                className="cursor-pointer hover:text-amber-500"
              />
              <Heading1
                size={18}
                className="cursor-pointer hover:text-amber-500"
              />
              <List size={18} className="cursor-pointer hover:text-amber-500" />
            </div>
          </div>

          {tab === 'edit' ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="스터디 그룹에 대한 설명을 작성하세요. 마크다운 문법을 사용할 수 있습니다."
              className="min-h-[160px] w-full resize-none bg-white p-4 text-sm text-gray-700 focus:outline-none"
            />
          ) : (
            <div className="min-h-[160px] bg-white p-4 text-sm text-gray-700">
              {form.description.trim() ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {form.description}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400">미리보기할 내용이 없습니다.</p>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 bg-[#F9FAFB] px-4 py-2 text-xs text-gray-500">
            마크다운 문법을 사용할 수 있습니다.{' '}
            <span className="text-gray-400">
              **굵게** · *기울임* · `코드` · [링크](URL) · ## 제목
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          스터디 그룹 대표 이미지 (선택사항)
        </label>
        <div
          className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          {form.image ? (
            <img
              src={URL.createObjectURL(form.image)}
              alt="대표 이미지 미리보기"
              className="mx-auto h-32 object-contain"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#9CA3AF"
                className="mx-auto h-[30px] w-[33px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-700">
                클릭하여 이미지 업로드
              </p>
              <p className="mt-1 text-xs text-gray-400">JPG, PNG (최대 5MB)</p>
            </>
          )}
          <input
            ref={fileInputRef}
            id="imageInput"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </section>
  )
}
