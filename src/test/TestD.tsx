import NavbarLayout from "@/components/navBar/NavBar";
import { ActiveStudies, CompletedStudies } from "@/components/SearchStudy/SearchStudy";

function TestD() {
  return (
    <div>
      <NavbarLayout />
        <ActiveStudies />
        <CompletedStudies />
    </div>
  )
}

export default TestD;
