// import { apiFactory } from '@/api/api'
import { api } from '@/api/api'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
// import { storeAccessToken } from '@/store/storeAccessToken'
// import { toast } from 'react-toastify'

// const serverDummyGroupUUid = '57c71ffc-1a31-484f-8807-8fb985f63e7b'
// const serverDummyGroupMemberUUid = [
//   {
//     id: 4,
//     uuid: 'c3e9b594-f0d8-4319-ad46-563be901b995',
//     nickname: 'admin',
//     is_leader: true,
//   },
//   {
//     id: 7,
//     uuid: 'f5be8cfc-50b6-4604-90dc-255d5d03c16a',
//     nickname: 'ttuser7',
//     is_leader: false,
//   },
//   {
//     id: 8,
//     uuid: '3252fcca-368f-4695-b9e1-60d0e987c5b8',
//     nickname: 'ttuser8',
//     is_leader: false,
//   },
//   {
//     id: 9,
//     uuid: 'c57d9c54-f65b-4b2e-9f65-9f571ee6ee77',
//     nickname: 'ttuser9',
//     is_leader: false,
//   },
//   {
//     id: 10,
//     uuid: '6c5d11c2-69cb-4c41-8cff-130536323442',
//     nickname: 'ttuser1',
//     is_leader: false,
//   },
//   {
//     id: 11,
//     uuid: 'afd7c973-c07f-4a23-b16f-f35387df1969',
//     nickname: 'ttuser2',
//     is_leader: false,
//   },
//   {
//     id: 12,
//     uuid: '009f170d-8fe3-420a-bfda-b86688ebaeac',
//     nickname: 'ttuser3',
//     is_leader: false,
//   },
//   {
//     id: 13,
//     uuid: '3eca2b7a-bd5f-46df-80ec-4e19418cacb7',
//     nickname: 'ttuser4',
//     is_leader: false,
//   },
//   {
//     id: 14,
//     uuid: '91b26203-55ab-4125-a416-56e6ea294ac6',
//     nickname: 'ttuser5',
//     is_leader: false,
//   },
//   {
//     id: 15,
//     uuid: '12f82bae-a5cf-46ee-8f96-2c538af61d5e',
//     nickname: 'ttuser10',
//     is_leader: false,
//   },
// ]

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
  // const { accessToken } = storeAccessToken()
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
      // const res = await api.v1.studies.groups(serverDummyGroupUUid).GET()
      // const res = await api.v1.studies
      //   .groups(serverDummyGroupUUid)
      //   .delegate$leader.POST({
      //     target_member_uuid: serverDummyGroupMemberUUid[0].uuid,
      //   })
      // const res = await api.v1.studies
      //   .groups(serverDummyGroupUUid)
      //   .kick$member.DELETE({
      //     target_member_uuid: serverDummyGroupMemberUUid[9].uuid,
      //   })
      const res = await api.v1.studies.groups.GET(undefined, {
        params: {
          is_member: true,
        },
      })
      // const res = await api.v1.studies.groups(serverDummyGroupUUid).GET()

      const groupuuids = res.data.results.map((el) => el.uuid)
      console.log(res)

      for (const uuid of groupuuids) {
        console.log(uuid)

        const resRev = api.v1.studies.groups(uuid).reviews.GET(undefined, {
          params: {
            page: 1,
          },
        })
        console.log({ resRev })
      }

      // console.log({ accessToken })

      console.log(res)
      // toast.info(`${res}`)
    } catch (error) {
      console.error('API call failed:', error)
      // toast.error(`${error}`)
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
