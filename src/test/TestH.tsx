import ReviewPostingModal from '../components/modal/reviewPosting/ReviewPostingModal'

function TestH() {
  const studyGroup = {
    id: 1,
    title: 'react study',
    description: 'react로 자기소개 페이지를 만들어보자.',
    startDate: `${new Date().toISOString()}`,
    endDate: `${new Date(2025, 9, 31).toISOString()}`,
  }
  return (
    <div>
      <ReviewPostingModal studyGroup={studyGroup} />
    </div>
  )
}

export default TestH
