import type { StudyGroupForm } from '../../types/StudyGroupTypes'

export const studyGroupFormMock: StudyGroupForm = {
  name: 'React 완벽 마스터 스터디',
  introduction: '함께 공부하며 성장하는 스터디입니다.',
  start_at: '2025-10-25',
  end_at: '2025-12-30',
  max_headcount: 6,
  lectures: [
    {
      uuid: '',
      thumbnail_img_url: '',
      title: '',
      instructor: '',
      url_link: '',
    },
  ],
  profile_img_url: null,
  status: 'PENDING',
}
