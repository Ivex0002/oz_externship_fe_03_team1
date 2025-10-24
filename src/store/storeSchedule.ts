import type { Schedule } from '@/types/Schedule'
import { create } from 'zustand'

interface StoreSchedule {
  previousSchedule: Schedule | null

  setPreviousSchedule: (schedule: Schedule) => void
  clearSchedules: () => void
}

export const storeSchedule = create<StoreSchedule>((set) => ({
  previousSchedule: null,
  newSchedule: null,

  setPreviousSchedule: (schedule: Schedule) =>
    set({ previousSchedule: schedule }),

  clearSchedules: () => set({ previousSchedule: null }),
}))
