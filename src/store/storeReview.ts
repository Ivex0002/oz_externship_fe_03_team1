import type { Review, ReviewDetailData, ReviewForm } from '@/types/Review'
import { create } from 'zustand'

type BasicStudyInfo = {
  id: string
  name: string
  start_at: string
  end_at: string
} | null

interface StoreReview {
  basicStudyInfo: BasicStudyInfo
  reviewData: ReviewDetailData
  previousMyReview: ReviewForm
  newReview: ReviewForm

  isEditReview: boolean

  setBasicStudyInfo: (studyInfo: BasicStudyInfo) => void
  setReviewData: (reviewData: ReviewDetailData) => void
  setPreviousMyReview: (review: Review, studyInfo: BasicStudyInfo) => void
  setNewReview: (review: Review) => void
  setIsEditReview: (isEdit: boolean) => void
  clearReviews: () => void
}

const initialReview: ReviewForm = {
  content: '',
  star_rating: 0,
}

const initialReviewData: ReviewDetailData = {
  count: 0,
  averageRating: 0,
  next: null,
  previous: null,
  results: [],
}

export const storeReview = create<StoreReview>((set) => ({
  basicStudyInfo: null,
  reviewData: initialReviewData,
  previousMyReview: initialReview,
  newReview: initialReview,

  isEditReview: false,

  setBasicStudyInfo: (studyInfo: BasicStudyInfo) =>
    set({ basicStudyInfo: studyInfo }),

  setReviewData: (reviewData: ReviewDetailData) =>
    set({ reviewData: reviewData }),

  setPreviousMyReview: (review: Review, studyInfo: BasicStudyInfo) =>
    set({
      previousMyReview: review,
      isEditReview: true,
      basicStudyInfo: studyInfo,
    }),

  setNewReview: (review: Review) => set({ newReview: review }),

  setIsEditReview: (isEdit: boolean) => set({ isEditReview: isEdit }),

  clearReviews: () =>
    set({
      basicStudyInfo: null,
      reviewData: initialReviewData,
      previousMyReview: initialReview,
      newReview: initialReview,
      isEditReview: false,
    }),
}))
