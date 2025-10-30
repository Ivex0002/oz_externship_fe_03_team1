import { storeLecture } from '@/store/storeLecture'
import type { Lecture } from '@/types/Lecture'
import clsx from 'clsx'
import dayjs from '@/lib/dayjs'
import { Circle, CircleCheck, Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LectureCardProps {
  lecture: Lecture
}

const MAX_LECTURE = 5

export const LectureCard = ({ lecture }: LectureCardProps) => {
  const {
    thumbnail_img_url,
    title,
    platform,
    duration,
    original_price,
    instructor,
    uuid,
  } = lecture
  const [isChecked, setIsChecked] = useState(false)
  const {
    selectedLectureList,
    addToSelectedLectureList,
    deleteFromSelectedLectureList,
  } = storeLecture()

  const formattedPrice = new Intl.NumberFormat('ko-Kr', {
    style: 'currency',
    currency: 'KRW',
  }).format(original_price)

  const formattedDuration = dayjs.duration(duration, 'minutes').format('HH:mm')

  useEffect(() => {
    selectedLectureList?.forEach(
      (lec) => uuid === lec.uuid && setIsChecked(true)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickLectureCard = () => {
    if (isChecked) {
      setIsChecked(false)
      deleteFromSelectedLectureList(lecture)
    }
    if (selectedLectureList.length === MAX_LECTURE) return
    if (!isChecked) {
      setIsChecked(true)
      addToSelectedLectureList(lecture)
    }
  }

  return (
    <div
      onClick={handleClickLectureCard}
      className={clsx(
        'flex w-full items-center justify-between rounded-lg border-2 p-4.5',
        isChecked ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
      )}
    >
      <div className="center-center gap-4">
        {thumbnail_img_url ? (
          <img
            src={thumbnail_img_url}
            alt={`${title}의 이미지`}
            className="h-16 w-24 rounded-lg"
          />
        ) : (
          <div className="h-16 w-24 rounded-lg bg-gray-200"></div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{instructor}</p>
          <p className="flex items-center gap-3">
            <span
              className={clsx(
                platform === 'INFLEARN' && 'bg-[#dcfce7] text-[#166534]',
                platform === 'UDEMY' && 'bg-[#f3e8ff] text-[#6b21a8]',
                'rounded-sm px-2 py-1 text-center text-xs font-medium'
              )}
            >
              {platform}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Clock3 size={12} /> {formattedDuration}
            </span>
            <span className="text-sm font-semibold">{formattedPrice}</span>
          </p>
        </div>
      </div>
      {isChecked ? (
        <CircleCheck size={29} fill="#eab308" className="text-white" />
      ) : (
        <Circle className="text-gray-300" />
      )}
    </div>
  )
}
