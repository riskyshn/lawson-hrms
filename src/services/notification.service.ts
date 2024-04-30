import type { GenericAbortSignal } from 'axios'

import { API_NOTIFICATION_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_NOTIFICATION_BASE_URL,
  withAuth: true,
})

type FetchNotificationParams = IPaginationParam & {
  type: string
}

export const fetchVacanciesNotification = (params: FetchNotificationParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<INotification> }>(`/vacancies`, { params, signal }).then((response) => response.data.data)
}
