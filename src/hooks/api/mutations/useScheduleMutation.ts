import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks//api/queryKeys'
import { queryClient } from '../queryClient'
import { api } from '@/api/api'
import { toast } from 'react-toastify'

interface PostScheduleParams {
  title: FormDataEntryValue
  objective: FormDataEntryValue
  session_date: FormDataEntryValue
  start_time: FormDataEntryValue
  end_time: FormDataEntryValue
  participants: FormDataEntryValue[]
}

interface PatchScheduleParams {
  scheduleId: string
  title?: FormDataEntryValue
  objective?: FormDataEntryValue
  session_date?: FormDataEntryValue
  start_time?: FormDataEntryValue
  end_time?: FormDataEntryValue
  participants?: FormDataEntryValue[]
}

export const useScheduleMutation = (studyGroupId: string) => {
  const postSchedule = useMutation({
    mutationFn: (params: PostScheduleParams) => {
      const requestBody = {
        study_group: studyGroupId,
        title: params.title,
        objective: params.objective,
        session_date: params.session_date,
        start_time: params.start_time,
        end_time: params.end_time,
        participants: params.participants,
      }
      return api.v1.studies.schedules.POST(requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.schedules(studyGroupId),
      })
    },
    onError: (error) => {
      toast.error(`일정 등록에 실패했습니다: ${(error as Error).message}`)
    },
  })

  const patchSchedule = useMutation({
    mutationFn: (params: PatchScheduleParams) => {
      const requestBody = {
        study_group: studyGroupId,
        title: params.title,
        objective: params.objective,
        session_date: params.session_date,
        start_time: params.start_time,
        end_time: params.end_time,
      }
      return api.v1.studies.schedules(params.scheduleId).PATCH(requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.schedules(studyGroupId),
      })
      toast.success('일정이 성공적으로 수정되었습니다.')
    },
    onError: (error) => {
      toast.error(`일정 수정에 실패했습니다: ${(error as Error).message}`)
    },
  })

  return {
    postSchedule,
    patchSchedule,
  }
}
