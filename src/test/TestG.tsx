import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

// const dummyStudyGroup = {
//   name: '리액트 스터디',
//   profile_img_url: '/images/react.png',
//   max_headcount: 8,
//   start_at: '2025-11-10',
//   end_at: '2025-12-10',
//   introduction: '리액트를 처음부터 끝까지!',
//   lectures: [{ id: 1, title: 'React Hooks 마스터', instructor: '홍길동' }],
// }

const reviewParams = {
  page: 1,
  page_size: 3,
  ordering: '-updated_at',
}

// const params = { page: 1 }
const TestG = () => {
  const handleClick = async () => {
    try {
      // const res = await api.v1.lectures.GET()
      // const res = await api.v1.studies.groups(111).GET()
      // const res = await api.v1.studies.groups(222).delegate$leader.POST({
      //   target_user_id: 333,
      // })
      // const res = await api.v1.studies.groups(444).members(555).DELETE()
      // const res = await api.v1.studies.groups.POST(dummyStudyGroup)
      // const res = await api.v1.studies.groups.GET(undefined, { params })
      const res = await api.v1.studies
        .groups('57c71ffc-1a31-484f-8807-8fb985f63e7b')
        .reviews.GET(undefined, {
          params: reviewParams,
        })
      console.log(res)
    } catch (error) {
      console.error('API call failed:', error)
    }
  }
  return (
    <div className="mx-auto w-[567px] p-4">
      <BasicButton onClick={handleClick}>
        <div>api 요청</div>
      </BasicButton>
    </div>
  )
}

export default TestG
