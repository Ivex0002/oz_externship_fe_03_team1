import clsx from 'clsx'
import { Circle, CircleCheck } from 'lucide-react'
import { useState } from 'react'

type Lecture = {
  id: number
  title: string
  thumbnail_img_url: string
  instructor: string
  duration: string
  price: number
  platform: string
}

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-between rounded-lg border-2 p-4.5',
        { isChecked: 'border-primary-500 bg-primary-50' },
        'border-gray-200'
      )}
    >
      <div className="flex gap-4">
        <img
          src={lecture.thumbnail_img_url}
          alt={`${lecture.title}의 이미지`}
          className="h-16 w-24 rounded-lg"
        />
        <div className="flex flex-col">
          <h3>{lecture.title}</h3>
          <p>{lecture.instructor}</p>
          <p>
            <span>{lecture.platform}</span>
            <span>{lecture.duration}</span>
            <span>{lecture.price}</span>
          </p>
        </div>
      </div>
      {isChecked ? <CircleCheck /> : <Circle />}
    </div>
  )
}

export default LectureCard
