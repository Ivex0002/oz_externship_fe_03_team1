import NavbarLayout from "@/components/navBar/NavBar";
import { StudyGroupDetail } from "@/pages/StudyGroupDetail";


// // 검색결과컴포넌트용 임포트
// import { NoStudyFound } from "@/components/SearchStudy/NoStudyFound";

function TestD() {
  return (
    <div>
          <StudyGroupDetail />
        <NavbarLayout />
    </div>
  );
}

export default TestD;

// // 검색결과컴포넌트 확인용
// <div>
//   <NavbarLayout />
  
//   {/* 진행중인 스터디가 없을 때 */}
//   <NoStudiesResult type="active" />
  
//   {/* 완료된 스터디가 없을 때 */}
//   <NoStudiesResult type="completed" />
// </div>