import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
// import App from './App'
import TestD from './test/TestD'
import TestE from './test/TestE'
import TestG from './test/TestG'
import TestH from './test/TestH'
import TestY from './test/TestY'
import BasicModal from './components/basicComponents/basicModal/BasicModal'
import ReviewPostingModal from './components/modal/reviewPosting/ReviewPostingModal'
import DatePickerModal from './components/modal/datePicker/DatePickerModal'
import TestModal from './test/TestModal'
<<<<<<< HEAD
import ReviewDetailModal from './components/modal/reviewDetail/ReviewDetailModal'
<<<<<<< HEAD
import LectureChoosingModal from './components/modal/lectureChoosing/LectureChoosingModal'
=======
=======
import NavbarLayout from './components/navBar/NavBar'
>>>>>>> d215f47 (feat : 이전과 동일)
>>>>>>> 6a0770b (feat : rebase 충돌 해결)

const router = createBrowserRouter([
  {
    path: '/',
    Component: <NavbarLayout />,
    children: [
      {
        path: '/testModal',
        Component: TestModal,
      },
      {
        path: '/modal',
        Component: BasicModal,
        children: [
          {
            path: '/modal/review_posting',
            loader: () => {},
            Component: ReviewPostingModal,
          },
          {
            path: '/modal/review_detail',
            loader: () => {},
            Component: ReviewDetailModal,
          },
          {
            path: '/modal/date_picker',
            Component: DatePickerModal,
          },
          {
            path: '/modal/choosing_lecture',
            loader: () => {},
            Component: LectureChoosingModal,
          },
        ],
      },
    ],
  },

  {
    path: '/testD',
    Component: TestD,
  },
  {
    path: '/testE',
    Component: TestE,
  },
  {
    path: '/testG',
    Component: TestG,
  },
  {
    path: '/testH',
    Component: TestH,
  },
  {
    path: '/testY',
    Component: TestY,
  },
])

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(<RouterProvider router={router} />)
