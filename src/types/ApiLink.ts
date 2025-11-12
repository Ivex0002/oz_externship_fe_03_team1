// ===================== User =====================
// type RoleEnum = 'admin' | 'staff' | 'user'
// (스웨거) RoleEnum이 존재하나 어디에도 쓰이지 않음

import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from 'axios'

// (예상) UserProfile에 RoleEnum 추가 가능성 있음
// (스웨거) 스터디 그룹의 멤버 항목은 uuid로써 식별값을 가지지만,
// /api/v1/users/me 에선 number 타입으로 받음
// (스웨거) UserProfile 타입 또한 id:integer 라고 명시되어 있음
type UserProfile = {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  profile_img_url: string
  created_at: string
}

// ===================== Notification =====================
type NotificationTypeEnum =
  | 'APPLICATIONS_CREATED'
  | 'APPLICATION_STATUS_APPROVAL'
  | 'APPLICATION_STATUS_REJECTION'
  | 'STUDY_MEMBER_JOINED'
  | 'STUDY_REVIEW_REQUEST'
  | 'STUDY_SCHEDULE_UPCOMING'
  | 'STUDY_SCHEDULE_TODAY'
  | 'STUDY_RECORD_CREATED'
  | 'SYSTEM'
  | 'CUSTOM'

type Notification = {
  id: number
  user_id: number
  type_display: string
  content: string
  type: NotificationTypeEnum
  is_read: boolean
  back_url_link: string
  user: number
}

// ===================== Lecture =====================
type LectureCategory = { id: number; name: string }
// 명시적으로 Enum이 제공되었으나, 추후에 string으로 대체될 가능성 있음
export type DifficultyEnum = 'EASY' | 'NORMAL' | 'HARD'
export type PlatformEnum = 'UDEMY' | 'INFLEARN '

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

type StudyGroup = {
  uuid: string
  name: string
  profile_img_url: string
  current_headcount: number
  max_headcount: number
  start_at: string
  end_at: string
  status: StudyGroupStatus
  // is_leader 필드가 왜 여기 있는가?
  // 어차피 멤버 필드에 is_leader: boolean 있다면 현재 접속중인 유저와 비교하고 bool값을 뽑을수 있지 않나?
  is_leader: boolean
  lectures: Lecture[]
}

// api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
type Member = {
  id: number
  nickname: string
  is_leader: boolean
}

type StudyGroupDetail = StudyGroup & {
  // api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
  members: Member[]
}

// api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
//
type StudyGroupPostLecture = {
  id: number
  title: string
  instructor: string
}

type StudyGroupPost = {
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  introduction: string
  // api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
  // (스웨거) uuid[] 라고 기입되어 있음
  lectures: StudyGroupPostLecture[]
}

// ===================== Study:Group-Admin =====================
// 관리자용이랑 일반 스터디 그룹 타입 형태가 다른 이유?
// 이미 uuid 있는데 다시 id를 작성하는 이유?
// 데이터의 유니크 키값으로 id를 쓰는건가 아니면 리더의 유저 id인가?
// 딱봐도 나중에 수정될거 같아서
type AdminStudyGroupDetail = { id: number } & StudyGroupDetail

type AdminStudyGroupList = Partial<AdminStudyGroupDetail>

// ===================== Study:Review =====================
type ReviewEnum =
  | '5_OUT_OF_5_STARS'
  | '4_OUT_OF_5_STARS'
  | '3_OUT_OF_5_STARS'
  | '2_OUT_OF_5_STARS'
  | '1_OUT_OF_5_STARS'

type StudyReview = {
  // (스웨거) uuid 형식
  id: string
  rating: ReviewEnum
  content: string
  created_at: string
  updated_at: string
  // 왜 is_mine을 bool값으로 주나?
  // owner 필드로 유저 id든 uuid든 리턴하고
  // 프론트에서 로그인한 유저 정보에 따라 불린값으로 쓰는게
  // 훨씬 서버 비용을 절약할수 있지않나?
  // 유저가 많아지면 많아질수록 비효율적임
  // 모든 유저를 램에 캐스팅해놓고 문자열 셋으로 쓴다?
  // 데이터 비용 자체는 적겠지만 클라이언트 쪽에서 리뷰를 누가 썼는지 확인도 불가능해짐
  // 장점보다 단점이 압도적으로 많음
  is_mine: boolean
}

type StudyReviewPost = {
  star_rating: number
  content: string
}

// ===================== Study:Presigned-url =====================
type File = {
  file_name: string
  content_type: string
}
type PresignedURL = {
  files: File[]
}

// ===================== Study:Schedule =====================
type SchedulePost = {
  // uuid
  study_group: string
  title: string
  objective: string
  session_date: string
  start_time: string
  end_time: string
}

// ===================== Chat =====================
type ChatRoom = {
  uuid: string
  name: string
  // 의문점 1 : Sender는 어디에? additionalProp 으로는 어떤 정보도 얻을 수 없음
  // 의문점 2 : last_message 단수형인데 어째서 배열 형태?
  last_message: string[] | null
  unread_message_count: number
}

type ChatSender = {
  id: number
  nickname: string
}

