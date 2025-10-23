import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { Calendar, Clock3, User } from 'lucide-react'

const DetailScheduleModal = () => {
  const { closeModal } = useModal()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <section>
          <h3 className="text-lg">{dummySchedule.title}</h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium text-gray-700">스터디 목표</h4>
            <p className="rounded-lg bg-gray-50 p-4">{dummySchedule.goal}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-gray-700">스터디 날짜</h4>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />{' '}
                {dummySchedule.date}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-gray-700">스터디 날짜</h4>
              <p className="flex items-center gap-2">
                <Clock3 size={16} className="text-gray-400" />{' '}
                {dummySchedule.startTime} ~ {dummySchedule.endTime}
              </p>
            </div>
          </div>
        </section>
        <section>
          <h4>참여자 목록 {`(${dummySchedule.participants.length}명)`}</h4>
          <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
            {dummySchedule.participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center gap-3 text-sm"
              >
                <div className="center-center bg-primary-100 h-8 w-8 rounded-full">
                  <User className="text-primary-600" size={18} />
                </div>
                {participant.nickname}
                {participant.is_leader && (
                  <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1 text-xs">
                    리더
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="flex w-full items-center justify-between gap-3 border-t border-gray-300 p-6">
        <span className="text-xs text-gray-500">
          생성일: {dummySchedule.create_at}
        </span>
        <div className="flex gap-3">
          <BasicButton type="primary" size="medium" onClick={handleClickCancel}>
            수정
          </BasicButton>
          <BasicButton type="danger" size="medium">
            삭제
          </BasicButton>
        </div>
      </footer>
    </div>
  )
}

export default DetailScheduleModal
