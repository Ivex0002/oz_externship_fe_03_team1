interface CustomSliderProps {
  min: number
  max: number
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  color?: string
}

export const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  color = '#007BFF',
}: CustomSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full cursor-pointer appearance-none"
      style={{
        height: '6px',
        borderRadius: '8px',
        background: `linear-gradient(to right, ${color} ${percentage}%, #E5E7EB ${percentage}%)`,
        transition: 'background 0.2s ease',
      }}
    />
  )
}
