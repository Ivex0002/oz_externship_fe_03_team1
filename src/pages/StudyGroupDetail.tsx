import { useState } from 'react';
import { Users } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';

const StudyGroupDetail = () => {
  const [isLeader, setIsLeader] = useState(false);
  const [_hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // 샘플 데이터
  const studyInfo = {
    title: 'React 실무 프로젝트 스터디',
    category: 'IT 개발',
    level: '중급',
    currentMembers: 8,
    maxMembers: 10,
    startDate: '2024. 2. 1.',
    endDate: '2024. 6. 30.',
    status: '진행중',
    members: [
      { name: '김철수', role: 'leader' },
      { name: '이영희', role: 'member' },
      { name: '박민수', role: 'member' },
      { name: '최지은', role: 'member' },
      { name: '정우성', role: 'member' },
      { name: '한소희', role: 'member' },
      { name: '윤다빈', role: 'member' },
      { name: '조수아', role: 'member' },
    ],
  };

  const scheduleEvents = [
    { date: 13, title: '1주차 과제 제출', time: '09:00 ~ 18:00', color: 'bg-primary-100' },
    { date: 16, title: 'React Hooks 발표', time: '14:00 ~ 16:00', color: 'bg-primary-100' },
    { date: 20, title: 'React Router 실습', time: '19:00 ~ 21:00', color: 'bg-primary-100' },
    { date: 22, title: 'TypeScript 기초', time: '15:00 ~ 17:00', color: 'bg-primary-100' },
    { date: 23, title: '2주차 과제 제출', time: '09:00 ~ 18:00', color: 'bg-primary-100' },
    { date: 27, title: '팀 구성 회의', time: '20:00 ~ 22:00', color: 'bg-primary-100' },
    { date: 29, title: 'Next.js 실무', time: '14:00 ~ 16:00', color: 'bg-primary-100' },
  ];

  const posts = [
    { title: 'React Hooks 발표 모임', author: '김철수', date: '2024. 02. 14.', time: '오후 09:45', attachments: 2 },
    { title: 'TypeScript 타입 시스템 학습', author: '박민수', date: '2024. 02. 08.', time: '오후 06:30', attachments: 3 },
    { title: 'Next.js 13 App Router 소개', author: '이영희', date: '2024. 01. 21.', time: '오후 02:20', attachments: 1 },
  ];

  const upcomingStudies = [
    { title: 'React 공식 문서 스터디', instructor: '박민수' },
    { title: 'Next.js 실무 가이드', instructor: '이영희' },
  ];

  // 달력 생성
  const generateCalendar = () => {
    const daysInMonth = 29;
    const startDay = 4;
    const weeks = [];
    let currentWeek = new Array(7).fill(null);

    for (let i = 0; i < startDay; i++) currentWeek[i] = null;

    for (let day = 1; day <= daysInMonth; day++) {
      const dayIndex = (startDay + day - 1) % 7;
      currentWeek[dayIndex] = day;

      if (dayIndex === 6 || day === daysInMonth) {
        weeks.push([...currentWeek]);
        currentWeek = new Array(7).fill(null);
      }
    }

    return weeks;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[60.5px] max-w-7xl mx-auto px-6">

        {/* 스터디 배너 섹션 */}
        <div className="relative mb-6 rounded-lg overflow-hidden mt-[36.5px] ">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop"
            alt="Study Banner"
            className="w-full h-[598px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{studyInfo.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-100 mb-2">
              <Users className="w-4 h-4" />
              <span>{studyInfo.category}</span>
              <img src="/calendar.svg" alt="calendar" className="w-4 h-4 filter invert brightness-0" />
              <span>2025.10.25 ~ 2025.12.31</span>
              <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">진행중</span>
            </div>
          </div>

          {/* 리더 / 일반 버튼 */}
          <div className="absolute top-[25px] right-[24px] flex gap-2">
            {isLeader && (
              <BasicButton
                type="secondary"
                size="small"
                className="flex items-center gap-2 !px-4 !py-2 !text-sm"
              >
                <img src="/pen.svg" alt="edit" className="w-4 h-4" />
                수정하기
              </BasicButton>
            )}
            <BasicButton
              type="danger"
              size="small"
              className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
            >
              <img src="/out.svg" alt="leave" className="w-4 h-4 filter invert brightness-0" />
              나가기
            </BasicButton>
          </div>
        </div>

        {/* 역할 토글 */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isLeader}
              onChange={(e) => setIsLeader(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-blue-900 font-medium">리더 권한 보기 (테스트용)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 왼쪽: 스케줄 관리 + 스터디 기록 */}
          <div className="lg:col-span-2 space-y-6">

            {/* 스케줄 관리 */}
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
                  <h3 className="text-lg font-bold text-gray-900">2024년 2월</h3>
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
                      const scheduleEvent = day
                        ? scheduleEvents.find((event) => event.date === day)
                        : null;

                      return (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className="relative aspect-[1/0.95] border-r border-b border-gray-200 last:border-r-0"
                        >
                          {day ? (
                            <div className="h-full bg-white hover:border-gray-300 transition-all cursor-pointer p-2">
                              <div className="text-xs font-bold text-gray-900 pb-2">{day}</div>

                              {scheduleEvent && (
                                <div className={`${scheduleEvent.color} rounded p-1`}>
                                  <h4 className="text-[11px] text-primary-800 leading-tight line-clamp-1 mb-1">
                                    {scheduleEvent.title}
                                  </h4>
                                  <p className="text-[10px] text-primary-800/75 leading-tight">
                                    {scheduleEvent.time}
                                  </p>
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

            {/* 스터디 기록 */}
            <div className="rounded-xl border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">스터디 기록</h2>
                <BasicButton
                  type="primary"
                  size="small"
                  className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
                >
                  <img src="/pen.svg" alt="write" className="w-4 h-4 filter invert brightness-0" />
                  작성하기
                </BasicButton>
              </div>

              <div className="space-y-3">
                {posts.map((post, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/40 cursor-pointer transition-all group">
                    <div className="p-4 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-700">{post.title}</h3>
                      <span className="text-xs text-gray-500 font-medium">{post.date} {post.time}</span>
                    </div>
                    <div className="px-4 pb-4 flex items-center gap-3">
                      <img src="/member.svg" alt={post.author} className="w-11 h-11 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-700 font-bold">{post.author}</p>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                          <img src="/klip.svg" alt="attachment" className="w-4 h-4 opacity-80" />
                          첨부파일 {post.attachments}개
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 스터디 정보 + 강의 + 멤버 */}
          <div className="space-y-6 hidden lg:block">

            {/* 스터디 정보 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 정보</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">인원</span>
                  <span className="text-gray-900">{studyInfo.currentMembers} / {studyInfo.maxMembers}명</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">시작일</span>
                  <span className="text-gray-900">{studyInfo.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">종료일</span>
                  <span className="text-gray-900">{studyInfo.endDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">상태</span>
                  <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
                    {studyInfo.status}
                  </span>
                </div>
              </div>
            </div>

            {/* 스터디 강의 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 강의</h2>

              <div className="space-y-6">
                {upcomingStudies.map((study, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
                  >
                    {/* 강의 이미지 */}
                    <div className="relative w-full">
                      <img
                        src="/React.svg"
                        alt={study.title}
                        className="w-full object-cover"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>

                    {/* 강의 정보 */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{study.instructor}</p>

                      <button className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm flex items-center gap-1 group">
                        강의 바로가기
                        <img
                          src="/move.svg"
                          alt="move"
                          className="w-4 h-4 group-hover:opacity-70"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 멤버 목록 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
                <span className="text-sm text-gray-500 font-medium">{studyInfo.members.length}명</span>
              </div>
              <div className="space-y-3">
                {studyInfo.members.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="group relative flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src="/member.svg" 
                        alt={member.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">{member.name}</span>
                          {member.role === 'leader' && (
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-bold">
                              리더
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 font-medium">활동 중</p>
                      </div>
                    </div>
                    
                    {isLeader && member.role !== 'leader' && (
                      <div
                        className="relative opacity-0 group-hover:opacity-100 transition-opacity" 
                        onMouseEnter={() => {
                            setHoveredMember(member.name);
                            const timer = setTimeout(() => {
                                setShowTooltip(member.name);
                            }, 1000); 
                            return () => clearTimeout(timer);
                        }}
                        onMouseLeave={() => {
                            setHoveredMember(null);
                            setShowTooltip(null);
                        }}
                      >
                        <BasicButton
                          type="danger"
                          size="small"
                          className="!w-6 !h-6 !rounded-full !bg-danger-100 !text-danger-500"
                          onClick={() => {
                            if (window.confirm(`${member.name}님을 추방하시겠습니까?`)) {
                              return
                            }
                          }}
                        >
                          X
                        </BasicButton>
                        {showTooltip === member.name && (
                            <div className="absolute left-6/2 top-full mt-2 -translate-x-1/2 px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg whitespace-nowrap z-10">
                                {member.name}님을 추방
                            </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupDetail;
