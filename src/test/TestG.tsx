import NavbarLayout from '@/components/navBar/NavBar'
import { useModal } from '@/hooks/useModal'
import { Route, Routes } from 'react-router'

function TestG() {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout />}>
        <Route path="/" element={<ModalTestBtns />} />
      </Route>
    </Routes>
  )
}

export default TestG

const routeArr = [
  { path: '/modal/review_posting', title: 'review_posting' },
  { path: '/modal/review_detail', title: 'review_detail' },
  { path: '/modal/date_picker', title: 'date_picker' },
  { path: '/modal/choosing_lecture', title: 'choosing_lecture' },
]

function ModalTestBtns() {
  const { openModal } = useModal()
  return (
    <>
      {routeArr.map((el) => (
        <button key={el.path} onClick={() => openModal(el.path, el.title)} />
      ))}
    </>
  )
}
