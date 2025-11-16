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
      const res = api.v1.studies.groups.presigned$url.POST(requestBody)
      console.log(res)
      return res
    },

    // onSuccess: (data) => {
    //   const { file_name, file_urls } = data
    //   const res=axios.put(file_urls[0].presigned_url, {
    // },
    // onError: (error) => {
    //   console.error('리더 위임 실패:', error) //실제 에러로직 필요
    // },
  })

  return { presignedUrl }
}
