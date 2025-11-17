import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from 'axios'

import type { UserNotification } from './Notification'
import type { UserProfile } from './User'
import type { ChatMessage, ChatRoom } from './Chat'

import type { ReviewApiResponse } from './Review'

// ===================== Notification =====================
// type NotificationTypeEnum =
//   | 'APPLICATIONS_CREATED'
//   | 'APPLICATION_STATUS_APPROVAL'
//   | 'APPLICATION_STATUS_REJECTION'
//   | 'STUDY_MEMBER_JOINED'
//   | 'STUDY_REVIEW_REQUEST'
//   | 'STUDY_SCHEDULE_UPCOMING'
//   | 'STUDY_SCHEDULE_TODAY'
//   | 'STUDY_RECORD_CREATED'
//   | 'SYSTEM'
//   | 'CUSTOM'

type NotiStudyJoinPost = {
  // api 명세서상 number 타입
  // 추후 변경 가능성 매우 높음
  study_groups_id: number
  user_id: number
}

// ===================== Lecture =====================
type LectureCategory = { id: number; name: string }
// 명시적으로 Enum이 제공되었으나, 추후에 string으로 대체될 가능성 있음
export type DifficultyEnum = 'EASY' | 'NORMAL' | 'HARD'
export type PlatformEnum = 'UDEMY' | 'INFLEARN'

// uuid, id 혼용 이유 ?
type Lecture = {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  difficulty: DifficultyEnum
  original_price: number
  discount_price: number
  platform: PlatformEnum
  average_rating: string
  duration: number
  url_link: string
  is_bookmarked: boolean
}

// ===================== Study =====================

// ===================== Study:Group =====================
// api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
export type StudyGroupStatus = 'PENDING' | 'ONGOING' | 'ENDED'

// 스터디 그룹 목록조회, 스터디 그룹 상세조회 => 강의 타입이 상이함
type StudyLecture = {
  uuid: string
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
}

type StudyGroup = {
  uuid: string
  name: string
  introduction: string
  profile_img_url: string
  current_headcount: number
  max_headcount: number
  start_at: string
  end_at: string
  status: StudyGroupStatus
  lectures: StudyLecture[]
  is_leader: boolean
}

type StudyGroupDetail = {
  uuid: string
  name: string
  introduction: string
  profile_img_url: string
  current_headcount: number
  max_headcount: number
  start_at: string
  end_at: string
  status: StudyGroupStatus
  lectures: StudyLecture[]
  is_me_leader: boolean
  members: Member[]
}

// api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
type Member = {
  id: number
  uuid: string
  nickname: string
  is_leader: boolean
}

// api 명세서를 기준으로 작성 - 이후 변경 가능성 있음

type StudyGroupPost = {
  name: string
  introduction: string
  profile_img_url: string | null
  start_at: string
  end_at: string
  max_headcount: number
  // api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
  // (스웨거) uuid[] 라고 기입되어 있음
  lectures: string[]
}

// api명세서:lectures타입 기입 x
// StudyGroupPostLecture 로 임시 대체
type StudyGroupPut = {
  name: string
  introduction: string
  profile_img_url: string | null
  start_at: string
  end_at: string
  lectures: string[]
  max_headcount: number
}

// ===================== Study:Group-Admin =====================
// 관리자용이랑 일반 스터디 그룹 타입 형태가 다른 이유?
// 이미 uuid 있는데 다시 id를 작성하는 이유?
// 데이터의 유니크 키값으로 id를 쓰는건가 아니면 리더의 유저 id인가?
// **추후에 수정 가능성 매우 높음**

// 기존 멤버 타입에서 uuid 누락됨
type AdminStudyGroupDetailMember = {
  nickname: string
  is_leader: boolean
}
// 기존 StudyLecture 에서 uuid 누락됨
type AdminStudyGroupDetailLecture = {
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
}
type AdminStudyGroupDetail = {
  id: number
  uuid: string
  name: string
  current_headcount: number
  max_headcount: number
  members: AdminStudyGroupDetailMember[]
  profile_img_url: string
  start_at: string
  end_at: string
  status: string
  lectures: AdminStudyGroupDetailLecture[]
  created_at: string
  updated_at: string
}

