// src/lib/dayjs.ts
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat' // e.g. L, LL
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale('ko')

export default dayjs

// 사용 시 import dayjs from "@/lib/dayjs" -> 플러그인/한글 설정이 적용된 상태로 사용가능
// * 경로에 '@/lib/dayjs'를 사용해야 함에 유의!! (자동 import 시 'dayjs'로만 들어오는 경우가 있음)

// localizedFormat 사용 예시:
// dayjs().format("L") -> 2025.09.07
// dayjs().format("LL") -> 2025년 9월 7일
// dayjs().format("LLL") -> 2025년 9월 7일 오후 3:45
// dayjs().format("LLLL") -> 2025년 9월 7일 일요일 오후 3:45
