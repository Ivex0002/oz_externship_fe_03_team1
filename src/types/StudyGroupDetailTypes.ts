export interface Member {
  uuid: string
  nickname: string
  is_leader: boolean
}

export interface LectureDetail {
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
  uuid: string
}

// 스터디 그룹만 id 값이 uuid로 들어옴
export interface StudyGroupDetail {
  uuid: string
  name: string
  current_headcount: number
  max_headcount: number
  members: Member[]
  profile_img_url: string
  start_at: string
  end_at: string
  status: 'ONGOING' | 'PENDING' | 'ENDED'
  lectures: LectureDetail[]
  is_me_leader: boolean
}

// 알아본뒤에 필요없으면 삭제 이유가 명확하면 설명 후 사용.
// 서버에서 데이터를 감싼 형태로 보내는 경우를 위한 타입
export interface StudyGroupDetailApiResponse {
  data: StudyGroupDetail
}
