import type { Member } from '@/types/Schedule'

interface ScheduleMembersSelectingProps {
  selectedMembers: Member[]
  setSelectedMembers: React.Dispatch<React.SetStateAction<Member[]>>
}

export const ScheduleMembersSelecting = ({
  selectedMembers,
  setSelectedMembers,
}: ScheduleMembersSelectingProps) => {
  const members = [
    { uuid: '1', nickname: '김개발', is_leader: true },
    { uuid: '2', nickname: '박리엑트', is_leader: false },
    { uuid: '3', nickname: '이프론트', is_leader: false },
    { uuid: '4', nickname: '최자바', is_leader: false },
    { uuid: '5', nickname: '한스크립트', is_leader: false },
    { uuid: '6', nickname: '오컴포넌트', is_leader: false },
  ]

  const leader = members.find((member) => member.is_leader)
  const others = members.filter((member) => !member.is_leader)
  const isChecked = (id: string) =>
    selectedMembers.some((member) => member.uuid === id)

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      const memberToAdd = members.find((member) => member.nickname === value)
      if (memberToAdd) {
        setSelectedMembers([...selectedMembers, memberToAdd])
      }
    } else {
      setSelectedMembers(
        selectedMembers.filter((member) => member.nickname !== value)
      )
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">
        참여자 선택 <span className="text-danger-600">*</span>
      </h3>
      <div className="transparent-scrollbar flex max-h-48 flex-col gap-2 rounded-md border border-gray-300 p-4">
        {leader && (
          <div className="flex items-center gap-2">
            <label
              htmlFor={leader.nickname}
              className="relative flex items-center gap-2 text-sm"
            >
              <input
                id={leader.nickname}
                name="participants"
                type="checkbox"
                value={leader.nickname}
                checked={isChecked(leader.uuid)}
                onChange={handleMemberChange}
                className="peer checked:bg-primary-500 h-3 w-3 appearance-none rounded-xs border border-gray-600 checked:border-none focus:outline-none"
              />
              <span className="absolute top-1/2 left-1.5 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              {leader.nickname}
              <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1 text-xs">
                리더
              </span>
            </label>
          </div>
        )}
        {others.map((member) => (
          <div key={member.uuid} className="flex items-center gap-2">
            <label
              htmlFor={member.nickname}
              className="relative flex items-center gap-2 text-sm"
            >
              <input
                id={member.nickname}
                name="participants"
                type="checkbox"
                value={member.nickname}
                checked={isChecked(member.uuid)}
                onChange={handleMemberChange}
                className="peer checked:bg-primary-500 h-3 w-3 appearance-none rounded-xs border border-gray-600 checked:border-none focus:outline-none"
              />
              <span className="absolute top-1/2 left-1.5 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              {member.nickname}
            </label>
          </div>
        ))}
      </div>
      <span className="text-xs text-gray-500">
        선택된 참여자: {selectedMembers.length}명
      </span>
    </section>
  )
}