type AdminStudyGroup = {
  id: number
  name: string
  current_headcount: number
  max_headcount: number
  profile_img_url: string
  start_at: string
  end_at: string
  status: string
  created_at: string
  updated_at: string
}

// ===================== Study:Review =====================

type StudyReview = {
  id: string
  isMine: boolean
  rating: number
  content: string
  created_at: string
  updated_at: string
}

type StudyReviewPost = {
  star_rating?: number
  content?: string
}

type StudyReviewPatchRes = StudyReview & {
  // (명세서) study_group_id : number로 잘못 기입되어있음
  study_group_id: string
  updated_at: string
}

// ===================== Study:Review-admin =====================
// (명세서) 그룹 id number로 잘못 기입되어 있음
type ReviewAdminGroup = { id: string; name: string }
type ReviewDetailAdminGroup = ReviewAdminGroup & {
  start_date: string
  end_date: string
}
// 추후에 id는 string으로 바뀔 가능성 매우 높음
type ReviewAdminUser = { id: number; nickname: string; email: string }

type ReviewAdminRes = {
  id: number
  study_group: ReviewAdminGroup
  user: ReviewAdminUser
  star_rating: number
  content: string
  created_at: string
  updated_at: string
}

// ReviewAdminRes에 study_group 구조만 다름
type ReviewDetailAdminRes = {
  id: number
  study_group: ReviewDetailAdminGroup
  user: ReviewAdminUser
  star_rating: number
  content: string
  created_at: string
  updated_at: string
}

// ===================== Study:Presigned-url =====================
type File = {
  file_name: string
  content_type: string
}
type PresignedURLReq = {
  files: File[]
}

type PresignedURLRes = {
  file_name: string
  key: string
  url: string
  fields: {
    key: string
    policy: string
    'x-amz-signature': string
  }
  file_url: string
  expires_in: 300
}

// ===================== Study:Note =====================
type NoteFile = {
  type: string
  url: string
  filename: string | null
}
// **추후에 Author id 항목 uuid로 변경될 가능성 매우 높음**
type NoteAuthor = {
  id: number
  nickname: string
  profile_image_url: string
}

// type AISummary = {
//   available: boolean
//   created_at: string
//   format: string
//   body: string
// }

type Note = {
  id: number
  group_id: string
  title: string
  author: NoteAuthor
  content: string
  attachments: NoteFile[]
  ai_summary: string
  created_at: string
  updated_at: string
}

type NoteGetByGroupRes = {
  id: number
  title: string
  author: NoteAuthor
  created_at: string
  files_count: number
}

type NotePost = {
  group_id: string
  title: string
  content_md: string
  attachments: NoteFile[]
}

type NotePostRes = {
  id: number
  group_id: string
  title: string
  author: NoteAuthor
  created_at: string
}

type NotePatchReq = {
  title: string
  content_md: string
  attachments: NoteFile[]
}

// ===================== Study:Schedule =====================
type SchedulePost = {
  title: FormDataEntryValue
  objective: FormDataEntryValue
  session_date: FormDataEntryValue
  start_time: FormDataEntryValue
  end_time: FormDataEntryValue
}

type Schedule = {
  uuid: string
  study_group: string
  title: string
  objective: string
  session_date: string
  start_time: string
  end_time: string
  created_at: string
  updated_at: string
}
type Participant = {
  id: number
  user: {
    uuid: string
    nickname: string
  }
  is_leader: boolean
}
type ScheduleDetail = Schedule & {
  participants: Participant[]
}

// ===================== Pagination =====================
export type PageReq = { page: number }

export type Pagination<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ===================== etc =====================
export type BaseResWithGeneric<T> = {
  status: number
  message: string
  data: T | null
  error?: {
    code: string
    detail: string
  }
}

export type BaseResponse = {
  status: number
  message: string
  error?: {
    code: string
    detail: string
  }
}

export type DataDetail<T> = {
  data: T
  detail: string
}

