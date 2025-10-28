import type { ReviewDetailData } from '@/types/Review'

export const reviewDetailData: ReviewDetailData = {
  count: 2,
  averageRating: 4.5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      star_rating: 4,
      content:
        '스터디 리더님이 열정적으로 이끌어주셔서 끝까지 완주할 수 있었습니다. 다만 난이도가 조금 높았어요',
      updated_at: '2024-06-15T10:30:00Z',
      user: { id: 1, nickname: '김개발' },
    },
    {
      id: 2,
      star_rating: 5,
      content:
        '동료들과의 협업 프로젝트가 특히 도움되었습니다. 실무 경험을 쌓을 수 있어서 좋았어요.',
      updated_at: '2024-06-16T14:45:00Z',
      user: { id: 2, nickname: '이코딩' },
    },
  ],
}
