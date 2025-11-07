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

type Lecture = {
  id: number
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
  id: number
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  status: StudyGroupStatus
  current_headcount: number
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
  lectures: StudyGroupPostLecture[]
}

// ===================== Study:Review =====================
type StudyReview = {
  star_rating: number
  content: string
}

// ===================== Pagination =====================
type Pagination<T> = {
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
      // (스웨거) 로그아웃 기능 누락
      logout: {
        POST: () => { res: BaseResponse }
      }
    }
    notifications: {
      GET: () => { res: Pagination<Notification> }
    }
    lectures: {
      // (스웨거) 검색, 필터, 페이지네이션 기능 누락
      GET: () => {
        res: {
          count: number
          next: string
          previous: string
          results: Lecture[]
          user_nickname: string
          recommended_lectures: Lecture[]
        }
      }

      categories: {
        GET: () => { res: LectureCategory[] }
      }
    }
    studies: {
      groups: GroupApi
    }
  }
}

type GroupApi = {
  GET: () => { res: StudyGroup[] }
  POST: (req: StudyGroupPost) => { res: BaseResponse }

  (group_id: number): {
    GET: () => { res: StudyGroupDetail }
    delegate$leader: {
      POST: (req: { target_user_id: number }) => {
        res: BaseResponse
      }
    }
    leave: { DELETE: () => { res: BaseResponse } }
    members: { (_member_id: number): { DELETE: () => { res: BaseResponse } } }
    // (스웨거) res 타입 명시되지 않음
    // 확실하게 BaseResponse인지 확인 필요
    reviews: { POST: () => { req: StudyReview; res: BaseResponse } }
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
