import type { ScheduleDetail } from '@/types/Schedule'
import { create } from 'zustand'

interface StoreSchedule {
  previousSchedule: ScheduleDetail
  newSchedule: ScheduleDetail

  isEdit: boolean

  setPreviousSchedule: (schedule: ScheduleDetail) => void
  setNewSchedule: (schedule: ScheduleDetail) => void
  setIsEdit: (isEdit: boolean) => void
  clearSchedules: () => void
}

const initialSchedule: ScheduleDetail = {
  title: '',
  objective: '',
  session_date: '',
  start_time: '',
  end_time: '',
  participants: [],
}

export const storeSchedule = create<StoreSchedule>((set) => ({
  previousSchedule: initialSchedule,
  newSchedule: initialSchedule,

  isEdit: false,

  setPreviousSchedule: (schedule: ScheduleDetail) =>
    set({ previousSchedule: schedule }),

  setNewSchedule: (schedule: ScheduleDetail) => set({ newSchedule: schedule }),

  setIsEdit: (isEdit: boolean) => set({ isEdit }),

  clearSchedules: () =>
    set({
      previousSchedule: initialSchedule,
      newSchedule: initialSchedule,
      isEdit: false,
    }),
}))
