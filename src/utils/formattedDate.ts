export const formattedReviewUpdatedDate = (reviewUpdatedDate: string) => {
  const updatedDate = new Date(reviewUpdatedDate)
  const year = updatedDate.getFullYear()
  const month = updatedDate.getMonth() + 1
  const date = updatedDate.getDate()
  const hour =
    updatedDate.getHours() > 12
      ? `오후 ${updatedDate.getHours() - 12}`
      : `오전 ${updatedDate.getHours()}`
  const minute = updatedDate.getMinutes()
  const time = `${hour}:${minute}`

  const formattedUpdatedDate = `${year}. ${month}. ${date} ${time}`

  return formattedUpdatedDate
}
/**
 * 날짜 포맷: YYYY.MM.DD
 * 예: "2025.11.03"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}.${month}.${day}`;
};

/**
 * 날짜 + 시간 포맷
 * formattedReviewUpdatedDate와 동일
 */
export const formatDateTime = (dateString: string): string => {
  return formattedReviewUpdatedDate(dateString);
};

/**
 * 시간 문자열을 오전/오후 형식으로 변환
 * 입력: "14:30" → 출력: "오후 14:30"
 */
export const formatTime = (timeStr: string): string => {
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? '오후' : '오전';
  
  return `${ampm} ${hourStr}:${minuteStr}`;
};