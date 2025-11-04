import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'

function TestH() {
  const { openConfirm, closeModal } = useModal()
  return (
    <div>
      <BasicButton
        onClick={() =>
          openConfirm('리더를 위임하시겠습니까?', closeModal, {
            onCancel: closeModal,
          })
        }
      >
        확인창
      </BasicButton>
    </div>
  )
}

export default TestH
