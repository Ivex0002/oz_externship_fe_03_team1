import { Book } from 'lucide-react'
import { BasicButton } from '../../../components/basicComponents/BasicButton/BasicButton'
// import type { StudyGroupForm } from '../../../types/StudyGroupTypes'
import { useModal } from '../../../hooks/useModal'
import { storeLecture } from '@/store/storeLecture'
import type { Lecture } from '@/types/Lecture'
import clsx from 'clsx'

// interface Props {
//   form: StudyGroupForm
//   setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
// }

export const LectureSection = () => {
  const { openModal } = useModal()
  const { previousLectureList } = storeLecture()

  const handleOpenLectureModal = () => {
    openModal('/modal/choosing_lecture', '강의 선택')
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] leading-[28px] font-medium text-[#111827]">
            강의 선택
          </h2>
          <p className="mt-[2px] text-[14px] leading-[20px] text-[#4B5563]">
            스터디에서 함께 공부할 강의를 선택하세요 (최대 5개)
          </p>
        </div>

        <BasicButton type="primary" onClick={handleOpenLectureModal}>
          + 강의 추가하기
        </BasicButton>
      </div>

      {previousLectureList.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {previousLectureList.map((lecture) => (
            <li
              key={lecture.uuid}
              className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-800"
            >
              <LectureCard lecture={lecture} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Book
            className="mb-2 text-[#6B7280]"
            style={{ width: '27px', height: '30px' }}
          />
          <p className="text-sm text-gray-600">아직 선택된 강의가 없습니다.</p>
          <p className="mt-1 text-xs text-gray-400">
            강의 추가하기 버튼을 클릭해서 강의를 선택해보세요.
          </p>
        </div>
      )}
    </section>
  )
}

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  const { thumbnail_img_url, title, platform, instructor } = lecture
  return (
    <div className="flex w-full items-center gap-2 p-2">
      {thumbnail_img_url ? (
        <img
          src={thumbnail_img_url}
          alt={`${title}의 이미지`}
          className="h-16 w-24 rounded-lg"
        />
      ) : (
        <div className="h-16 w-24 rounded-lg bg-gray-200"></div>
      )}
      <div className="flex w-full justify-between gap-2 p-2 font-medium text-gray-800">
        <p>
          {title} <span className="text-gray-500">{`(${instructor})`}</span>
        </p>
        <span
          className={clsx(
            platform === 'inflearn' && 'bg-[#dcfce7] text-[#166534]',
            'rounded-sm px-2 py-1 text-center text-xs font-medium'
          )}
        >
          {platform}
        </span>
      </div>
    </div>
  )
}
