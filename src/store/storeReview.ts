import type { Review, ReviewDetailData, ReviewForm } from '@/types/Review'
import { create } from 'zustand'

interface StoreReview {
  reviewData: ReviewDetailData
  previousMyReview: ReviewForm
  newReview: ReviewForm

  isEditReview: boolean

  setReviewData: (reviewData: ReviewDetailData) => void
  setPreviousMyReview: (schedule: Review) => void
  setNewReview: (schedule: Review) => void
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
  reviewData: initialReviewData,
  previousMyReview: initialReview,
  newReview: initialReview,

  isEditReview: false,

  setReviewData: (reviewData: ReviewDetailData) =>
    set({ reviewData: reviewData }),

  setPreviousMyReview: (review: Review) =>
    set({ previousMyReview: review, isEditReview: true }),

  setNewReview: (review: Review) => set({ newReview: review }),

  setIsEditReview: (isEdit: boolean) => set({ isEditReview: isEdit }),

  clearReviews: () =>
    set({
      reviewData: initialReviewData,
      previousMyReview: initialReview,
      newReview: initialReview,
      isEditReview: false,
    }),
}))
