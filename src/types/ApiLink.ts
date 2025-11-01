// ===================== User =====================
// type RoleEnum = 'admin' | 'staff' | 'user'
// (스웨거) RoleEnum이 존재하나 어디에도 쓰이지 않음
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
type DifficultyEnum = 'EASY' | 'NORMAL' | 'HARD'
type PlatformEnum = 'UDEMY' | 'INFLEARN '

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
type StudyGroupStatus = 'PENDING' | 'ONGOING' | 'ENDED'

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
type BaseResponse = {
  status: string
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
 * 스웨거
 * https://api.ozcoding.site/api/schema/swagger-ui/#/
 */
export const ApiLinks = {
  v1: {
    users: {
      me: {
        GET: {} as {
          res: UserProfile
        },
      },
    },
    auth: {
      // (스웨거) 로그아웃 기능 누락
      logout: {
        POST: {} as {
          res: BaseResponse
        },
      },
    },
    notifications: {
      GET: {} as {
        res: Pagination<Notification>
      },
    },
    lectures: {
      // (스웨거) 검색, 필터, 페이지네이션 기능 누락
      GET: {} as {
        res: {
          count: number
          next: string
          previous: string
          results: Lecture[]
          user_nickname: string
          recommended_lectures: Lecture[]
        }
      },
      categories: {
        GET: {} as {
          res: LectureCategory[]
        },
      },
    },
    studies: {
      groups: {
        GET: {} as {
          res: StudyGroup[]
        },
        POST: {} as {
          req: StudyGroupPost
          // (스웨거) post res 응답 누락
          // 임시로 디테일 이벤트 걸어놓음
          res: BaseResponse
        },
        // (스웨거) 전체 get 메서드와 단일 get 메서드 상의 group 타입이 다름
        // group_id
        dynamicSub: {
          GET: {} as {
            res: StudyGroupDetail
          },
          'delegate-leader': {
            POST: {} as {
              req: {
                target_user_id: number
              }
              res: BaseResponse
            },
          },
          leave: {
            DELETE: {} as {
              res: BaseResponse
            },
          },
          members: (_member_id: number) => ({
            DELETE: {} as {
              res: BaseResponse
            },
          }),
          // (스웨거) 리뷰는 현재 포스트 하나만 존재함
          // get, delete, patch 누락
          reviews: {
            POST: {} as {
              req: StudyReview
            },
          },
        },
      },
    },
  },
} as const
