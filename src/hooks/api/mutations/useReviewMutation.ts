import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks//api/queryKeys'
import { queryClient } from '../queryClient'
import { api } from '@/api/api'
import { toast } from 'react-toastify'

interface PostReviewParams {
  content: string
  rating: number
}

interface PatchReviewParams {
  reviewId: string
  content?: string
  rating?: number
}

export const useReviewMutation = (studyGroupId: string) => {
  const postReview = useMutation({
    mutationFn: (params: PostReviewParams) => {
      const requestBody = {
        content: params.content,
        star_rating: params.rating,
      }
      return api.v1.studies.groups(studyGroupId).reviews.POST(requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.reviews(studyGroupId),
      })
    },
    onError: (error) => {
      toast.error(`리뷰 작성에 실패했습니다: ${(error as Error).message}`)
    },
  })

  const patchReview = useMutation({
    mutationFn: (params: PatchReviewParams) => {
      const requestBody = {
        content: params.content,
        star_rating: params.rating,
      }
      return api.v1.studies
        .groups(studyGroupId)
        .reviews(params.reviewId)
        .PATCH(requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.reviews(studyGroupId),
      })
      toast.success('리뷰가 성공적으로 수정되었습니다.')
    },
    onError: (error) => {
      toast.error(`리뷰 수정에 실패했습니다: ${(error as Error).message}`)
    },
  })

  return {
    postReview,
    patchReview,
  }
}
