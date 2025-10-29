// import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

export default function TestG() {
  const handleClick = async () => {
    // try {
    //   const res = await api.v1.lectures.GET()
    //   console.log(res)
    // } catch (error) {
    //   console.error('API call failed:', error)
    // }
  }
  return (
    <div className="mx-auto w-[567px] p-4">
      <BasicButton onClick={handleClick}>
        <div>api 요청</div>
      </BasicButton>
    </div>
  )
}
