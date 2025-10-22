import NavbarLayout from "@/components/navBar/NavBar";
import { NoStudyFound } from "@/components/SearchStudy/NoStudyFound";

function TestD() {
  return (
    <div>
      <NavbarLayout />
        <NoStudyFound type="active" />
        <NoStudyFound type="completed" />
    </div>
  )
}

export default TestD;
