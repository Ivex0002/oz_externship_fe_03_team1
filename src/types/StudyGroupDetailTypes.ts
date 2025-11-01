export interface Member {
  id: number;
  nickname: string;
  is_leader: boolean;
}

export interface LectureDetail {
  thumbnail_img_url: string;
  title: string;
  instructor: string;
  url_link: string;
}

export interface StudyGroupDetail {
  id: number;
  name: string;
  current_headcount: number;
  max_headcount: number;
  members: Member[];
  profile_img_url: string;
  start_at: string;
  end_at: string;
  status: 'ONGOING' | 'PENDING' | 'ENDED';
  lectures: LectureDetail[];
}

export interface StudyGroupDetailApiResponse {
  data: StudyGroupDetail;
}