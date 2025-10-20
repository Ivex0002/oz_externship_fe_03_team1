import { InputField } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'

const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  return (
    <div className="w-[896px]">
      <main>
        <div className="border-b border-gray-200 p-6">
          <InputField
            placeholder="강의명이나 강사명으로 검색"
            value={searchInputValue}
            onChange={handleChangeInputValue}
          />
        </div>
        <div>{}</div>
      </main>
    </div>
  )
}

export default LectureChoosingModal
