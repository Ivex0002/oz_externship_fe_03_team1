import dayjs from '@/lib/dayjs'

/**
 * iso 형식의 날짜를 "n월 n일"로 파싱해주는 유틸 메서드
 * @param isoString iso형식 날짜 데이터
 * @returns n월 n일
 */
export function formatToMonthDay(isoString: string): string {
  const date = dayjs(isoString)
  const month = date.month() + 1 // dayjs month is 0-based
  const day = date.date()
  return `${month}월 ${day}일`
}

/**
 * iso 형식의 날짜를 "nn:nn"(24시간제 시:분) 문자열로 파싱해주는 유틸 메서드
 * @param isoString iso형식 날짜 데이터
 * @returns nn(시):nn(분)
 */
export function formatToHourMin(isoString: string): string {
  const date = dayjs(isoString)
  const hours = date.hour().toString().padStart(2, '0')
  const minutes = date.minute().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
