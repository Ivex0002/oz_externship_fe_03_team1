import type { InputStatus } from '@/types/InputStatus'
import clsx from 'clsx'
import type { ReactNode } from 'react'

// 색상 정의
// disabled일때 ph는 투명도 50%
const INPUT_COLORS = {
  default: {
    bg: 'bg-white',
    bd: 'border border-gray-300',
    ph: 'placeholder-gray-400',
  },
  focus: {
    bg: 'bg-white',
    bd: 'border-2 border-primary-500',
    ph: 'placeholder-gray-400',
  },
  error: {
    bg: 'bg-white',
    bd: 'border border-danger-100',
    ph: 'placeholder-gray-400',
    msg: 'text-danger-600',
  },
  disabled: {
    bg: 'bg-gray-50/50',
    bd: 'border border-gray-300',
    ph: 'placeholder-black/50',
  },
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus
  label?: string
  errorMessage?: string
  children?: ReactNode
  iconPosition?: 'left' | 'right'
}

// 인풋 컴포넌트
export function BasicInput({
  status = 'default',
  label,
  errorMessage,
  children,
  iconPosition = 'left',
  ...props
}: InputProps) {
  const color = INPUT_COLORS[status]

  const inputClass = clsx(
    'w-full rounded-md px-[17px] py-[13px] text-gray-900 outline-none transition',
    color.bg,
    color.bd,
    color.ph,
    {
      'cursor-not-allowed': status === 'disabled',
      'focus:border-primary-500 focus:ring-1 focus:ring-primary-300':
        status === 'focus',
    },
    {
      'pl-10': children && iconPosition === 'left',
      'pr-10': children && iconPosition === 'right',
    }
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        {children && iconPosition === 'left' && (
          <div className="input-svg left-3">{children}</div>
        )}

        <input
          {...props}
          disabled={status === 'disabled'}
          className={`${inputClass} placeholder-gray-400`}
          placeholder={props.placeholder}
        />

        {children && iconPosition === 'right' && (
          <div className="input-svg right-3">{children}</div>
        )}
      </div>

      {status === 'error' && errorMessage && (
        <span className={clsx('text-xs', INPUT_COLORS.error.msg)}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
