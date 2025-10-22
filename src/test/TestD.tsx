import NavbarLayout from "@/components/navBar/NavBar";
import { NoStudyFound } from "@/components/SearchStudy/NoStudyFound";

function TestD() {
  return (
    <div>
      <NavbarLayout />
      
      {/* 진행중인 스터디가 없을 때 */}
      <NoStudyFound type="active" />
      
      {/* 완료된 스터디가 없을 때 */}
      {/* <NoStudyFound type="completed" /> */}
    </div>
  )
}

export default TestD;