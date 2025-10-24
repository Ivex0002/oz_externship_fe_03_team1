import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

import { useModal } from '@/hooks/useModal'

const routeArr = [
  { path: '/modal/add_schedule', title: '새 스케줄 추가' },
  { path: '/modal/schedule_detail', title: '스케줄 상세' },
  { path: '/modal/date_picker', title: 'date_picker' },
  { path: '/modal/choosing_lecture', title: 'choosing_lecture' },
]

function TestModal() {
  const { openModal } = useModal()

  return (
    <>
      {routeArr.map((el) => (
        <BasicButton key={el.path} onClick={() => openModal(el.path, el.title)}>
          {el.title}
        </BasicButton>
      ))}
    </>
  )
}

export default TestModal
