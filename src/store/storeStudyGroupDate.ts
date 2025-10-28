import { create } from 'zustand'

interface StoreStudyGroupDate {
  previousStartDate: Date | null
  newStartDate: Date | null
  previousEndDate: Date | null
  newEndDate: Date | null

  isEditStartDate: boolean
  isEditEndDate: boolean

  setPreviousStartDate: (date: Date | null) => void
  setNewStartDate: (date: Date | null) => void
  setPreviousEndDate: (date: Date | null) => void
  setNewEndDate: (date: Date | null) => void
  setIsEditStartDate: (isEdit: boolean) => void
  setIsEditEndDate: (isEdit: boolean) => void
  clearDates: () => void
}

export const storeStudyGroupDate = create<StoreStudyGroupDate>((set) => ({
  previousStartDate: null,
  newStartDate: null,
  previousEndDate: null,
  newEndDate: null,

  isEditStartDate: false,
  isEditEndDate: false,

  setPreviousStartDate: (date: Date | null) => set({ previousStartDate: date }),
  setNewStartDate: (date: Date | null) =>
    set({ newStartDate: date, previousStartDate: date }),
  setPreviousEndDate: (date: Date | null) => set({ previousEndDate: date }),
  setNewEndDate: (date: Date | null) =>
    set({ newEndDate: date, previousEndDate: date }),
  setIsEditStartDate: (isEdit: boolean) => set({ isEditStartDate: isEdit }),
  setIsEditEndDate: (isEdit: boolean) => set({ isEditEndDate: isEdit }),

  clearDates: () =>
    set({
      previousStartDate: null,
      newStartDate: null,
      previousEndDate: null,
      newEndDate: null,
      isEditStartDate: false,
      isEditEndDate: false,
    }),
}))
