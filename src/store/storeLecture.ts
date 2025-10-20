import type { Lecture } from '@/types/Lecture'
import { create } from 'zustand'

interface StoreLecture {
  selectedLectureList: Lecture[]

  addToSelectedLectureList: (lecture: Lecture) => void
  deleteFromSelectedLectureList: (lecture: Lecture) => void
  clearSelectedLectureList: () => void
}

export const storeLecture = create<StoreLecture>((set) => ({
  selectedLectureList: [],

  addToSelectedLectureList: (lecture) =>
    set((prev) => ({
      selectedLectureList: [...prev.selectedLectureList, lecture],
    })),

  deleteFromSelectedLectureList: (lecture) =>
    set((prev) => ({
      selectedLectureList: prev.selectedLectureList.filter(
        (lec) => lecture.id !== lec.id
      ),
    })),

  clearSelectedLectureList: () => set({ selectedLectureList: [] }),
}))
