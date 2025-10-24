import type { Schedule } from '@/types/Schedule'
import { create } from 'zustand'

interface StoreSchedule {
  previousSchedule: Schedule
  newSchedule: Schedule

  setPreviousSchedule: (schedule: Schedule) => void
  setNewSchedule: (schedule: Schedule) => void
  clearSchedules: () => void
}

const initialSchedule: Schedule = {
  id: 0,
  title: '',
  goal: '',
  date: '',
  startTime: '',
  endTime: '',
  participants: [],
}

export const storeSchedule = create<StoreSchedule>((set) => ({
  previousSchedule: initialSchedule,
  newSchedule: initialSchedule,

  setPreviousSchedule: (schedule: Schedule) =>
    set({ previousSchedule: schedule }),

  setNewSchedule: (schedule: Schedule) => set({ newSchedule: schedule }),

  clearSchedules: () =>
    set({ previousSchedule: initialSchedule, newSchedule: initialSchedule }),
}))
