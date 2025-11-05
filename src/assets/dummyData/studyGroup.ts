import type { StudyGroup } from '@/types/StudyGroupTypes'

export const studyGroup: StudyGroup = {
  id: '1',
  name: 'string',
  profile_img_url: 'string',
  current_headcount: 5,
  max_headcount: 10,
  status: 'PENDING',
  is_leader: false,
  start_at: '2025-10-16T13:29:17.588Z',
  end_at: '2025-10-16T13:29:17.588Z',
  lectures: [
    {
      id: 1,
      title: 'React 기초 다지기',
      instructor: '박개발',
    },
  ],
}
