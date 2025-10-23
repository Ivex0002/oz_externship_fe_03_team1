import { useRef } from 'react'
import { X } from 'lucide-react'
import ImageUploadIcon from '/icons/image-upload-icon.svg'

interface ImageUploadBoxProps {
  onFileSelect: (file: File | null) => void
  currentFile?: File | null
}

export default function ImageUploadBox({
  onFileSelect,
  currentFile,
}: ImageUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.')
      return
    }
    onFileSelect(file)
  }

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFileSelect(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div
      className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 hover:bg-gray-50"
      onClick={() => fileInputRef.current?.click()}
    >
      {currentFile ? (
        <div className="relative inline-block">
          <img
            src={URL.createObjectURL(currentFile)}
            alt="업로드된 이미지 미리보기"
            className="mx-auto block h-[80px] w-[120px] rounded-md object-cover shadow-sm"
          />
          <button
            type="button"
            onClick={handleClearFile}
            className="absolute -top-2 -right-2 rounded-full bg-gray-100 p-1 shadow-sm hover:bg-gray-200"
          >
            <X size={14} className="text-gray-700" />
          </button>
          <p className="mx-auto mt-2 w-[120px] truncate text-xs text-gray-600">
            {currentFile.name}
          </p>
        </div>
      ) : (
        <>
          <img
            src={ImageUploadIcon}
            alt="/"
            className="mx-auto block h-[30px] w-[33px]"
          />
          <p className="mt-2 text-sm font-medium text-gray-700">
            클릭하여 이미지 업로드
          </p>
          <p className="mt-1 text-xs text-gray-400">JPG/PNG (최대 5MB)</p>
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
  )
}
