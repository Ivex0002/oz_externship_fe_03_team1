import type { Review } from '@/types/Review'
import { create } from 'zustand'

interface StoreReview {
  reviewList: Review[]
  previousMyReview: Review
  newReview: Review

  isEdit: boolean

  setReviewList: (reviews: Review[]) => void
  setPreviousMyReview: (schedule: Review) => void
  setNewReview: (schedule: Review) => void
  setIsEdit: (isEdit: boolean) => void
  clearReviews: () => void
}

const initialReview: Review = {
  content: '',
  star_rating: 0,
}

export const storeReview = create<StoreReview>((set) => ({
  reviewList: [],
  previousMyReview: initialReview,
  newReview: initialReview,

  isEdit: false,

  setReviewList: (reviews: Review[]) => set({ reviewList: reviews }),

  setPreviousMyReview: (review: Review) => set({ previousMyReview: review }),

  setNewReview: (review: Review) => set({ newReview: review }),

  setIsEdit: (isEdit: boolean) => set({ isEdit }),

  clearReviews: () =>
    set({
      reviewList: [],
      previousMyReview: initialReview,
      newReview: initialReview,
      isEdit: false,
    }),
}))
