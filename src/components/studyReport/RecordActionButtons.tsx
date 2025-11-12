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
}: RecordActionButtonsProps) => {
  const { openConfirm, closeModal } = useModal()
  const navigate = useNavigate()

  const handleCancel = () => {
    openConfirm({
      message: '정말 취소하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
      onConfirm: () => {
        closeModal()
        onCancel()
        navigate(`/study_group_detail/${studyGroupId}`)
      },
      onCancel: () => {
        closeModal()
      },
    })
  }

  return (
    <div className="flex w-full justify-between">
      <BasicButton variant="outline" size="large" onClick={handleCancel}>
        취소
      </BasicButton>

      {/* 항상 클릭 가능하도록 disabled 제거 */}
      <BasicButton
        variant="secondary"
        size="large"
        onClick={onSave}
        className="cursor-pointer"
      >
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
