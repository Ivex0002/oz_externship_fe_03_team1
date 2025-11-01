// StudyCalendar.tsx
import { useState, useEffect, useRef, useReducer } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from '@/lib/dayjs';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';

interface Schedule {
  id: number;
  title: string;
  goal: string;
  date: string;
  startTime: string;
  endTime: string;
  created_at: string;
  participants: {
    id: number;
    nickname: string;
    is_leader: boolean;
  }[];
}

interface StudyCalendarProps {
  schedule: Schedule;
}

// 툴팁 상태 관리를 위한 reducer
type TooltipState = {
  hoveredDay: number | null;
  isVisible: boolean;
};

type TooltipAction =
  | { type: 'SHOW'; day: number }
  | { type: 'HIDE' };

const tooltipReducer = (state: TooltipState, action: TooltipAction): TooltipState => {
  switch (action.type) {
    case 'SHOW':
      return { hoveredDay: action.day, isVisible: true };
    case 'HIDE':
      return { hoveredDay: null, isVisible: false };
    default:
      return state;
  }
};

// 요일 배열
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const StudyCalendar = ({ schedule }: StudyCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs(schedule.date));
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    hoveredDay: null,
    isVisible: false
  });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 핸들러 함수 분리
  const handleAddSchedule = () => {return};

  const handlePrevMonth = () => {
    setCurrentDate(prev => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => prev.add(1, 'month'));
  };

  const handleMouseEnter = (day: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      dispatchTooltip({ type: 'SHOW', day });
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    dispatchTooltip({ type: 'HIDE' });
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // 달력 생성 로직
  const generateCalendar = () => {
    const year = currentDate.year();
    const month = currentDate.month();
    const firstDayOfMonth = dayjs(new Date(year, month, 1));
    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
    
    const firstDay = firstDayOfMonth.day();
    const daysInMonth = lastDayOfMonth.date();

    const calendar: (number | null)[][] = [];
    let week: (number | null)[] = Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    return calendar;
  };

  // 스케줄이 있는 날짜 추출 (현재는 단일 스케줄, 추후 배열로 확장 가능)
  const scheduleDay = dayjs(schedule.date).date();
  const scheduleMonth = dayjs(schedule.date).month();
  const scheduleYear = dayjs(schedule.date).year();
  
  // 현재 표시 중인 달과 스케줄 달이 같은지 확인
  const isScheduleInCurrentMonth = 
    scheduleYear === currentDate.year() && 
    scheduleMonth === currentDate.month();
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">스케줄 관리</h2>
        <BasicButton
          type="primary"
          size="medium"
          className="!px-4 !py-2 !text-sm text-white"
          onClick={handleAddSchedule}
        >
          + 스케줄 추가
        </BasicButton>
      </div>

      {/* 달력 */}
      <div className="mb-4 overflow-hidden">
        <div className="flex items-center justify-center mb-6 gap-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="이전 달"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h3 className="text-lg font-bold text-gray-900 min-w-[120px] text-center">
            {currentDate.format('YYYY년 M월')}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="다음 달"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-7 border border-gray-200 rounded-t-lg overflow-hidden min-w-[600px]">
          {WEEKDAYS.map((day, idx) => (
            <div
              key={`weekday-${idx}`}
              className="flex items-center justify-center text-sm font-semibold text-gray-900 bg-gray-50 border-r border-gray-200 last:border-r-0 h-11"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border border-gray-200 border-t-0 rounded-b-lg min-w-[600px]">
          {generateCalendar().map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const hasSchedule = isScheduleInCurrentMonth && day === scheduleDay;

              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className="relative aspect-[1/0.95] border-r border-b border-gray-200 last:border-r-0"
                >
                  {day ? (
                    <div className="h-full bg-white hover:border-gray-300 transition-all cursor-pointer p-2">
                      <div className="text-xs text-gray-900 pb-2">{day}</div>

                      {hasSchedule && (
                        <div 
                          className="relative bg-primary-100 rounded p-1"
                          onMouseEnter={() => handleMouseEnter(day)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <h4 className="text-[11px] text-primary-800 leading-tight line-clamp-1 mb-1">
                            {schedule.title}
                          </h4>
                          <p className="text-[10px] text-primary-800/75 leading-tight">
                            {schedule.startTime} - {schedule.endTime}
                          </p>

                          {/* 간소화된 툴팁 (제목, 시간만) */}
                          {tooltipState.isVisible && tooltipState.hoveredDay === day && (
                            <div className="absolute z-50 left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-3 animate-fade-in">
                              {/* 화살표 */}
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                              
                              {/* 툴팁 내용 */}
                              <div className="relative z-10 bg-white">
                                <h4 className="text-sm font-bold text-gray-900 mb-2">
                                  {schedule.title}
                                </h4>
                                <div className="text-xs text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">시간:</span>
                                    <span>{schedule.startTime} - {schedule.endTime}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full bg-gray-50"></div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};