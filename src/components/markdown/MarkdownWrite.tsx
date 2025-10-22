import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownToolbar from './MarkdownToolbar'

interface MarkdownWriteProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

export default function MarkdownWrite({
  value,
  onChange,
  placeholder = '내용을 입력하세요. 마크다운 문법을 사용할 수 있습니다.',
}: MarkdownWriteProps) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [previewValue, setPreviewValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const handleUpdate = (newValue: string) => {
    const event = {
      target: { value: newValue, name: 'description' },
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>
    onChange(event)
  }

  return (
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

        <MarkdownToolbar textareaRef={textareaRef} onUpdate={handleUpdate} />
      </div>

      {tab === 'edit' ? (
        <textarea
          ref={textareaRef}
          name="description"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-h-[160px] w-full resize-none bg-white p-4 text-sm text-gray-700 focus:outline-none"
        />
      ) : (
        <div className="min-h-[160px] bg-white p-4 text-sm text-gray-700">
          {previewValue.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {previewValue}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-400">미리보기할 내용이 없습니다.</p>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 bg-[#F9FAFB] px-4 py-2 text-xs text-gray-600">
        마크다운 문법을 사용할 수 있습니다.{` `}
        <span className="font-medium text-gray-600">
          **굵게** · *기울임* · `코드` · [링크](URL) · ## 제목
        </span>
      </div>
    </div>
  )
}
