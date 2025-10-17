import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

import { useModal } from '@/hooks/useModal'

const routeArr = [
  { path: '/modal/review_posting', title: 'review_posting' },
  { path: '/modal/review_detail', title: 'review_detail' },
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
