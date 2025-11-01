import dayjs from '@/lib/dayjs';

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('YYYY.MM.DD');
};

export const formatDateTime = (dateString: string): string => {
  const date = dayjs(dateString);
  const hour = date.hour();
  const ampm = hour < 12 ? '오전' : '오후';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  
  return `${date.format('YYYY. MM. DD')} ${ampm} ${displayHour}:${date.format('mm')}`;
};

export const formatTime = (timeStr: string): string => {
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const ampm = hour < 12 ? '오전' : '오후';
  
  return `${ampm} ${hourStr}:${minuteStr}`;
};