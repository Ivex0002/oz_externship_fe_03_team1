import type { ReviewApiResponse } from '@/types/Review'

export const reviewDetailData: ReviewApiResponse = {
  count: 2,
  meta: {
    avg_rating: 4.5,
    count_total: 2,
    group_id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    histogram: {
      1: 0,
      2: 0,
      3: 0,
      4: 1,
      5: 1,
    },
  },
  next: null,
  previous: null,
  results: [
    {
      id: '1',
      rating: 4,
      content:
        '스터디 리더님이 열정적으로 이끌어주셔서 끝까지 완주할 수 있었습니다. 다만 난이도가 조금 높았어요',
      updated_at: '2024-06-15T10:30:00Z',
      created_at: '2024-06-15T10:30:00Z',
      isMine: true,
    },
    {
      id: '2',
      rating: 5,
      content:
        '동료들과의 협업 프로젝트가 특히 도움되었습니다. 실무 경험을 쌓을 수 있어서 좋았어요.',
      updated_at: '2024-06-16T14:45:00Z',
      created_at: '2024-06-16T14:45:00Z',
      isMine: false,
    },
  ],
}
