import { useState, useEffect, useRef, useReducer } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { Schedule } from '@/types/Schedule'
import { useModal } from '@/hooks/useModal'
import { useQueryStudyGroupSchedule } from '@/hooks/api/queries/useQuryStudyGroupSchedule'
import { toast } from 'react-toastify'

interface StudyCalendarProps {
  groupId: string
}

type TooltipState = { hoveredDay: number | null; isVisible: boolean }
type TooltipAction = { type: 'SHOW'; day: number } | { type: 'HIDE' }

const tooltipReducer = (
  state: TooltipState,
  action: TooltipAction
): TooltipState => {
  switch (action.type) {
    case 'SHOW':
      return { hoveredDay: action.day, isVisible: true }
    case 'HIDE':
      return { hoveredDay: null, isVisible: false }
    default:
      return state
  }
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export const StudyCalendar = ({ groupId }: StudyCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    hoveredDay: null,
    isVisible: false,
  })
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { openModal } = useModal()

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const { data, error, isError, isPending } = useQueryStudyGroupSchedule({
    groupId,
  })
  const studyScheduleData = data && data.data
  if (!studyScheduleData) return null
  if (isError) toast.error(error.message)
  if (isPending) <div> 로딩중... </div>
  console.log(data?.data)

  const handlePrevMonth = () =>
    setCurrentDate((prev) => prev.subtract(1, 'month'))
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'))
  // 'DETAIL_SCHEDULE'
  const handleAddSchedule = () => {
    openModal('SCHEDULE', {
      title: '새 스케줄 추가',
      modalProps: { studyGroupId: groupId },
    })
  }

  const handleOpenDetail = (scheduleId: string) => {
    openModal('DETAIL_SCHEDULE', {
      title: '스케줄 상세',
      modalProps: { studyGroupId: groupId, scheduleId: scheduleId },
    })
  }

  const handleMouseEnter = (day: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      dispatchTooltip({ type: 'SHOW', day })
    }, 1000)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    dispatchTooltip({ type: 'HIDE' })
  }

  const generateCalendar = () => {
    const year = currentDate.year()
    const month = currentDate.month()
    const firstDayOfMonth = dayjs(new Date(year, month, 1))
    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0))

    const firstDay = firstDayOfMonth.day()
    const daysInMonth = lastDayOfMonth.date()

    const calendar: (number | null)[][] = []
    let week: (number | null)[] = Array(firstDay).fill(null)

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day)
      if (week.length === 7) {
        calendar.push(week)
        week = []
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null)
      calendar.push(week)
    }
    return calendar
  }

  const currentMonthSchedules = studyScheduleData?.filter((schedule) => {
    const scheduleDate = dayjs(schedule.session_date)
    return (
      scheduleDate.year() === currentDate.year() &&
      scheduleDate.month() === currentDate.month()
    )
  })

  const schedulesByDay = currentMonthSchedules?.reduce(
    (acc, schedule) => {
      const day = dayjs(schedule.session_date).date()
      if (!acc[day]) acc[day] = []
      acc[day].push(schedule)
      return acc
    },
    {} as Record<number, Schedule[]>
  )

  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">스케줄 관리</h2>
        <BasicButton
          variant="primary"
          size="medium"
          className="cursor-pointer !px-4 !py-2 !text-sm text-white"
          onClick={handleAddSchedule}
        >
          + 스케줄 추가
        </BasicButton>
      </div>

      <div className="mb-4 overflow-hidden">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevMonth}
            className="rounded p-1 transition-colors hover:bg-gray-100"
            aria-label="이전 달"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h3 className="min-w-[120px] text-center text-lg font-bold text-gray-900">
            {currentDate.format('YYYY년 M월')}
          </h3>
          <button
            onClick={handleNextMonth}
            className="rounded p-1 transition-colors hover:bg-gray-100"
            aria-label="다음 달"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="grid min-w-[600px] grid-cols-7 overflow-hidden rounded-t-lg border border-gray-200">
          {WEEKDAYS.map((day, idx) => (
            <div
              key={`weekday-${idx}`}
              className="flex h-11 items-center justify-center border-r border-gray-200 bg-gray-50 text-sm font-semibold text-gray-900 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid min-w-[600px] grid-cols-7 rounded-b-lg border border-t-0 border-gray-200">
          {generateCalendar().map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const daySchedules = day ? (schedulesByDay[day] ?? []) : []
              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className="relative aspect-[1/0.95] border-r border-b border-gray-200 last:border-r-0"
                >
                  {day ? (
                    <div className="h-full bg-white p-2 transition-all hover:border-gray-300">
                      <div className="pb-2 text-xs text-gray-900">{day}</div>
                      {daySchedules?.map((schedule) => (
                        <div
                          key={schedule.uuid}
                          className="bg-primary-100 relative mb-1 cursor-pointer rounded p-1"
                          onClick={() => handleOpenDetail(schedule.uuid!)}
                          onMouseEnter={() => handleMouseEnter(day)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <h4 className="text-primary-800 mb-1 line-clamp-1 text-[11px] leading-tight">
                            {schedule.title}
                          </h4>
                          <p className="text-primary-800/75 text-[10px] leading-tight">
                            {dayjs(schedule.start_time).format('HH시mm분')} ~{' '}
                            {dayjs(schedule.end_time).format('HH시mm분')}
                          </p>

                          {tooltipState.isVisible &&
                            tooltipState.hoveredDay === day && (
                              <div className="animate-fade-in absolute top-full left-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
                                <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 transform border-t border-l border-gray-200 bg-white"></div>
                                <div className="relative z-10 bg-white">
                                  <h4 className="mb-2 text-sm font-bold text-gray-900">
                                    {schedule.title}
                                  </h4>
                                  <div className="text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">
                                        시간:
                                      </span>
                                      <span>
                                        {dayjs(schedule.start_time).format(
                                          'HH시mm분'
                                        )}{' '}
                                        ~{' '}
                                        {dayjs(schedule.end_time).format(
                                          'HH시mm분'
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full bg-gray-50"></div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
