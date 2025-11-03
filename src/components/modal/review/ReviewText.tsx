interface ReviewTextProps {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const ReviewText = ({ inputValue, setInputValue }: ReviewTextProps) => {
  return (
    <div className="flex w-[448px] flex-col gap-3 py-6">
      <label htmlFor="review" className="text-sm font-medium">
        리뷰 내용 <span className="text-danger-600">*</span>
      </label>
      <textarea
        name="review"
        value={inputValue}
        maxLength={500}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-[128px] w-[400px] rounded-xl border border-gray-400 p-3"
        placeholder="스터디에 대한 솔직한 후기를 남겨주세요..."
      />
      <p className="text-xs font-normal text-gray-500">
        {inputValue.length} / 500
      </p>
    </div>
  )
}
