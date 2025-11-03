import type {
  DifficultyEnum,
  PlatformEnum,
  StudyGroupStatus,
} from '@/types/ApiLink'

const createQueryKey = <const T extends readonly unknown[]>(key: T) => key

export const queryKeys = {
  // ==================== Users ====================
  users: {
    me: () => createQueryKey(['users', 'me']),
  },

  // ==================== Notifications ====================
  notifications: {
    all: () => createQueryKey(['notifications']),
    lists: () => createQueryKey(['notifications', 'list']),
    list: (params?: { page?: number; page_size?: number }) =>
      createQueryKey(['notifications', 'list', params]),
  },

  // ==================== Lectures ====================
  lectures: {
    all: () => createQueryKey(['lectures']),
    lists: () => createQueryKey(['lectures', 'list']),
    list: (params?: {
      page?: number
      page_size?: number
      search?: string
      category?: number
      difficulty?: DifficultyEnum
      platform?: PlatformEnum
    }) => createQueryKey(['lectures', 'list', params]),
    categories: () => createQueryKey(['lectures', 'categories']),
    recommended: () => createQueryKey(['lectures', 'recommended']),
  },

  // ==================== Study Groups ====================
  studies: {
    groups: {
      all: () => createQueryKey(['studies', 'groups']),
      lists: () => createQueryKey(['studies', 'groups', 'list']),
      list: (params?: {
        page?: number
        page_size?: number
        status?: StudyGroupStatus
      }) => createQueryKey(['studies', 'groups', 'list', params]),
      details: () => createQueryKey(['studies', 'groups', 'detail']),
      detail: (groupId: number) =>
        createQueryKey(['studies', 'groups', 'detail', groupId]),

      members: (groupId: number) =>
        createQueryKey(['studies', 'groups', groupId, 'members']),

      reviews: (groupId: number) =>
        createQueryKey(['studies', 'groups', groupId, 'reviews']),
    },
  },
} as const
