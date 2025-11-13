import type { StudyGroup } from '@/types/StudyGroupTypes'

export const studyGroupList: StudyGroup[] = [
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'React 실무 프로젝트 스터디',
    status: 'ONGOING',
    start_at: '2024-04-01T09:00:00Z',
    end_at: '2024-04-30T18:00:00Z',
    current_headcount: 8,
    max_headcount: 10,
    is_leader: false,
    lectures: [
      {
        id: 1,
        title: 'React 기초 다지기',
        instructor: '박개발',
      },
      {
        id: 2,
        title: '상태 관리와 라우팅',
        instructor: '이코딩',
      },
    ],
    profile_img_url: '../images/IMG-76.png',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'Python 데이터 분석 스터디',
    status: 'ONGOING',
    start_at: '2024-05-01T10:00:00Z',
    end_at: '2024-05-31T17:00:00Z',
    current_headcount: 6,
    max_headcount: 8,
    is_leader: true,
    lectures: [
      {
        id: 3,
        title: 'Pandas와 NumPy 기초',
        instructor: '최분석',
      },
      {
        id: 4,
        title: '머신러닝 입문',
        instructor: '강머신',
      },
    ],
    profile_img_url: '../images/IMG-136.png',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'AI 모델링 스터디',
    status: 'ONGOING',
    start_at: '2024-06-01T11:00:00Z',
    end_at: '2024-06-30T16:00:00Z',
    current_headcount: 7,
    max_headcount: 10,
    is_leader: false,
    lectures: [
      {
        id: 5,
        title: '딥러닝 기초',
        instructor: '윤AI',
      },
      {
        id: 6,
        title: '모델 최적화 기법',
        instructor: '장최적화',
      },
    ],
    profile_img_url: '../images/IMG-206.png',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'Flutter 앱 개발 스터디',
    status: 'ONGOING',
    start_at: '2024-07-01T09:30:00Z',
    end_at: '2024-07-31T18:30:00Z',
    current_headcount: 5,
    max_headcount: 10,
    is_leader: true,
    lectures: [
      {
        id: 7,
        title: 'Flutter 기본 위젯과 레이아웃',
        instructor: '서모바일',
      },
      {
        id: 8,
        title: '상태 관리와 네트워킹',
        instructor: '김앱개발',
      },
    ],
    profile_img_url: '../images/IMG-287.png',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'SQL 데이터베이스 스터디',
    status: 'ONGOING',
    start_at: '2024-08-01T10:30:00Z',
    end_at: '2024-08-31T17:30:00Z',
    current_headcount: 6,
    max_headcount: 10,
    is_leader: false,
    lectures: [
      {
        id: 9,
        title: 'SQL 기본 문법',
        instructor: '이DB',
      },
      {
        id: 10,
        title: '고급 쿼리 작성법',
        instructor: '박쿼리',
      },
    ],
    profile_img_url: '../images/IMG-363.png',
  },

  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'Node.js 백엔드 개발반',
    status: 'ENDED',
    start_at: '2024-03-01T09:00:00Z',
    end_at: '2024-03-31T18:00:00Z',
    current_headcount: 4,
    max_headcount: 6,
    is_leader: true,
    lectures: [
      {
        id: 11,
        title: 'Node.js 기본과 Express',
        instructor: '정백엔드',
      },
      {
        id: 12,
        title: '데이터베이스 연동',
        instructor: '최DB',
      },
    ],
    profile_img_url: '/images/node-study.jpg',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'Vue.js 마스터 스터디',
    status: 'ENDED',
    start_at: '2024-02-01T10:00:00Z',
    end_at: '2024-02-28T17:00:00Z',
    current_headcount: 5,
    max_headcount: 6,
    is_leader: false,
    lectures: [
      {
        id: 13,
        title: 'Vue 기본과 컴포넌트',
        instructor: '오뷰',
      },
      {
        id: 14,
        title: 'Vuex와 라우터',
        instructor: '신상태관리',
      },
    ],
    profile_img_url: '/images/vue-study.jpg',
  },
  {
    id: '57c71ffc-1a31-484f-8807-8fb985f63e7b',
    name: 'TypeScript 심화 스터디',
    status: 'ENDED',
    start_at: '2024-01-01T11:00:00Z',
    end_at: '2024-01-31T16:00:00Z',
    current_headcount: 5,
    max_headcount: 6,
    is_leader: true,
    lectures: [
      {
        id: 15,
        title: 'TypeScript 기본 문법',
        instructor: '김타입',
      },
      {
        id: 16,
        title: '고급 타입과 유틸리티 타입',
        instructor: '이고급',
      },
    ],
    profile_img_url: '/images/ts-study.jpg',
  },
]
