import type { LectureDetail } from '@/types/StudyGroupDetailTypes';
import { SquareArrowOutUpRight } from 'lucide-react';

interface StudyInfoAndCoursesProps {
    formattedInfo: FormattedInfo;
    lectures: LectureDetail[];
};
export interface FormattedInfo {
    startDate: string
    endDate: string
    statusText: string
    memberCount: string
  };
// export const StudyInfoAndCourses = ({ studyGroup }: StudyInfoAndCoursesProps) => {
export const StudyInfoAndCourses = ({
  formattedInfo,
  lectures
}: StudyInfoAndCoursesProps) =>{

  const handleLectureClick = (urlLink: string) => {
    if (urlLink && urlLink !== '#') {
      window.open(urlLink, '_blank');
    }
  };

  return (
    <>
      {/* 스터디 정보 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 정보</h2>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">인원</span>
            <span className="text-gray-900">
              {formattedInfo.memberCount}명
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">시작일</span>
            <span className="text-gray-900">{formattedInfo.startDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">종료일</span>
            <span className="text-gray-900">{formattedInfo.endDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">상태</span>
            <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
              {formattedInfo.statusText}
            </span>
          </div>
        </div>
      </div>

      {/* 스터디 강의 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-5 text-gray-900">스터디 강의</h2>

        <div
          className="
            overflow-y-auto 
            space-y-6 
            h-[620px] 
            [&::-webkit-scrollbar]:hidden
          "
        >
          {lectures.map((lecture, index) => (
            <div
              key={index}
              className="
                border border-gray-200 
                rounded-2xl 
                overflow-hidden 
                shadow-sm 
                hover:shadow-md 
                transition-all 
                bg-white
              "
            >
              {/* 강의 이미지 */}
              <div className="relative w-full aspect-video">
                <img
                  src={lecture.thumbnail_img_url}
                  alt={lecture.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 강의 정보 */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1">
                  {lecture.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{lecture.instructor}</p>

                <button
                  className="text-primary-600 font-semibold text-sm flex items-center gap-1 group"
                  onClick={() => handleLectureClick(lecture.url_link || '#')}
                >
                  강의 바로가기
                  <SquareArrowOutUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
