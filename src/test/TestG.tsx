import NavbarLayout from '@/components/navBar/NavBar'
import { Route, Routes } from 'react-router'

function TestG() {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout />}></Route>
    </Routes>
  )
}

export default TestG
