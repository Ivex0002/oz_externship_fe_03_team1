import type { Schedule } from '@/types/Schedule'
import { create } from 'zustand'

interface StoreSchedule {
  previousSchedule: Schedule
  newSchedule: Schedule

  isEdit: boolean

  setPreviousSchedule: (schedule: Schedule) => void
  setNewSchedule: (schedule: Schedule) => void
  setIsEdit: (isEdit: boolean) => void
  clearSchedules: () => void
}

const initialSchedule: Schedule = {
  title: '',
  objective: '',
  session_date: '',
  start_time: '',
  end_time: '',
  schedule_members: [],
}

export const storeSchedule = create<StoreSchedule>((set) => ({
  previousSchedule: initialSchedule,
  newSchedule: initialSchedule,

  isEdit: false,

  setPreviousSchedule: (schedule: Schedule) =>
    set({ previousSchedule: schedule }),

  setNewSchedule: (schedule: Schedule) => set({ newSchedule: schedule }),

  setIsEdit: (isEdit: boolean) => set({ isEdit }),

  clearSchedules: () =>
    set({
      previousSchedule: initialSchedule,
      newSchedule: initialSchedule,
      isEdit: false,
    }),
}))
