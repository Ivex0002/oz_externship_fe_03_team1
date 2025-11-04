import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'

function TestH() {
  const { openConfirm, closeModal } = useModal()

  const options = {
    message: '리더를 위임하시겠습니까?',
    onConfirm: closeModal,
    onCancel: closeModal,
  }

  return (
    <div>
      <BasicButton onClick={() => openConfirm(options)}>확인창</BasicButton>
    </div>
  )
}

export default TestH
