import clsx from 'clsx'

// 색상 정의
// disabled일때 ph는 투명도 50%
const INPUT_COLORS = {
  default: {
    bg: 'bg-gray-50',
    bd: 'border-gray-300',
    ph: 'placeholder-gray-400',
  },
  focus: {
    bg: 'bg-gray-50',
    bd: 'border-primary-400',
    ph: 'placeholder-gray-400',
  },
  error: {
    bg: 'bg-gray-50',
    bd: 'border-danger-400',
    ph: 'placeholder-gray-400',
    msg: 'text-danger-600',
  },
  disabled: {
    bg: 'bg-gray-100',
    bd: 'border-gray-300',
    ph: 'placeholder-gray-400/50',
  },
}

// 타입 정의
type InputStatus = 'default' | 'focus' | 'error' | 'disabled'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus
  label?: string
  errorMessage?: string
}

// 인풋 컴포넌트
export function InputField({
  status = 'default',
  label,
  errorMessage,
  ...props
}: InputProps) {
  const color = INPUT_COLORS[status]

  const inputClass = clsx(
    'w-full rounded-md px-3 py-2 text-gray-900 outline-none transition',
    color.bg,
    color.bd,
    color.ph,
    {
      'cursor-not-allowed text-gray-400': status === 'disabled',
      'focus:border-primary-500 focus:ring-1 focus:ring-primary-300':
        status === 'focus',
    }
  )

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-700">{label}</label>}

      <input
        {...props}
        disabled={status === 'disabled'}
        className={inputClass}
      />

      {status === 'error' && errorMessage && (
        <span className={clsx('text-xs', INPUT_COLORS.error.msg)}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
