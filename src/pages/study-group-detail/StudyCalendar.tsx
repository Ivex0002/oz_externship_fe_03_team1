<<<<<<< HEAD
import { useState, useEffect, useRef, useReducer } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { Schedule } from '@/types/Schedule'
=======
import { useState, useEffect, useRef, useReducer } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from '@/lib/dayjs';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { Schedule } from '@/types/Schedule';
import { ScheduleModal } from '@/components/modal/schedule/ScheduleModal';
import { DetailScheduleModal } from '@/components/modal/detailSchedule/DetailScheduleModal';
import { storeModalOpen } from '@/store/storeModalOpen';
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)

interface StudyCalendarProps {
  groupId: string
}

<<<<<<< HEAD
type TooltipState = {
  hoveredDay: number | null
  isVisible: boolean
}

type TooltipAction = { type: 'SHOW'; day: number } | { type: 'HIDE' }
=======
type TooltipState = { hoveredDay: number | null; isVisible: boolean };
type TooltipAction =
  | { type: 'SHOW'; day: number }
  | { type: 'HIDE' };
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)

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

<<<<<<< HEAD
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export const StudyCalendar = ({ groupId }: StudyCalendarProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    hoveredDay: null,
    isVisible: false,
  })
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
=======
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const StudyCalendar = ({ groupId }: StudyCalendarProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, { hoveredDay: null, isVisible: false });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)

  const { modalState, setModalState, clearModal } = storeModalOpen();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
<<<<<<< HEAD
        // const response = await fetch(`/api/study-groups/${groupId}/schedules`);
        // const data = await response.json();
        // setSchedules(data.results);

        // 임시 더미 데이터
=======
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
        setSchedules([
          {
            id: 1,
            title: '첫 번째 스터디',
            objective: '주간 목표 달성',
            session_date: '2025-11-15',
            start_time: '14:00',
            end_time: '16:00',
            schedule_members: [],
          },
<<<<<<< HEAD
        ])
=======
        ]);
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
      } catch (error) {
        console.error('Failed to fetch schedules:', error)
      }
<<<<<<< HEAD
    }

    fetchSchedules()
  }, [groupId])

  // groupId는 uuid 형식
  const handleAddSchedule = () => {
    return
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, 'month'))
  }
=======
    };
    fetchSchedules();
  }, [groupId]);

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  const handleAddSchedule = () => {
    setModalState({
      isModalOpen: true,
      title: '스케줄 추가',
      prevPath: '/modal/schedule_add',
    });
  };

  const handleOpenDetail = (scheduleId: number) => {
    setModalState({
      isModalOpen: true,
      title: '스케줄 상세보기',
      prevPath: `/modal/detail_schedule/${scheduleId}`,
    });
  };

  const handleCloseModal = () => {
    clearModal();
  };
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)

  const handleMouseEnter = (day: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      dispatchTooltip({ type: 'SHOW', day })
    }, 1000)
  }

  const handleMouseLeave = () => {
<<<<<<< HEAD
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    dispatchTooltip({ type: 'HIDE' })
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const generateCalendar = () => {
    const year = currentDate.year()
    const month = currentDate.month()
    const firstDayOfMonth = dayjs(new Date(year, month, 1))
    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0))
=======
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    dispatchTooltip({ type: 'HIDE' });
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const generateCalendar = () => {
    const year = currentDate.year();
    const month = currentDate.month();
    const firstDayOfMonth = dayjs(new Date(year, month, 1));
    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
    const firstDay = firstDayOfMonth.day();
    const daysInMonth = lastDayOfMonth.date();
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)

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
<<<<<<< HEAD
      while (week.length < 7) {
        week.push(null)
      }
      calendar.push(week)
    }

    return calendar
  }

  // 현재 월의 스케줄 필터링
  const currentMonthSchedules = schedules.filter((schedule) => {
    const scheduleDate = dayjs(schedule.session_date)
    return (
      scheduleDate.year() === currentDate.year() &&
      scheduleDate.month() === currentDate.month()
    )
  })

  // 날짜별 스케줄 맵핑
  const schedulesByDay = currentMonthSchedules.reduce(
    (acc, schedule) => {
      const day = dayjs(schedule.session_date).date()
      if (!acc[day]) acc[day] = []
      acc[day].push(schedule)
      return acc
    },
    {} as Record<number, Schedule[]>
  )

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
=======
      while (week.length < 7) week.push(null);
      calendar.push(week);
    }
    return calendar;
  };

  const currentMonthSchedules = schedules.filter((schedule) => {
    const scheduleDate = dayjs(schedule.session_date);
    return scheduleDate.year() === currentDate.year() && scheduleDate.month() === currentDate.month();
  });

  const schedulesByDay = currentMonthSchedules.reduce((acc, schedule) => {
    const day = dayjs(schedule.session_date).date();
    if (!acc[day]) acc[day] = [];
    acc[day].push(schedule);
    return acc;
  }, {} as Record<number, Schedule[]>);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-center justify-between mb-6">
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
        <h2 className="text-xl font-bold text-gray-900">스케줄 관리</h2>
        <BasicButton
          variant="primary"
          size="medium"
          className="!px-4 !py-2 !text-sm text-white cursor-pointer"
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
<<<<<<< HEAD

          <h3 className="min-w-[120px] text-center text-lg font-bold text-gray-900">
            {currentDate.format('YYYY년 M월')}
          </h3>

