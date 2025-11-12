function TestH() {
  const error = {
    message: 'error message',
  }
  return (
    <>
      <div
        className={
          'text-danger-800 border-danger-100 my-5 w-full rounded-lg border-2 p-4.5 text-center'
        }
      >
        {error.message}
      </div>
      <div
        className={
          'w-full animate-pulse rounded-lg border-2 border-gray-300 p-4.5 text-center'
        }
      >
        강의 목록을 받아오고 있습니다...
      </div>
    </>
  )
}

export default TestH
