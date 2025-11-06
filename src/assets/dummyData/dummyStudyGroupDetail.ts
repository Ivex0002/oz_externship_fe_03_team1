import type { StudyGroupDetail } from '@/types/StudyGroupDetailTypes'

export const studyGroupApiResponse = {
  data: {
    id: '1',
    name: 'React 마스터 스터디',
    current_headcount: 4,
    max_headcount: 5,
    members: [
      {
        id: 1,
        nickname: '김코딩',
        is_leader: true,
      },
      {
        id: 2,
        nickname: '이개발',
        is_leader: false,
      },
      {
        id: 3,
        nickname: '박프론트',
        is_leader: false,
      },
      {
        id: 4,
        nickname: '최리액트',
        is_leader: false,
      },
    ],
<<<<<<< HEAD
    profile_img_url:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop',
    start_at: '2025-01-15',
    end_at: '2025-03-15',
    status: 'ONGOING' as const,
=======
    profile_img_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop",
    start_at: "2025-01-15",
    end_at: "2025-03-15",
    status: "ONGOING" as const,
    is_leader: true,
>>>>>>> 7f9becb (feat 리더권한 중 위임, 강퇴 알러트에서 모달변경)
    lectures: [
      {
        thumbnail_img_url: '/React.svg',
        title: 'React 완벽 가이드',
        instructor: '김멘토',
        url_link: 'https://example.com/lecture1',
      },
      {
        thumbnail_img_url: '/React.svg',
        title: 'TypeScript 실전',
        instructor: '이강사',
        url_link: 'https://example.com/lecture2',
      },
      {
        thumbnail_img_url: '/React.svg',
        title: 'Next.js 마스터',
        instructor: '박교수',
        url_link: 'https://example.com/lecture3',
      },
      {
        thumbnail_img_url: '/React.svg',
        title: 'React Query 심화',
        instructor: '최전문가',
        url_link: 'https://example.com/lecture4',
      },
      {
        thumbnail_img_url: '/React.svg',
        title: '성능 최적화 기법',
        instructor: '정개발자',
        url_link: 'https://example.com/lecture5',
      },
    ],
  },
}

export const studyGroupDetail: StudyGroupDetail = studyGroupApiResponse.data
