import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'

interface RepresentativeImgPresignedUrlRequestBody {
  files: {
    file_name: string
    content_type: string
    file_size: number
  }[]
}

export const usePresignedUrlMutations = () => {
  const presignedUrl = useMutation({
    mutationFn: (requestBody: RepresentativeImgPresignedUrlRequestBody) => {
      return api.v1.studies.groups.presigned$url.POST(requestBody)
    },
  })

  return { presignedUrl }
}
