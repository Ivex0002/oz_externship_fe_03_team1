/**
 * iso 형식의 날짜를 "n월 n일"로 파싱해주는 유틸 메서드
 * @param isoString iso형식 날짜 데이터
 * @returns n월 n일
 */
export function formatToMonthDay(isoString: string): string {
  const date = new Date(isoString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}월 ${day}일`
}
/**
 * iso 형식의 날짜를 "nn:nn"(24시간제 시:분) 문자열로 파싱해주는 유틸 메서드
 * @param isoString iso형식 날짜 데이터
 * @returns nn(시):nn(분)
 */
export function formatToHourMin(isoString: string): string {
  const date = new Date(isoString)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
