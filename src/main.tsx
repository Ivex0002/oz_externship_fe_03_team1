import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import App from './App'
import TestD from './test/TestD'
import TestE from './test/TestE'
import TestG from './test/TestG'
import TestH from './test/TestH'
import TestY from './test/TestY'
import BasicModal from './components/basicComponents/basicModal/BasicModal'
import ReviewPostingModal from './components/modal/reviewPosting/ReviewPostingModal'
import DatePickerModal from './components/modal/datePicker/DatePickerModal'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [],
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
      },
      {
        path: '/modal/date_picker',
        Component: DatePickerModal,
      },
      {
        path: '/modal/choosing_lecture',
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
