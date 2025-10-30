
// "HH:mm" 형태의 시간 문자열을 받아 "오전/오후 HH:mm" 형태로 변환하는 함수
// @param timeStr "HH:mm" (예: "09:30", "15:45")
// @returns "오전 HH:mm" 또는 "오후 HH:mm"
export const formatTime = (timeStr: string): string => {
  // timeStr이 'HH:mm' 형태라고 가정
  const [hourStr, minuteStr] = timeStr.split(':');
  
  // 시(hour)를 정수로 변환하여 오전/오후를 판단
  const hour = parseInt(hourStr, 10);

  // 00:00 (0시)부터 11:59 (11시)까지는 '오전'
  // 12:00 (12시)부터 23:59 (23시)까지는 '오후'
  const ampm = hour < 12 ? '오전' : '오후';

  // 원본 시간 문자열에 오전/오후만 붙여 반환
  return `${ampm} ${hourStr}:${minuteStr}`;
};