/**
 * 모든 api 링크에 따른 타입 명시
 *
 * 사용법 상세
 * @see https://github.com/OZ-Coding-School/oz_externship_fe_03_team1/pull/74
 *
 * @see https://github.com/Ivex0002/key-is-link
 *
 * 스웨거
 * @see https://api.ozcoding.site/api/schema/swagger-ui/#/
 *
 * API 명세서
 * @see https://www.notion.so/API-27acaf5650aa81f3b3fde1ecf0aeb032
 */
export type ApiLinks = {
  v1: {
    users: {
      me: {
        GET: () => { res: DataDetail<UserProfile> }
      }
    }
    auth: {
      logout: {
        POST: () => { res: BaseResponse }
      }
    }
    notifications: NotificationApi
    lectures: LectureApi
    studies: {
      groups: GroupApi
      notes: NoteApi
      admin: AdminApi
      schedules: ScheduleApi
    }
    chat: ChatApi
  }
}

type NotificationApi = {
  // 알림쪽 api 명세서 매우 미흡함
  // 단일문서에서도 GET-POST 혼용
  // 엔드포인트 분리 X
  // 예정 스케줄 알림 생성 데이터 필드 누락
  GET: () => {
    res: {
      counts: { total: number; unread: number; read: number }
      results: UserNotification[]
    }
  }
  read$all: {
    POST: () => {
      res: BaseResponse
    }
  }
  (notification_id: number): {
    read: {
      POST: () => {
        res: BaseResponse
      }
    }
  }
  study: {
    join: {
      POST: (req: NotiStudyJoinPost) => {
        res: BaseResponse
      }
    }
    review$request: {
      POST: () => {
        res: BaseResponse
      }
    }
  }
}

type LectureApi = {
  // (스웨거) 검색, 필터, 페이지네이션 기능 누락
  // 임시로 페이지 옵션만 첨부
  GET: () => {
    res: {
      data: Pagination<Lecture>
    }
  }
  categories: {
    GET: () => {
      res: LectureCategory[]
    }
  }
}

type GroupApi = {
  /**
   * @queries {status, page, search}
   * @example
   * ```ts
   * api.v1.studies.groups.GET(undefined, {status:”PENDING” | ”ONGOING” | ”ENDED” , page:number, search:string})
   * ```
   */
  GET: () => { res: { data: Pagination<StudyGroup> } }
  POST: (req: StudyGroupPost) => {
    res: BaseResWithGeneric<StudyGroupPost & { uuid: string }>
  }

  presigned$url: {
    POST: (req: PresignedURLReq) => {
      res: { data: BaseResWithGeneric<PresignedURLRes> }
    }
  }

  (group_uuid: string): {
    GET: () => { res: BaseResWithGeneric<StudyGroupDetail> }
    PUT: (req: StudyGroupPut) => { res: BaseResponse }
    // /api/vi/studies/groups/{uuid}/members/{member_id} PATCH 로 이동
    // 문서 내부에서 서로 다른 엔드포인트가 혼용되고 있음
    // 그러나 데이터 구조상 POST보다는 데이터 일부만 수정하는 PATCH가 알맞고,
    // 굳이 새로운 엔드포인트를 팔 이유가 없기에
    // members/{member_id} PATCH 가 합당한 조치라고 판단하여 이동 조치함
    // delegate$leader: {
    //   // userProfile을 제외한 모든 필드에서 유저 id는 uuid 형식임
    delegate$leader: {
      POST: (req: { target_member_uuid: string }) => {
        res: {
          // 어째서 타겟은 uuid이고 이전, 신규/이전 리더는 number인가?
          // 동일한 유저 필드를 참조하는 것이라면 둘 중 하나로 통일하는것이 맞음
          // 현재 member~로 지칭되는것은 전부 uuid 이고, user~ 로 지칭되는 것은 id로 서로 데이터 구조가 다름
          target_member_uuid: string
          previous_leader_id: number
          new_leader_id: number
        }
      }
    }
    // }
    leave: { DELETE: () => { res: BaseResponse } }

    kick$member: {
      DELETE: (req: { target_member_uuid: string }) => { res: BaseResponse }
    }

    reviews: ReviewApi
    schedules: { GET: () => { res: BaseResWithGeneric<Schedule[]> } }

    // 다른 곳에선 member : uuid 형식인데 여기는 왜 number 타입으로 받나?
    members: {
      (member_id: string): {
        DELETE: () => { res: BaseResponse }
        PATCH: () => { res: BaseResponse }
      }
    }
    notes: {
      GET: () => {
        res: BaseResWithGeneric<
          { data: NoteGetByGroupRes[] } & {
            order: string
            group_id: string
          }
        >
      }
    }
  }
}