type ChatMessage = {
  id: number
  study_group_uuid: string
  sender: ChatSender
  content: string
  created_at: string
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
export type BaseResponse = {
  status: number
  message: string
  error?: {
    code: string
    detail: string
  }
}

/**
 * 모든 api 링크에 따른 타입 명시
 *
 * 사용법 상세
 * https://github.com/OZ-Coding-School/oz_externship_fe_03_team1/pull/74
 *
 * https://github.com/Ivex0002/key-is-link
 *
 * 스웨거
 * https://api.ozcoding.site/api/schema/swagger-ui/#/
 */
export type ApiLinks = {
  v1: {
    users: {
      me: {
        GET: () => { res: UserProfile }
      }
    }
    auth: {
      logout: {
        POST: () => { res: BaseResponse }
      }
    }
    notifications: {
      GET: () => { res: Pagination<Notification> }
    }
    lectures: {
      // (스웨거) 검색, 필터, 페이지네이션 기능 누락
      // 임시로 페이지 옵션만 첨부
      GET: () => {
        res: {
          data: Pagination<Lecture>
        }
      }

      categories: {
        GET: () => { res: LectureCategory[] }
      }
    }
    studies: {
      groups: GroupApi
      admin: {
        groups: {
          GET: () => { res: Pagination<AdminStudyGroupList> }

          (group_uuid: string): {
            GET: () => { res: AdminStudyGroupDetail }
          }
        }
      }
      // (스웨거) 어차피 그룹id 받는거면 주소에 groups/{group_uuid} 넣어서 엔드포인트 일치시키는게 맞지 않나?
      // /notes 항목도 동일한 문제가 있음
      study$schedules: {
        POST: (req: SchedulePost) => { res: BaseResponse }
      }
    }
    chat: {
      chatrooms: {
        GET: () => { res: ChatRoom[] }
        (studyGroupId: string): {
          messages: {
            // 해당 요청 에러시 에러 객체가 아닌 일반 메시지로 응답이 옴(403)
            // 페이지네이션 전체 타입에 대해 정확히 Pagination<ChatMessage> 으로 오는지 확인 필요
            // 스웨거에는 ChatMessage 만 적혀있음
            GET: () => { res: Pagination<ChatMessage> }
          }
        }
      }
    }
  }
}

type GroupApi = {
  GET: () => { res: Pagination<StudyGroup> }
  POST: (req: StudyGroupPost) => { res: BaseResponse }

  // 파일 보내기 전 요청 url을 먼저 받는게 맞는거 같은데
  // res 타입이 {"files": [{"file_name": "string","content_type": "string"}]} 으로 오는게 맞나?
  // 아무리 봐도 presigned-url 데이터 구조는 아닌거 같음
  presigned$url: {
    POST: (req: PresignedURL) => { res: PresignedURL }
  }

  (group_uuid: string): {
    GET: () => { res: StudyGroupDetail }
    delegate$leader: {
      // userProfile을 제외한 모든 필드에서 유저 id는 uuid 형식임
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
    leave: { DELETE: () => { res: BaseResponse } }
    // 다른 곳에선 member : uuid 형식인데 여기는 왜 number 타입으로 받나?
    members: { (member_id: string): { DELETE: () => { res: BaseResponse } } }
    notes: {
      // (스웨거) res 타입 아직 안나옴
      GET: () => { res: BaseResponse }

      // (스웨거) /api/v1/studies/notes 에 반드시 그룹 uuid가 링크에 포함되어야 하는 파트인데도 미포함 되어있음
      // 아무리 봐도 반드시 링크에 uuid 첨부 형식인거 같아 스웨거와 다르게 작업함
      // 현재 GET메서드 하나만 uuid 포함이고, 나머지는 전부 studies 직후에 연결되고 있음
      POST: () => { res: BaseResponse }

      (note_id: number): {
        GET: () => { res: BaseResponse }
        DELETE: () => { res: BaseResponse }
      }

      // 위의 presigned-url와 동일한 문제를 가지고 있음
      // (스웨거) 또한 링크 주소 상에 note_id 누락 되어있음
      // note_id 반드시 포함이면 처음 노트 작성 도중 이미지 첨부는 어떻게 하나?
      // 작성 시작시 바로 POST요청 보내고 임시저장 만든다음 id 받아와서 PUT이나 PATCH 방식으로 하나?
      // 파일 저장용 데이터 필드 구축하고 거기서 참조 형식으로 작성되나?
      presigned$url: {
        POST: (req: PresignedURL) => { res: PresignedURL }
      }
    }
    reviews: {
      // 리뷰를 받아오는 쪽에서는 평점이 문자열
      GET: () => { res: Pagination<StudyReview> }
      // 리뷰를 작성하는 쪽에서는 평점이 숫자
      // 서버쪽에서 숫자로 온 데이터를 문자열로 파싱하는 과정이 필요함
      // 문자열로 할거면 그냥 클라이언트쪽에 통신비용 떠넘기고 타입 통일해서 서버 동작 줄이는게 낫지 않나?
      // 어차피 5점만점 유지할거면 데이터 크기 작은 int 1~5로 받는게 낫지 않나?
      // 숫자로 하면 메모리 8 byte 통신 1 byte
      // 문자열로 하면 메모리 32~48 bytes 통신 17 bytes
      // 왜 문자열로 하는거지?
      POST: (req: StudyReviewPost) => { res: BaseResponse }
      (review_uuid: string): {
        // put과 patch 혼용이유가 있나?
        // patch 하나만으로 충분히 실행 가능하지 않나?
        PUT: (req: StudyReview) => { res: StudyReview }
        PATCH: (req: StudyReview) => { res: StudyReview }
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