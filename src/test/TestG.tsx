import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

export default function TestG() {
  const handleClick = async () => {
    const res = await api.v1.lectures.GET()
    console.log(res)
  }
  return (
    <div className="mx-auto w-[567px] p-4">
      <BasicButton onClick={handleClick}>
        <div>api 요청</div>
      </BasicButton>
    </div>
  )
}