type ReviewApi = {
  GET: () => {
    res: { data: ReviewApiResponse }
    // res: BaseResWithGeneric<Pagination<StudyReview>>
  }
  POST: (req: StudyReviewPost) => {
    res: BaseResponse
  }
  (review_uuid: string): {
    // (명세서) 해당 요청 detail에 data가 잘못 들어오고 있음
    // 아무리 봐도 이건 아닌것 같아 data 필드로 가정하고 기입함
    PATCH: (req: StudyReviewPost) => {
      res: BaseResWithGeneric<StudyReviewPatchRes>
    }
  }
}

type ScheduleApi = {
  POST: (req: SchedulePost) => { res: Schedule }

  (schedule_id: string): {
    GET: () => { res: BaseResWithGeneric<ScheduleDetail> }
    PATCH: (req: Partial<SchedulePost>) => {
      res: BaseResWithGeneric<Schedule[]>
    }
    DELETE: () => { res: BaseResponse }
  }
}

type NoteApi = {
  POST: (req: NotePost) => { res: BaseResWithGeneric<NotePostRes> }

  (note_id: number): {
    GET: () => { res: { data: BaseResWithGeneric<Note> } }
    PATCH: (req: NotePatchReq) => { res: BaseResWithGeneric<Note> }
    DELETE: () => { res: BaseResponse }
  }

  presigned$url: {
    POST: (req: PresignedURLReq) => {
      res: BaseResWithGeneric<PresignedURLRes[]>
    }
  }
}

type AdminApi = {
  groups: {
    // api 명세서 : BaseResWithGeneric<AdminStudyGroupList>
    // 스웨거 : Pagination<AdminStudyGroupList>
    // 서로 타입이 상충함
    /**
     * @queries {finished:boolean, sort:string, limit:int, offset:int}
     */
    GET: () => {
      res: BaseResWithGeneric<{
        study_groups: AdminStudyGroup[]
      }>
    }
    (group_uuid: string): {
      GET: () => {
        res: BaseResWithGeneric<AdminStudyGroupDetail>
      }
    }
  }
  reviews: {
    GET: () => { res: BaseResWithGeneric<Pagination<ReviewAdminRes>> }

    (uuid: string): {
      GET: () => { res: ReviewDetailAdminRes }
    }
  }
}

type ChatApi = {
  total$unread$messages: {
    GET: () => { res: BaseResWithGeneric<{ total_unread_count: number }> }
  }
  chatrooms: {
    GET: () => {
      res: ChatRoom[]
    }
    (study_group_uuid: string): {
      messages: {
        // 해당 요청 에러시 에러 객체가 아닌 일반 메시지로 응답이 옴(403)
        // 페이지네이션 전체 타입에 대해 정확히 Pagination<ChatMessage> 으로 오는지 확인 필요
        // 스웨거에는 ChatMessage 만 적혀있음
        // 페이지 옵션과 데이터 결과가 매우 이질적으로 되어 있음
        // 이것만 따로 데이터 구조 다르게 기입함

        // 25.11.16 실제 오는 데이터를 기준으로 수정함
        GET: () => {
          res: Pagination<ChatMessage>
        }
      }
    }
  }
}

export type AxiosErrorHandler = (error: AxiosError) => void | Promise<never>

/**
 * API 요청을 수행하는 함수 시그니처.
 * - createApiTree에 주입되어 모든 요청이 이를 통해 수행됨.
 */
export type RequestExecutor = <Req, Res>(
  url: string,
  method: Method,
  data?: Req,
  config?: AxiosRequestConfig
) => Promise<Res>

// 리프레시
export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
