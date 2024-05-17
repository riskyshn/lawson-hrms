import { create } from 'zustand'
import { notificationService } from '../services'
import { mountStoreDevtool } from '../utils'

interface NotificationStore {
  totalApplicantsNotification: number
  totalVacanciesNotification: number
  loading: boolean
  error: Error | null
  init: () => Promise<void>
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  totalApplicantsNotification: 0,
  totalVacanciesNotification: 0,
  error: null,
  loading: false,
  init: async () => {
    try {
      set({ loading: true, error: null })
      const [totalApplicantsNotification, totalVacanciesNotification] = await Promise.all([
        notificationService.getTotalNotification({ type: 'APPLICANTS' }),
        notificationService.getTotalNotification({ type: 'VACANCIES' }),
      ])
      set({ totalApplicantsNotification, totalVacanciesNotification, loading: false, error: null })
    } catch (e: any) {
      set({ error: e, totalApplicantsNotification: 0, totalVacanciesNotification: 0, loading: false })
    }
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('notification.store', useNotificationStore)
}
