export const STATUS_TEXT_MAP: Record<string, string> = {
  ONGOING: '진행중',
  PENDING: '모집중',
  ENDED: '종료'
};

export const getStatusText = (status: string): string => {
  return STATUS_TEXT_MAP[status] || status;
};