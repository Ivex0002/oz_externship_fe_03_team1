import type { Participant } from '@/types/Schedule'

interface ScheduleMembersSelectingProps {
  studyGroupId: string
  selectedMembers: Participant[]
  setSelectedMembers: React.Dispatch<React.SetStateAction<Participant[]>>
}

export const ScheduleMembersSelecting = ({
  selectedMembers,
  setSelectedMembers,
}: ScheduleMembersSelectingProps) => {
  const members = [
    { id: 1, user: { uuid: '1', nickname: '김개발' }, is_leader: true },
    { id: 2, user: { uuid: '2', nickname: '박리엑트' }, is_leader: false },
    { id: 3, user: { uuid: '3', nickname: '이프론트' }, is_leader: false },
    { id: 4, user: { uuid: '4', nickname: '최자바' }, is_leader: false },
    { id: 5, user: { uuid: '5', nickname: '한스크립트' }, is_leader: false },
    { id: 6, user: { uuid: '6', nickname: '오컴포넌트' }, is_leader: false },
  ]

  const leader = members.find((member) => member.is_leader)
  const others = members.filter((member) => !member.is_leader)
  const isChecked = (id: string) =>
    selectedMembers.some((member) => member.user.uuid === id)

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      const memberToAdd = members.find((member) => member.user.uuid === value)
      if (memberToAdd) {
        setSelectedMembers([...selectedMembers, memberToAdd])
      }
    } else {
      setSelectedMembers(
        selectedMembers.filter((member) => member.user.uuid !== value)
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
              htmlFor={leader.user.uuid}
              className="relative flex items-center gap-2 text-sm"
            >
              <input
                id={leader.user.uuid}
                name="participants"
                type="checkbox"
                value={leader.user.uuid}
                checked={isChecked(leader.user.uuid)}
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
              {leader.user.nickname}
              <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1 text-xs">
                리더
              </span>
            </label>
          </div>
        )}
        {others.map((member) => (
          <div key={member.user.uuid} className="flex items-center gap-2">
            <label
              htmlFor={member.user.uuid}
              className="relative flex items-center gap-2 text-sm"
            >
              <input
                id={member.user.uuid}
                name="participants"
                type="checkbox"
                value={member.user.uuid}
                checked={isChecked(member.user.uuid)}
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
              {member.user.nickname}
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
