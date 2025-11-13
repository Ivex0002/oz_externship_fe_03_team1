import { Link, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'

interface RecordBreadcrumbProps {
  current: '작성' | '상세' | '수정'
  homeTo?: string
  groupsTo?: string
}

interface StudyParams {
  id?: string
  groupId?: string
}

const DEFAULT_HOME = 'https://account.ozcoding.site/'
const DEFAULT_GROUPS = '/'

export const RecordBreadcrumb = ({
  current,
  homeTo = DEFAULT_HOME,
  groupsTo = DEFAULT_GROUPS,
}: RecordBreadcrumbProps) => {
  const { id, groupId } = useParams() as StudyParams
  const resolvedGroupId = groupId ?? id ?? '1'

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 flex items-center gap-2 text-sm text-gray-500"
    >
      <a
        href={homeTo}
        className="hover:text-gray-700"
        target="_self"
        rel="noopener noreferrer"
      >
        홈
      </a>

      <ChevronRight size={16} />

      <Link to={groupsTo} className="hover:text-gray-700">
        스터디 그룹
      </Link>
      <ChevronRight size={16} />

      <Link
        to={`/study_group/${resolvedGroupId}`}
        className="hover:text-gray-700"
      >
        스터디 상세
      </Link>
      <ChevronRight size={16} />

      <span className="font-medium text-gray-800">기록 {current}</span>
    </nav>
  )
}
