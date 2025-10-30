import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  mode: 'create' | 'edit' // 새로 추가
}

export default function RecordActionButtons({
  onCancel,
  onSave,
  mode,
}: RecordActionButtonsProps) {
  return (
    <div className="flex w-full justify-between">
      <BasicButton type="outline" size="medium" onClick={onCancel}>
        취소
      </BasicButton>

      <BasicButton type="primary" size="medium" onClick={onSave}>
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
