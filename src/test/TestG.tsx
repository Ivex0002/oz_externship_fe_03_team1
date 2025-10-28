import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

export default function TestG() {
  const hadleClick = () => {
    api.v1.lectures.GET()
  }
  return (
    <div className="mx-auto w-[567px] p-4">
      <BasicButton onClick={hadleClick}>
        <div>api 요청</div>
      </BasicButton>
    </div>
  )
}
