// ===================== Lecture =====================
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

// ===================== Lecture:Review =====================
// rating이 string인 이유?
// 이후에 10점, 100점 등 확장 예정이면 %로 하는게 낫지않나?
type rating =
  | '5_OUT_OF_5_STARS'
  | '4_OUT_OF_5_STARS'
  | '3_OUT_OF_5_STARS'
  | '2_OUT_OF_5_STARS'
  | '1_OUT_OF_5_STARS'

type Review = {
  id: number
  rating: rating
  content: string
  created_at: string
}

// ===================== Study =====================

// ===================== Pagenation =====================
// type Pagenation = {
//   page: number
//   page_size: number
//   total_count: number
// }

// ===================== etc =====================
interface DetailEvent {
  detail: string
}

// WSChatErrorEvent 는 {type : error...}
// ErrorEvent 는 {error: string}
// 왜 에러 이벤트 타입이 2개인가?
// 왜 어떤 에러는 DetailEvent 이고 어떤 에러는 ErrorEvent으로 오는가?
// 에러 타입에만 사용하는게 아니라 detail, error, {type: 'error'...} 으로 섞여서 응답이 오고있음
// 백엔드 팀들간의 명확한 타입 일치가 필요함
interface ErrorEvent {
  error: string
}

/**
 * 모든 api 링크에 따른 타입 명시
 *
 * @example
 * 0. req가 없는 요청 예시:
 * api.v1.auth.logout.POST() 로 사용
 * (req_url:"api/v1/auth/logout/", method:"POST") 와 같음
 *
 * 1. req (body)만 있는 POST 요청 예시:
 * api.v1.studies.groups.POST(req_body) 로 사용
 * (req_url:"api/v1/studies/groups/", method:"POST", { data: req_body }) 와 같음
 *
 * 2. config (params)만 있는 GET 요청 예시:
 * 검색어와 페이지 옵션등을 config 객체로 전달 - 페이지네이션, 검색어 등은 실제 api명세서 필히 체크 할 것(현재 api 명세서 확정 x)
 * api.v1.studies.groups.GET({ params: { search: "typescript", page: 2 } }) 로 사용
 * (req_url:"api/v1/studies/groups/", method:"GET", { params: { search: "typescript", page: 2 } }) 와 같음
 *
 * ----------------------------------------------------------------------
 * 동적 경로 (Path Parameter) 처리 예시:
 * ----------------------------------------------------------------------
 *
 * 3. req(body)와 config(params) 모두 있는 PUT 요청 예시:
 *
 * 3-1. 경로 중간에 파라미터가 있는 경우
 * // 주로 PUT/PATCH 요청에서 ID를 params로, 업데이트 내용을 data로 전달할 때 사용
 * api.v1.studies.groups(id).PUT(req_body) 로 사용
 * (req_url:`api/v1/studies/groups/${id}/`, "PUT", { data: req_body }) 와 같음
 *
 * 3-2. config를 통해 옵션과 데이터 모두 지정이 필요한 경우
 * // 현재 해당 옵션을 반드시 사용해야하는 경우는 찾지 못했으나, 로직상 유동적으로 적용 가능함
 * api.~~~.METHOD({targetOption:myOption, data:req_body}) 로 사용
 * (req_url:`api/~~~/`, "METHOD", { data: req_body, params: { targetOption:myOption } }) 과 같음
 * 위의 3-1의 경우도 ApiLinks만 수정하면
 * api.v1.studies.groups(id).PUT(req_body) 대신
 * api.v1.studies.groups.PUT(req_body, { params: { groupId: id } }) 으로 사용 가능함
 * // 기본적으로 src\api\requestHandler.ts의 RequestConfig는 axios에서 지원되는 대부분의 옵션 적용 가능함
 * // 편의성과 가독성을 위해 경로 중간에 id 등의 파라미터를 지원 가능하도록 조치함(url상 파라미터 위치와 일치)
 *
 * 4. 동적 경로 + req(body) + config(params) 모두 있는 PUT 요청 예시:
 *  URL: /api/v1/studies/groups/123?updateType=partial
 *  // 주로 Path ID + Body + Query Params 조합
 * api.v1.studies.groups(123).PUT({ name: "New Name" }, { params: { updateType: "partial" } }) 로 사용
 *  (req_url:`api/v1/studies/groups/123`, "PUT", { data: { name: "New Name" }, params: { updateType: "partial" } }) 과 같음
 */
export const ApiLinks = {
  v1: {
    auth: {
      logout: {
        POST: {} as {
          res: DetailEvent | ErrorEvent
        },
      },
    },
    lectures: {
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
      dynamicSub: {
        reviews: {
          GET: {} as {
            res: {
              reviews: Review[]
            }
          },
          // POST: {} as {
          //   req: {}
          //   res: {}
          // },
          // 리뷰 삭제, 포스팅, 변경 로직 없음
        },
      },
    },
    studies: {
      groups: {
        POST: {} as {
          req: {
            name: string
            introduction: string
            profile_img_url: string
            start_at: string
            end_at: string
            max_headcount: number
            status: string
            lectures: Lecture[]
          }
          res: {
            status: number
            message: string
            data: {
              id: number
              name: string
              introduction: string
              profile_img_url: string
              start_at: string
              end_at: string
              max_headcount: number
              lectures: Lecture[]
            }
          }
        },
      },
    },
  },
}
