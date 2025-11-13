import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import ImageUploadIcon from '/icons/image-upload-icon.svg'

interface ImageUploadBoxProps {
  onFileSelect: (fileUrl: string | null) => void
  currentFileUrl?: string | null
}

export const ImageUploadBox = ({
  onFileSelect,
  currentFileUrl,
}: ImageUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.warn('JPG 또는 PNG 형식의 이미지만 업로드할 수 있습니다.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.warn('5MB 이하의 이미지만 업로드 가능합니다.')
      return
    }

    setUploading(true)
    const toastId = toast.loading('이미지 업로드 중...')

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/studies/group/presigned-url/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            files: [
              {
                file_name: file.name,
                content_type: file.type,
              },
            ],
          }),
        }
      )

      if (!res.ok) throw new Error('Presigned URL 요청 실패')
      const data = await res.json()
      const presignedData = data.data[0]

      const formData = new FormData()
      Object.entries(presignedData.fields).forEach(([key, value]) =>
        formData.append(key, value as string)
      )
      formData.append('file', file)

      const uploadRes = await fetch(presignedData.url, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) throw new Error('S3 업로드 실패')

      const fileUrl = presignedData.file_url
      onFileSelect(fileUrl)
      toast.update(toastId, {
        render: '이미지 업로드 완료!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    } catch (error) {
      console.error(error)
      toast.update(toastId, {
        render: '이미지 업로드 중 오류가 발생했습니다.',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFileSelect(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    toast.info('이미지가 삭제되었습니다.')
  }

  return (
    <div
      className={`cursor-pointer rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 hover:bg-gray-50 ${
        uploading ? 'pointer-events-none opacity-60' : ''
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      {currentFileUrl ? (
        <div className="relative inline-block">
          <img
            src={currentFileUrl}
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
        </div>
      ) : (
        <>
          <img
            src={ImageUploadIcon}
            alt="/"
            className="mx-auto block h-[30px] w-[33px]"
          />
          <p className="mt-2 text-sm font-medium text-gray-700">
            {uploading ? '업로드 중...' : '클릭하여 이미지 업로드'}
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
