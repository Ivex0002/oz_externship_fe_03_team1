// ===================== User =====================
// type RoleEnum = 'admin' | 'staff' | 'user'
// (스웨거) RoleEnum이 존재하나 어디에도 쓰이지 않음
// (예상) UserProfile에 RoleEnum 추가 가능성 있음
// (스웨거) 스터디 그룹의 멤버 항목은 uuid로써 식별값을 가지지만,
// /api/v1/users/me 에선 number 타입으로 받음
// (스웨거) UserProfile 타입 또한 id:integer 라고 명시되어 있음
export type UserProfile = {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  profile_img_url: string
  created_at: string
}
