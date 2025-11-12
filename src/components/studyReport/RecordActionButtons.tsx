import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'
import { useModal } from '@/hooks/useModal'
import { useNavigate } from 'react-router'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  studyGroupId: string
  mode?: 'create' | 'edit'
  disabled?: boolean
}

export const RecordActionButtons = ({
  onCancel,
  onSave,
  studyGroupId,
  mode = 'create',
  disabled = false,
}: RecordActionButtonsProps) => {
  const { openModal, closeModal } = useModal()
  const navigate = useNavigate()

  const handleCancel = () => {
    openModal('CONFIRM', {
      title: '정말 취소하시겠습니까?',
      modalProps: {
        message: '작성 중인 내용은 사라집니다.',
        onConfirm: () => {
          closeModal()
          onCancel()
          navigate(`/study_group_detail/${studyGroupId}`)
        },
        onCancel: () => {
          closeModal()
        },
      },
    })
  }

  return (
    <div className="flex w-full justify-between">
      <BasicButton variant="outline" size="large" onClick={handleCancel}>
        취소
      </BasicButton>

      <BasicButton
        variant="secondary"
        size="large"
        onClick={onSave}
        disabled={disabled}
        className="disabled:cursor-not-allowed"
      >
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
