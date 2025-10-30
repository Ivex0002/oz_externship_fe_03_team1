import React, { useState, useEffect, useRef } from 'react';

// BasicButton props 타입 정의
interface BasicButtonProps {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

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
  BasicButton: React.ComponentType<BasicButtonProps>;
}

export const StudyCalendar: React.FC<StudyCalendarProps> = ({ 
  schedule, 
  BasicButton 
}) => {
  const [hoveredSchedule, setHoveredSchedule] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 호버 시작
  const handleMouseEnter = (day: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSchedule(day);
      setShowTooltip(true);
    }, 1000); // 1초 후 툴팁 표시
  };

  // 호버 종료
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredSchedule(null);
    setShowTooltip(false);
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
    const scheduleDate = new Date(schedule.date);
    const year = scheduleDate.getFullYear();
    const month = scheduleDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

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

  // 스케줄이 있는 날짜 추출
  const scheduleDay = new Date(schedule.date).getDate();
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">스케줄 관리</h2>
        <BasicButton
          type="primary"
          size="medium"
          className="!px-4 !py-2 !text-sm text-white"
        >
          + 스케줄 추가
        </BasicButton>
      </div>

      {/* 달력 */}
      <div className="mb-4 overflow-hidden">
        <div className="flex items-center justify-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {new Date(schedule.date).getFullYear()}년 {new Date(schedule.date).getMonth() + 1}월
          </h3>
        </div>

        <div className="grid grid-cols-7 border border-gray-200 rounded-t-lg overflow-hidden min-w-[600px]">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
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
              const hasSchedule = day === scheduleDay;

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

                          {/* 툴팁 */}
                          {showTooltip && hoveredSchedule === day && (
                            <div className="absolute z-50 left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 animate-fade-in">
                              {/* 화살표 */}
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                              
                              {/* 툴팁 내용 */}
                              <div className="relative z-10 bg-white">
                                <h4 className="text-sm font-bold text-gray-900 mb-2">
                                  {schedule.title}
                                </h4>
                                <div className="space-y-2 text-xs text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">시간:</span>
                                    <span>{schedule.startTime} - {schedule.endTime}</span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="font-semibold">목표:</span>
                                    <span className="flex-1">{schedule.goal}</span>
                                  </div>
                                  <div>
                                    <span className="font-semibold">참여자:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {schedule.participants.map((participant) => (
                                        <span
                                          key={participant.id}
                                          className={`px-2 py-0.5 rounded-full text-[10px] ${
                                            participant.is_leader
                                              ? 'bg-primary-100 text-primary-800'
                                              : 'bg-gray-100 text-gray-700'
                                          }`}
                                        >
                                          {participant.nickname}
                                          {participant.is_leader && ' leader'}
                                        </span>
                                      ))}
                                    </div>
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