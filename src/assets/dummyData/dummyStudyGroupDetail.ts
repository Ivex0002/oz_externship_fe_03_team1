import type { StudyGroupDetail } from '@/types/StudyGroupDetailTypes'

export const studyGroupApiResponse = {
  data: {
    uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'React 마스터 스터디',
    current_headcount: 4,
    max_headcount: 5,
    members: [
      {
        id: 1,
        uuid: 'a',
        nickname: '김코딩',
        is_leader: true,
      },
      {
        id: 2,
        uuid: 'B',
        nickname: '이개발',
        is_leader: false,
      },
      {
        id: 3,
        uuid: 'c',
        nickname: '박프론트',
        is_leader: false,
      },
      {
        id: 4,
        uuid: 'D',
        nickname: '최리액트',
        is_leader: false,
      },
    ],
    profile_img_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop",
    start_at: "2025-01-15",
    end_at: "2025-03-15",
    status: "ONGOING" as const,
    is_me_leader: true,
    lectures: [
      {
        uuid: '1',
        thumbnail_img_url: '/React.svg',
        title: 'React 완벽 가이드',
        instructor: '김멘토',
        url_link: 'https://example.com/lecture1',
      },
      {
        uuid: '2',
        thumbnail_img_url: '/React.svg',
        title: 'TypeScript 실전',
        instructor: '이강사',
        url_link: 'https://example.com/lecture2',
      },
      {
        uuid: '3',
        thumbnail_img_url: '/React.svg',
        title: 'Next.js 마스터',
        instructor: '박교수',
        url_link: 'https://example.com/lecture3',
      },
      {
        uuid: '4',
        thumbnail_img_url: '/React.svg',
        title: 'React Query 심화',
        instructor: '최전문가',
        url_link: 'https://example.com/lecture4',
      },
      {
        uuid: '5',
        thumbnail_img_url: '/React.svg',
        title: '성능 최적화 기법',
        instructor: '정개발자',
        url_link: 'https://example.com/lecture5',
      },
    ],
  },
}

export const studyGroupDetail: StudyGroupDetail = studyGroupApiResponse.data
