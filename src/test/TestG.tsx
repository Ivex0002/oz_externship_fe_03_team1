import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { Mail, Search } from 'lucide-react'

export default function TestG() {
  return (
    // 부모 요소에서 크기 조정
    <div className="mx-auto w-[567px] p-4">
      <BasicInput status="default" label="default" placeholder="placeholder" />
      <BasicInput
        status="focus"
        label="focus"
        placeholder="example@email.com"
      />
      <BasicInput status="error" label="error" placeholder="placeholder" />
      <BasicInput
        status="disabled"
        label="disabled"
        placeholder="placeholder"
      />
      <BasicInput
        status="default"
        label="search"
        placeholder="검색어를 입력하세요"
      >
        {/* svg 삽입 */}
        {/* 크기는 20정도가 적당(svg마다 다를 수 있음) */}
        <Search size={20} />
      </BasicInput>
      <BasicInput
        status="default"
        label="email"
        placeholder="이메일을 입력하세요"
      >
        <Mail size={20} />
      </BasicInput>
    </div>
  )
}
