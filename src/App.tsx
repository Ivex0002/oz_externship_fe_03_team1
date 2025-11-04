import './App.css'
import './font.css'
import { NavbarLayout } from './components/navBar/NavBar'
import { BasicModal } from './components/basicComponents/basicModal/BasicModal'

export const App = () => {
  return (
    <>
      <NavbarLayout />
      <BasicModal />
    </>
  )
}
