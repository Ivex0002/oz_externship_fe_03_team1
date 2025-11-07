import { create } from 'zustand'

type DateMode = 'single' | 'range'

interface StoreDatePicker {
  mode: DateMode
  date: Date | null
  startDate: Date | null
  endDate: Date | null

  setMode: (mode: DateMode) => void
  setDate: (d: Date | null) => void
  setStartDate: (d: Date | null) => void
  setEndDate: (d: Date | null) => void
  reset: () => void
}

export const storeDatePicker = create<StoreDatePicker>((set) => ({
  mode: 'range',
  date: null,
  startDate: null,
  endDate: null,

  setMode: (mode) => set({ mode: mode }),

  setDate: (d) => set({ date: d }),

  setStartDate: (d) => set({ startDate: d }),

  setEndDate: (d) => set({ endDate: d }),

  reset: () =>
    set({
      mode: 'range',
      date: null,
      startDate: null,
      endDate: null,
    }),
}))
