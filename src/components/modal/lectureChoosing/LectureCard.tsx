import { storeLecture } from '@/store/storeLecture'
import type { Lecture } from '@/types/Lecture'
import clsx from 'clsx'
import { Circle, CircleCheck, Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

const MAX_LECTURE = 5

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  const [isChecked, setIsChecked] = useState(false)
  const {
    selectedLectureList,
    addToSelectedLectureList,
    deleteFromSelectedLectureList,
  } = storeLecture()

  const formattedPrice = new Intl.NumberFormat('ko-Kr', {
    style: 'currency',
    currency: 'KRW',
  }).format(lecture.price)

  useEffect(() => {
    selectedLectureList?.forEach(
      (lec) => lecture.id === lec.id && setIsChecked(true)
    )
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
        {lecture.thumbnail_img_url ? (
          <img
            src={lecture.thumbnail_img_url}
            alt={`${lecture.title}의 이미지`}
            className="h-16 w-24 rounded-lg"
          />
        ) : (
          <div className="h-16 w-24 rounded-lg bg-gray-200"></div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-900">{lecture.title}</h3>
          <p className="text-sm text-gray-600">{lecture.instructor}</p>
          <p className="flex items-center gap-3">
            <span
              className={clsx(
                lecture.platform === 'inflearn' &&
                  'bg-[#dcfce7] text-[#166534]',
                'rounded-sm px-2 py-1 text-xs font-medium'
              )}
            >
              {lecture.platform}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Clock3 size={12} /> {lecture.duration}
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

export default LectureCard
