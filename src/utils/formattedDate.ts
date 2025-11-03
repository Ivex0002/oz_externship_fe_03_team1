export const formattedReviewUpdatedDate = (reviewUpdatedDate: string) => {
  const updatedDate = new Date(reviewUpdatedDate)
  const year = updatedDate.getFullYear()
  const month = updatedDate.getMonth() + 1
  const date = updatedDate.getDate()
  const hour =
    updatedDate.getHours() > 12
      ? `오후 ${updatedDate.getHours() - 12}`
      : `오전 ${updatedDate.getHours()}`
  const minute = updatedDate.getMinutes()
  const time = `${hour}:${minute}`

  const formattedUpdatedDate = `${year}. ${month}. ${date} ${time}`

  return formattedUpdatedDate
}
