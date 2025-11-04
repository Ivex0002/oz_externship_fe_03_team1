import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { User } from 'lucide-react'

export const DetailScheduleSelectedParticipants = () => {
  const { schedule_members } = dummySchedule

  const leader = schedule_members.find((member) => member.is_leader)
  const others = schedule_members.filter((member) => !member.is_leader)

  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-gray-700">
        참여자 목록 {`(${schedule_members.length}명)`}
      </h4>
      <ul className="transparent-scrollbar flex max-h-48 flex-col gap-2 rounded-lg border border-gray-200 p-4">
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
        {others.map((member) => (
          <li key={member.id} className="flex items-center gap-3 text-sm">
            <div className="center-center bg-primary-100 h-8 w-8 rounded-full">
              <User className="text-primary-600" size={18} />
            </div>
            {member.nickname}
          </li>
        ))}
      </ul>
    </section>
  )
}
