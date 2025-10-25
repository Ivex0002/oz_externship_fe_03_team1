import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { User } from 'lucide-react'

const DetailScheduleSelectedParticipants = () => {
  const { participants } = dummySchedule

  const leader = participants.find((participant) => participant.is_leader)
  const others = participants.filter((participant) => !participant.is_leader)

  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-gray-700">
        참여자 목록 {`(${participants.length}명)`}
      </h4>
      <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
        {leader && (
          <li className="flex items-center gap-3 text-sm">
            <div className="center-center bg-primary-100 h-8 w-8 rounded-full">
              <User className="text-primary-600" size={18} />
            </div>
            {leader.nickname}
            <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1 text-xs">
              리더
            </span>
          </li>
        )}
        {others.map((participant) => (
          <li key={participant.id} className="flex items-center gap-3 text-sm">
            <div className="center-center bg-primary-100 h-8 w-8 rounded-full">
              <User className="text-primary-600" size={18} />
            </div>
            {participant.nickname}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DetailScheduleSelectedParticipants
