import { BasicInput } from '@/components/basicComponents/input/BasicInput'

const AddScheduleModal = () => {
  const participants = [
    { id: 1, name: '김개발', is_leader: true },
    { id: 2, name: '박리엑트', is_leader: false },
    { id: 3, name: '이프론트', is_leader: false },
    { id: 4, name: '최자바', is_leader: false },
    { id: 5, name: '한스크립트', is_leader: false },
    { id: 6, name: '오컴포넌트', is_leader: false },
  ]

  const leader = participants.find((participant) => participant.is_leader)
  const others = participants.filter((participant) => !participant.is_leader)

  return (
    <form className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스케줄명 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput placeholder="스케쥴 제목을 입력하세요" required />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스터디 목표 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput
            placeholder="이번 스터디에서 달성하고자 하는 목표를 입력하세요"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스터디 날짜 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput type="date" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              시작 시간 <span className="text-danger-600">*</span>
            </h3>
            <BasicInput type="time" required />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              종료 시간 <span className="text-danger-600">*</span>
            </h3>
            <BasicInput type="time" required />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            참여자 선택 <span className="text-danger-600">*</span>
          </h3>
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-md border border-gray-300 p-4">
            <div className="flex items-center gap-2">
              <BasicInput type="checkbox" value={leader?.name} required />
              <label
                htmlFor={leader?.name}
                className="flex items-center gap-2 text-sm"
              >
                {leader?.name}
                <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1 text-xs">
                  리더
                </span>
              </label>
            </div>
            {others.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <BasicInput type="checkbox" value={participant.name} required />
                <label
                  htmlFor={participant.name}
                  className="flex items-center gap-2 text-sm"
                >
                  {participant.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </main>
    </form>
  )
}

export default AddScheduleModal
