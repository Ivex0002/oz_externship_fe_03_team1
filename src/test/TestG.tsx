import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { toast } from 'react-toastify'

// const serverDummyGroupUUid = '57c71ffc-1a31-484f-8807-8fb985f63e7b'

// const reviewParams = {
//   page: 1,
//   page_size: 3,
//   ordering: '-updated_at',
// }

// const params = {
//   page: 1,
//   page_size: 20,
//   groupId: '',
// }

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

      // const res = await api.v1.studies
      //   .groups('57c71ffc-1a31-484f-8807-8fb985f63e7b')
      //   .reviews.GET(undefined, {
      //     params: reviewParams,
      //   })

      // const res = await api.v1.studies
      //   .groups(serverDummyGroupUUid)
      //   .reviews.GET()

      // api.v1.studies.groups(params.groupId).reviews.GET(undefined, {
      //   params: {
      //     page: params.page,
      //     page_size: params.page_size,
      //     ordering: params.ordering,
      //   },
      // })

      // const res = await api.v1.chat.chatrooms.GET()

      const res = await api.v1.notifications.GET()
      // const res = await api.v1.studies.groups(serverDummyGroupUUid).GET()
      // console.log(res)
      toast.info(`${res}`)
    } catch (error) {
      // console.error('API call failed:', error)
      toast.error(`${error}`)
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
