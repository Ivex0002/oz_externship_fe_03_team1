import type { LectureParams } from './queries/useQueryLecture'

const defineQueryKey = <const T extends readonly unknown[]>(key: T) => key

export const queryKeys = {
  // ==================== Users ====================
  users: {
    me: () => defineQueryKey(['users', 'me']),
  },

  // ==================== Notifications ====================
  notifications: {
    all: () => defineQueryKey(['notifications']),
    lists: () => defineQueryKey(['notifications', 'list']),
    list: (params?: { page?: number; page_size?: number }) =>
      defineQueryKey(['notifications', 'list', params]),
  },

  // ==================== Lectures ====================
  lectures: {
    all: () => defineQueryKey(['lectures']),
    lists: () => defineQueryKey(['lectures', 'list']),
    list: (params: LectureParams) =>
      defineQueryKey(['lectures', 'list', params]),
    categories: () => defineQueryKey(['lectures', 'categories']),
    recommended: () => defineQueryKey(['lectures', 'recommended']),
  },

  // ==================== Study Groups ====================
  studies: {
    groups: {
      all: () => defineQueryKey(['studies', 'groups']),
      lists: () => defineQueryKey(['studies', 'groups', 'list']),
      list: (params?: { page?: number }) =>
        defineQueryKey(['studies', 'groups', 'list', params]),
      details: () => defineQueryKey(['studies', 'groups', 'detail']),
      detail: (groupId: string) =>
        defineQueryKey(['studies', 'groups', 'detail', groupId]),

      members: (groupId: string) =>
        defineQueryKey(['studies', 'groups', groupId, 'members']),

      reviews: (groupId: string) =>
        defineQueryKey(['studies', 'groups', groupId, 'reviews']),
    },
  },
} as const
