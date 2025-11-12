import type { Review, ReviewApiResponse, ReviewForm } from '@/types/Review'
import { create } from 'zustand'

type BasicStudyInfo = {
  id: string
  name: string
  start_at: string
  end_at: string
} | null

interface StoreReview {
  basicStudyInfo: BasicStudyInfo
  reviewData: ReviewApiResponse
  previousMyReview: Review
  newReview: ReviewForm

  isEditReview: boolean

  setBasicStudyInfo: (studyInfo: BasicStudyInfo) => void
  setReviewData: (reviewData: ReviewApiResponse) => void
  setPreviousMyReview: (review: Review, studyInfo: BasicStudyInfo) => void
  setNewReview: (review: ReviewForm) => void
  setIsEditReview: (isEdit: boolean) => void
  clearReviews: () => void
}

const initialReview: Review = {
  id: '',
  isMine: false,
  rating: 0,
  content: '',
  created_at: '',
  updated_at: '',
}

const initialReviewForm: ReviewForm = {
  content: '',
  star_rating: 0,
}

const initialReviewData: ReviewApiResponse = {
  count: 0,
  meta: {
    avg_rating: 0,
    count_total: 0,
    group_id: '',
    histogram: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  },
  next: null,
  previous: null,
  results: [],
}

export const storeReview = create<StoreReview>((set) => ({
  basicStudyInfo: null,
  reviewData: initialReviewData,
  previousMyReview: initialReview,
  newReview: initialReviewForm,

  isEditReview: false,

  setBasicStudyInfo: (studyInfo: BasicStudyInfo) =>
    set({ basicStudyInfo: studyInfo }),

  setReviewData: (reviewData: ReviewApiResponse) =>
    set({ reviewData: reviewData }),

  setPreviousMyReview: (review: Review, studyInfo: BasicStudyInfo) =>
    set({
      previousMyReview: review,
      isEditReview: true,
      basicStudyInfo: studyInfo,
    }),

  setNewReview: (review: ReviewForm) => set({ newReview: review }),

  setIsEditReview: (isEdit: boolean) => set({ isEditReview: isEdit }),

  clearReviews: () =>
    set({
      basicStudyInfo: null,
      reviewData: initialReviewData,
      previousMyReview: initialReview,
      newReview: initialReviewForm,
      isEditReview: false,
    }),
}))
