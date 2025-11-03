export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
};

export const STATUS_TEXT_MAP: Record<string, string> = {
  ONGOING: '진행중',
  PENDING: '모집중',
  ENDED: '종료'
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', DATE_FORMAT_OPTIONS)
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
};

export const getStatusText = (status: string): string => {
  return STATUS_TEXT_MAP[status] || status;
};