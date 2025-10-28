import NavbarLayout from "@/components/navBar/NavBar";
import StudyGroupDetail from "@/pages/StudyGroupDetail";


// // 검색결과컴포넌트용 임포트
// import { NoStudyFound } from "@/components/SearchStudy/NoStudyFound";

function TestD() {
  return (
    // 스터디그룹 상세 페이지
    <div>
      
      {/* 스터디 상세 페이지 컴포넌트 */}
      <StudyGroupDetail />
      {/* 상단 네비게이션 바 */}
      <NavbarLayout />

    </div>

    // // 검색결과컴포넌트 확인용
    // <div>
    //   <NavbarLayout />
      
    //   {/* 진행중인 스터디가 없을 때 */}
    //   <NoStudyFound type="active" />
      
    //   {/* 완료된 스터디가 없을 때 */}
    //   <NoStudyFound type="completed" />
    // </div>
  )
}

export default TestD;