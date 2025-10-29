import type { Lecture } from '@/types/Lecture'
import { create } from 'zustand'

interface StoreLecture {
  previousLectureList: Lecture[]
  selectedLectureList: Lecture[]

  setPreviousLectureList: (lectureList: Lecture[]) => void
  setSelectedLectureList: (lectureList: Lecture[]) => void
  addToSelectedLectureList: (lecture: Lecture) => void
  deleteFromSelectedLectureList: (lecture: Lecture) => void
  clearSelectedLectureList: () => void
}

export const storeLecture = create<StoreLecture>((set) => ({
  previousLectureList: [],
  selectedLectureList: [],

  setPreviousLectureList: (lectureList) =>
    set({ previousLectureList: lectureList }),

  setSelectedLectureList: (lectureList) =>
    set({ selectedLectureList: lectureList }),

  addToSelectedLectureList: (lecture) =>
    set((prev) =>
      prev.selectedLectureList.find((lec) => lec.uuid === lecture.uuid)
        ? { selectedLectureList: [...prev.selectedLectureList] }
        : { selectedLectureList: [...prev.selectedLectureList, lecture] }
    ),

  deleteFromSelectedLectureList: (lecture) =>
    set((prev) => ({
      selectedLectureList: prev.selectedLectureList.filter(
        (lec) => lecture.uuid !== lec.uuid
      ),
    })),

  clearSelectedLectureList: () => set({ selectedLectureList: [] }),
}))
