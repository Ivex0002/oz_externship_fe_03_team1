import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'

interface RecordBreadcrumbProps {
  current: '작성' | '상세'
}

export default function RecordBreadcrumb({ current }: RecordBreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500">
      <Link to="/" className="hover:text-gray-700">
        홈
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link to="/study-groups" className="hover:text-gray-700">
        스터디 그룹
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link to="/study-groups/1" className="hover:text-gray-700">
        스터디 상세
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <span className="font-medium text-gray-800">기록 {current}</span>
    </nav>
  )
}
