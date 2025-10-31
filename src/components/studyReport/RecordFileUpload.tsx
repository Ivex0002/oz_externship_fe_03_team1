interface RecordFileUploadProps {
  file: File | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RecordFileUpload({
  file,
  onFileChange,
}: RecordFileUploadProps) {
  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput?.click()
  }

  return (
    <div>
      <label className="mb-2 block font-semibold">첨부 파일</label>
      <div className="rounded-xl border-2 border-dashed border-[#E5E7EB] py-10 text-center">
        <span
          className="flex cursor-pointer flex-col items-center gap-2 text-gray-500"
          onClick={handleClick}
        >
          <img
            src="../../public/icons/Vector@2x.png"
            alt="파일 업로드"
            className="h-10 w-10"
          />
          <span>
            파일을 여기에 드래그하거나{' '}
            <span className="text-yellow-600">클릭하여 선택</span>
          </span>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
          {file && (
            <p className="mt-2 text-sm text-gray-700">
              선택된 파일: {file.name}
            </p>
          )}
        </span>
        <p className="mt-2 text-xs text-gray-400">
          모든 파일 형식 지원 (최대 10MB)
        </p>
      </div>
    </div>
  )
}
