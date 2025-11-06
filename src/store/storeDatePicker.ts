import { create } from 'zustand'

type DateMode = 'single' | 'range'

interface StoreDatePicker {
  mode: DateMode
  date: Date | null
  startDate: Date | null
  endDate: Date | null

  isEditingStart: boolean
  isEditingEnd: boolean

  setMode: (mode: DateMode) => void
  setDate: (d: Date | null) => void
  setStartDate: (d: Date | null) => void
  setEndDate: (d: Date | null) => void
  setEditingStart: (b: boolean) => void
  setEditingEnd: (b: boolean) => void
  reset: () => void
}

export const storeDatePicker = create<StoreDatePicker>((set) => ({
  mode: 'range',
  date: null,
  startDate: null,
  endDate: null,
  isEditingStart: false,
  isEditingEnd: false,

  setMode: (mode) =>
    set(() => ({
      mode: mode,
      date: null,
      startDate: null,
      endDate: null,
    })),

  setDate: (d) => set({ date: d }),

  setStartDate: (d) => set({ startDate: d }),

  setEndDate: (d) => set({ endDate: d }),

  setEditingStart: (b) => set({ isEditingStart: b }),

  setEditingEnd: (b) => set({ isEditingEnd: b }),

  reset: () =>
    set({
      mode: 'range',
      date: null,
      startDate: null,
      endDate: null,
      isEditingStart: false,
      isEditingEnd: false,
    }),
}))