=======
          <h3 className="text-lg font-bold text-gray-900 min-w-[120px] text-center">
            {currentDate.format('YYYY년 M월')}
          </h3>
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
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

<<<<<<< HEAD
        <div className="grid min-w-[600px] grid-cols-7 rounded-b-lg border border-t-0 border-gray-200">
          {generateCalendar().map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const daySchedules = day ? schedulesByDay[day] : []

=======
        <div className="grid grid-cols-7 border border-gray-200 border-t-0 rounded-b-lg min-w-[600px]">
          {generateCalendar().map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const daySchedules = day ? schedulesByDay[day] ?? [] : [];
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className="relative aspect-[1/0.95] border-r border-b border-gray-200 last:border-r-0"
                >
                  {day ? (
<<<<<<< HEAD
                    <div className="h-full cursor-pointer bg-white p-2 transition-all hover:border-gray-300">
                      <div className="pb-2 text-xs text-gray-900">{day}</div>

                      {daySchedules &&
                        daySchedules.map((schedule) => {
                          return (
                            <div
                              key={schedule.id}
                              className="bg-primary-100 relative mb-1 rounded p-1"
                              onMouseEnter={() => handleMouseEnter(day)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <h4 className="text-primary-800 mb-1 line-clamp-1 text-[11px] leading-tight">
                                {schedule.title}
                              </h4>
                              <p className="text-primary-800/75 text-[10px] leading-tight">
                                {dayjs(schedule.start_time).format('HH시mm분')}{' '}
                                ~ {dayjs(schedule.end_time).format('HH시mm분')}
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
                          )
                        })}
=======
                    <div className="h-full bg-white hover:border-gray-300 transition-all p-2">
                      <div className="text-xs text-gray-900 pb-2">{day}</div>
                      {daySchedules?.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="relative bg-primary-100 rounded p-1 mb-1 cursor-pointer"
                          onClick={() => handleOpenDetail(schedule.id!)}
                          onMouseEnter={() => handleMouseEnter(day)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <h4 className="text-[11px] text-primary-800 leading-tight line-clamp-1 mb-1">
                            {schedule.title}
                          </h4>
                          <p className="text-[10px] text-primary-800/75 leading-tight">
                            {dayjs(schedule.start_time).format('HH시mm분')} ~{' '}
                            {dayjs(schedule.end_time).format('HH시mm분')}
                          </p>

                          {tooltipState.isVisible && tooltipState.hoveredDay === day && (
                            <div className="absolute z-50 left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-3 animate-fade-in">
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                              <div className="relative z-10 bg-white">
                                <h4 className="text-sm font-bold text-gray-900 mb-2">{schedule.title}</h4>
                                <div className="text-xs text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">시간:</span>
                                    <span>
                                      {dayjs(schedule.start_time).format('HH시mm분')} ~{' '}
                                      {dayjs(schedule.end_time).format('HH시mm분')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
                    </div>
                  ) : (
                    <div className="h-full bg-gray-50"></div>
                  )}
                </div>
<<<<<<< HEAD
              )
=======
              );
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
            })
          )}
        </div>
      </div>
<<<<<<< HEAD
    </div>
  )
}
=======

      {/* 모달 렌더링 영역 */}
      {modalState.isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="relative bg-white rounded-2xl shadow-2xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            {modalState.prevPath.includes('schedule_add') && <ScheduleModal />}
            {modalState.prevPath.includes('detail_schedule') && <DetailScheduleModal />}
          </div>
        </div>
      )}
    </div>
  );
};
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
