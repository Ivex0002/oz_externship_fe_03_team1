import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { App } from './App'
import TestD from './test/TestD'
import TestE from './test/TestE'
import TestG from './test/TestG'
import TestH from './test/TestH'
import TestY from './test/TestY'
import { BasicModal } from './components/basicComponents/basicModal/BasicModal'
import { ReviewModal } from './components/modal/review/ReviewModal'
import { DatePickerModal } from './components/modal/datePicker/DatePickerModal'
import TestModal from './test/TestModal'
import { ReviewDetailModal } from './components/modal/reviewDetail/ReviewDetailModal'
import { LectureChoosingModal } from './components/modal/lectureChoosing/LectureChoosingModal'
import { ScheduleModal } from './components/modal/schedule/ScheduleModal'
import { DetailScheduleModal } from './components/modal/detailSchedule/DetailScheduleModal'
import { StudyGroup } from './pages/StudyGroup'
import { CreateStudyGroup } from './pages/study-groups/CreateStudyGroup'
import { StudyGroupDetail } from './pages/StudyGroupDetail'
import { StudyRecord } from './pages/study-groups/StudyRecord/StudyRecord'
import { StudyRecordDetail } from './pages/study-records/StudyRecordDetail'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: StudyGroup,
      },
      {
        path: '/create_study_group',
        Component: CreateStudyGroup,
      },
      {
        path: '/edit_study_group/:studyGroupId',
        Component: CreateStudyGroup,
      },
      {
        path: '/study_group_detail/:studyGroupId',
        Component: StudyGroupDetail,
      },
      {
        path: '/create_study_record/:studyGroupId',
        Component: StudyRecord,
      },
      {
        path: '/edit_study_record/:studyGroupId/:studyRecordId',
        Component: StudyRecord,
      },
      {
        path: '/study_record_detail/:studyGroupId/:studyRecordId',
        Component: StudyRecordDetail,
      },
      {
        path: '/modal',
        Component: BasicModal,
        children: [
          {
            path: '/modal/post_review/:studyGroupId',
            loader: () => {},
            Component: ReviewModal,
          },
          {
            path: '/modal/edit_review/:studyGroupId/:reviewId',
            loader: () => {},
            Component: ReviewModal,
          },
          {
            path: '/modal/review_detail/:studyGroupId',
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
          {
            path: '/modal/add_schedule/:studyGroupId',
            Component: ScheduleModal,
          },
          {
            path: '/modal/edit_schedule/:studyGroupId/:scheduleId',
            Component: ScheduleModal,
          },
          {
            path: '/modal/schedule_detail/:studyGroupId/:scheduleId',
            Component: DetailScheduleModal,
          },
        ],
      },
      {
        path: '/testModal',
        Component: TestModal,
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
