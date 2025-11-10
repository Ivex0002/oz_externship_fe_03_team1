export const MarkdownGuide = () => {
  return (
    <div className="border-t border-gray-200 bg-[#F9FAFB] px-4 py-2">
      <p className="text-[12px] leading-[16px] font-normal text-[#4B5563]">
        마크다운 문법을 사용할 수 있습니다.
        <span className="ml-2 inline-flex items-center gap-[8px] font-medium text-[#4B5563]">
          <span>**굵게**</span>
          <span>_기울임_</span>
          <span>`코드`</span>
          <span>[링크](URL)</span>
          <span>## 제목</span>
        </span>
      </p>
    </div>
  )
}
