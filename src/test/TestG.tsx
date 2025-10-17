import { Route, Routes } from 'react-router'
import NavbarLayout from '../components/navBar/NavBar'

function TestG() {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout />}></Route>
    </Routes>
  )
}

export default TestG
