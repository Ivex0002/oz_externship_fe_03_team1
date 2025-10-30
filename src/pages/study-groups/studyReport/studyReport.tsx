import { useState } from 'react'
import RecordBreadcrumb from '@/components/studyReport/RecordBreadcrumb'
import RecordTitleInput from '@/components/studyReport/RecordTitleInput'
import RecordMarkdownEditor from '@/components/studyReport/RecordMarkdownEditor'
import RecordFileUpload from '@/components/studyReport/RecordFileUpload'
import RecordActionButtons from '@/components/studyReport/RecordActionButtons'

type Mode = 'create' | 'edit'

interface StudyRecordFormProps {
  initialMode?: Mode
  initialTitle?: string
  initialContent?: string
  initialFile?: File | null
}

export function StudyRecordForm({
  initialMode = 'create',
  initialTitle = '',
  initialContent = '',
  initialFile = null,
}: StudyRecordFormProps) {
  const [title, setTitle] = useState<string>(initialTitle)
  const [content, setContent] = useState<string>(initialContent)
  const [file, setFile] = useState<File | null>(initialFile)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null
    setFile(selectedFile)
  }

  const handleCancel = () => {
    // TODO: 라우팅 or 입력 초기화 로직 추가
    setTitle(initialTitle)
    setContent(initialContent)
    setFile(initialFile)
  }

  const handleSave = () => {
    // TODO: 저장 로직 추가
    console.log({ title, content, file })
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 px-20 pt-[65px] pb-20">
      {/* 제목, 설명문 카드 밖으로 이동 */}
      <div className="mb-6 w-full max-w-3xl">
        <RecordBreadcrumb />
        <h1 className="mb-2 text-2xl font-bold">
          {initialMode === 'create' ? '스터디 기록 작성' : '스터디 기록 수정'}
        </h1>
        <p className="text-gray-600">학습한 내용을 자세히 기록해보세요</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <RecordTitleInput title={title} setTitle={setTitle} />
        <RecordMarkdownEditor content={content} setContent={setContent} />
        <RecordFileUpload file={file} onFileChange={handleFileChange} />
      </div>

      {/* 카드 바깥에 버튼 추가 */}
      <div className="mt-6 flex w-full max-w-3xl justify-between px-10">
        <RecordActionButtons
          onCancel={handleCancel}
          onSave={handleSave}
          mode={initialMode} // 모드 전달
        />
      </div>
    </div>
  )
}
