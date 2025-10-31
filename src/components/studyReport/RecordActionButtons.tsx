import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  mode: 'create' | 'edit'
}

export const RecordActionButtons = ({
  onCancel,
  onSave,
  mode,
}: RecordActionButtonsProps) => {
  return (
    <div className="flex w-full justify-between">
      <BasicButton type="outline" size="large" onClick={onCancel}>
        취소
      </BasicButton>

      <BasicButton type="secondary" size="large" onClick={onSave}>
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
