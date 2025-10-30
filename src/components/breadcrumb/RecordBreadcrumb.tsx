import { Link, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'

export interface RecordBreadcrumbProps {
  current: '작성' | '상세'
  homeTo?: string
  groupsTo?: string
}

export const RecordBreadcrumb = ({
  current,
  homeTo = '/',
  groupsTo = '/study-groups',
}: RecordBreadcrumbProps) => {
  const { id, groupId } = useParams() as { id?: string; groupId?: string }
  const resolvedGroupId = groupId ?? id ?? '1'

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 flex items-center text-sm text-gray-500"
    >
      <Link to={homeTo} className="hover:text-gray-700">
        홈
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link to={groupsTo} className="hover:text-gray-700">
        스터디 그룹
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link
        to={`/study_group/${resolvedGroupId}`}
        className="hover:text-gray-700"
      >
        스터디 상세
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <span className="font-medium text-gray-800">기록 {current}</span>
    </nav>
  )
}
