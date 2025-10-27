// ===================== Chat =====================
type Chat = {
  id: number
  sender_id: number
  sender_nickname: string
  study_group_id: number
  content: string
  file_url: string | null
  is_read: boolean
  created_at: string
}

// ===================== Chat:WS =====================
// 어째서 웹 소캣 연결시 성공 타입과 메시지 목록 조회의 메시지 타입이 다르지?
interface WSChatMessageEvent {
  type: 'chat.message'
  data: {
    message_id: number
    sender_id: number
    study_group_id: number
    content: string
    created_at: string
  }
}

interface WSChatErrorEvent {
  type: 'error'
  code: 'NOT_A_MEMBER' | 'INVALID_TOKEN' | 'UNKNOWN_ERROR'
  message: string
}

export interface WSChatMessageReq {
  type: 'chat.message'
  content: string
}

// ===================== Study =====================

// ===================== Study:Lecture =====================
// /api/v1/lectures : 강의 목록 조희 요청에 사용자에 따른 추천 항목이 포함됨
// /api/v1/lectures/recommendations : 사용자에 따른 추천 항목
// 어째서 메서드가 반복되는가?
// 명시적 분리 필요 > /api/v1/lectures의 추천항목은 로그인 안하면 어차피 안뜸
// 로그인시에만 클라쪽에서 /api/v1/lectures/recommendations 에 따로 요청하는 로직 작성이 알맞음
// 메서드/링크 별로 역할을 명확히 분리하여 관리하는게 맞음
type LectureCategory = { id: number; name: string }

type Lecture = {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  difficulty: string
  original_price: number
  discount_price: number
  platform: string
  average_rating: number
  url_link: string
  is_bookmarked: boolean
}

// ===================== Pagenation =====================
type Pagenation = {
  page: number
  page_size: number
  total_count: number
}

// ===================== etc =====================
interface DetailEvent {
  detail: string
}

// WSChatErrorEvent 는 {type : error...}
// ErrorEvent 는 {error: string}
// 왜 에러 이벤트 타입이 2개인가?
// 왜 어떤 에러는 DetailEvent 이고 어떤 에러는 ErrorEvent으로 오는가?
// 에러 타입에만 사용하는게 아니라 detail, error, {type: 'error'...} 으로 섞여서 응답이 오고있음
interface ErrorEvent {
  error: string
}

export interface ApiLinks {
  v1: {
    auth: {
      refresh: {
        POST: {
          res: {
            detail: string
            data: {
              access_token: string
              token_type: string
              expires_in: number
            }
          }
        }
      }
      logout: {
        POST: {
          res: DetailEvent | ErrorEvent
        }
      }
    }
    studies: {
      groups: {
        POST: {
          req: {
            name: string
            introduction: string
            profile_img_url: string
            start_at: string
            end_at: string
            max_headcount: 2
            status: string
            lectures: Lecture[]
          }
        }
      }
    }
  }
  ws: {
    studyGroups: (id: number) => {
      // 메시지 검색하는게 ui상에 있었나?
      // 피그마엔 안보이는데 뭘 보고 작업한거지?
      chat: {
        connect: {
          req: WSChatMessageReq
          res: WSChatMessageEvent | WSChatErrorEvent
        }
      }
      messages: {
        GET: {
          res: {
            status: string
            code: string
            message: string
            data: {
              messages: Chat[]
              pagination: Pagenation
            }
          }
        }
      }
    }
  }
}

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'

// HttpMethod 일때 req 유무에 따른 분기처리
type ApiMethod<M> = M extends { res: infer R; req: infer Q }
  ? (payload: Q) => Promise<R>
  : M extends { res: infer R }
    ? () => Promise<R>
    : never

export type ApiTree<T> = {
  [K in keyof T]: K extends HttpMethod // HTTP 메서드
    ? ApiMethod<T[K]>
    : T[K] extends (...args: infer Args) => infer SubT // 동적 경로 함수 (ex:id, 검색어 등등)
      ? (...args: Args) => ApiTree<SubT>
      : T[K] extends object
        ? ApiTree<T[K]>
        : T[K]
}
