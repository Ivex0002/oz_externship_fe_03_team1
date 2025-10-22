type Lecture = {
    id: number;
    title: string;
    instructor: string;
  }

export type StudyGroup = {
  id: number;
  name: string;
  current_headcount: number;
  max_headcount: number;
  is_leader: boolean;
  profile_img_url: string;
  start_at: string;
  end_at: string;
  status: string;
  lectures: Lecture[]; 
}
