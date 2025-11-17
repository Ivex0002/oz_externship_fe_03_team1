import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import ImageUploadIcon from '/icons/image-upload-icon.svg'
import { usePresignedUrlMutations } from '@/hooks/api/mutations/usePresignedUrlMutations'
import { storeAccessToken } from '@/store/storeAccessToken'

interface ImageUploadBoxProps {
  onFileSelect: (url: string | null) => void
  currentFileUrl: string | null
}

export const ImageUploadBox = ({
  onFileSelect,
  currentFileUrl,
}: ImageUploadBoxProps) => {
  const { setAccessToken } = storeAccessToken()
  const dummyAccessToken = import.meta.env.VITE_DUMMY_TOKEN

  useEffect(() => {
    if (dummyAccessToken) {
      setAccessToken(dummyAccessToken)
    }
  }, [dummyAccessToken, setAccessToken])

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const { presignedUrl } = usePresignedUrlMutations()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.warn('JPG 또는 PNG 형식만 업로드 가능합니다.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.warn('5MB 이하 이미지만 업로드 가능합니다.')
      return
    }

    setUploading(true)
    const toastId = toast.loading('이미지 업로드 중...')

    try {
      const res = await presignedUrl.mutateAsync({
        files: [
          {
            file_name: file.name,
            content_type: file.type,
            file_size: file.size,
          },
        ],
      })

      const presigned = res?.data?.data
      if (!presigned) throw new Error('Presigned URL 생성 실패')

      const formData = new FormData()
      Object.entries(presigned.fields).forEach(([key, val]) => {
        formData.append(key, val)
      })
      formData.append('file', file)

      const uploadRes = await fetch(presigned.url, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) throw new Error('S3 업로드 실패')

      onFileSelect(presigned.file_url)

      toast.update(toastId, {
        render: '이미지 업로드 완료!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      })
    } catch (error) {
      toast.error('이미지 업로드 실패')
    } finally {
      setUploading(false)
    }
  }

  const clearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFileSelect(null)
  }

  return (
    <div
      className={`cursor-pointer rounded-lg border border-dashed border-gray-300 p-6 text-center ${
        uploading ? 'pointer-events-none opacity-50' : ''
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      {currentFileUrl ? (
        <div className="relative inline-block">
          <img
            src={currentFileUrl}
            className="h-[80px] w-[120px] rounded-md object-cover shadow"
          />
          <button
            className="absolute -top-2 -right-2 rounded-full bg-white p-1 shadow"
            onClick={clearImage}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <img src={ImageUploadIcon} className="mx-auto h-[30px]" />
          <p className="mt-2 text-gray-700">
            {uploading ? '업로드 중...' : '클릭하여 이미지 업로드'}
          </p>
          <p className="mt-1 text-xs text-gray-400">JPG/PNG (최대 5MB)</p>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
