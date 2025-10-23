import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { Calendar, Clock3 } from 'lucide-react'

const DetailScheduleInfo = () => {
  return (
    <section className="flex flex-col gap-6">
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
  )
}

export default DetailScheduleInfo
