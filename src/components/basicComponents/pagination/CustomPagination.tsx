import ReactPaginate from 'react-paginate'
import { BasicButton } from '../BasicButton/BasicButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  pageCount: number
  onPageChange: (selectedPage: number) => void
  currentPage: number
}

export const CustomPagination = ({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const previousLabel = (
    <BasicButton variant="outline" disabled={currentPage === 0}>
      <ChevronLeft />
    </BasicButton>
  )
  const nextLabel = (
    <BasicButton variant="outline" disabled={currentPage === pageCount - 1}>
      <ChevronRight />
    </BasicButton>
  )

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={nextLabel}
      previousLabel={previousLabel}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={currentPage}
      containerClassName="center-center gap-2 pt-8"
      pageClassName="list-none"
      pageLinkClassName="px-3 py-2.5 text-base text-gray-700 active:bg-gray-100 active:border-gray-400 active:text-gray-900 rounded-lg bg-white border border-gray-300 hover:bg-gray-50"
      activeLinkClassName="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white"
    />
  )
}
