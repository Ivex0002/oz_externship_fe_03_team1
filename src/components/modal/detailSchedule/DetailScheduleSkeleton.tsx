export const DetailScheduleSkeleton = () => {
  return (
    <div className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        {/* 상단: 제목 + 목표 + 날짜/시간 */}
        <section className="flex flex-col gap-6">
          {/* 제목 */}
          <div className="h-6 w-40 animate-pulse rounded bg-gray-100" />

          {/* 스터디 목표 */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
            <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
          </div>

          {/* 날짜 / 시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </section>

        {/* 참여자 목록 */}
        <section className="flex h-48 flex-col gap-2">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
          <ul className="transparent-scrollbar flex max-h-48 flex-col gap-2 rounded-lg border border-gray-200 p-4">
            {/* 리더 자리 */}
            <li className="flex items-center gap-3 text-sm">
              <div className="center-center h-8 w-8 animate-pulse rounded-full bg-gray-100" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-5 w-10 animate-pulse rounded bg-gray-100" />
            </li>
            {/* 일반 참여자 자리 예시 2~3개 */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm">
                <div className="center-center h-8 w-8 animate-pulse rounded-full bg-gray-100" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 하단 푸터 영역 */}
      <footer className="flex w-full items-center justify-between gap-3 border-t border-gray-200 p-6">
        {/* 생성일 */}
        <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
        {/* 버튼 두 개 자리 */}
        <div className="flex gap-3">
          <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </footer>
    </div>
  )
}
