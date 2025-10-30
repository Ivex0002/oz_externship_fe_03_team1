import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { User } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import { useState } from 'react'

interface StudyRecordHeaderProps {
  title: string
  author: {
    nickname: string
    profile_image_url?: string
  }
  created_at: string
}

export const StudyRecordHeader = ({
  title,
  author,
  created_at,
}: StudyRecordHeaderProps) => {
  const [isImageError, setIsImageError] = useState(false)

  return (
    <>
      <div className="mb-4 flex items-start justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <div className="flex gap-2">
          <BasicButton
            type="secondary"
            size="small"
            className="!h-[32px] !rounded-lg !bg-[#F3F4F6] !px-3 !py-[6px] !text-[14px] !font-medium !text-[#374151]"
            onClick={() => alert('수정하기')}
          >
            수정하기
          </BasicButton>

          <BasicButton
            type="danger"
            size="small"
            className="!h-[32px] !rounded-lg !bg-[#FEE2E2] !px-3 !py-[6px] !text-[14px] !font-medium !text-[#B91C1C] hover:!bg-[#FEE2E2] active:!bg-[#FEE2E2]"
            onClick={() => alert('삭제하기')}
          >
            삭제하기
          </BasicButton>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        {!isImageError && author.profile_image_url ? (
          <img
            src={author.profile_image_url}
            alt={author.nickname}
            className="h-9 w-9 rounded-full object-cover"
            onError={() => setIsImageError(true)}
          />
        ) : (
          <div className="bg-primary-100 flex h-9 w-9 items-center justify-center rounded-full">
            <User className="text-primary-600" size={20} />
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">{author.nickname}</span>
          <span className="text-gray-400">·</span>
          <span>
            작성일: {dayjs(created_at).format('YYYY. MM. DD. A hh:mm')}
          </span>
        </div>
      </div>
    </>
  )
}
