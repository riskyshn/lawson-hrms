import type { GenericAbortSignal } from 'axios'
import type { INotification, IPaginationParam, IPaginationResponse } from '../types'
import { API_NOTIFICATION_BASE_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_NOTIFICATION_BASE_URL,
  withAuth: true,
})

type FetchNotificationParams = {
  type: string
} & IPaginationParam

export const fetchNotification = (params: FetchNotificationParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<INotification> }>(`/notification`, { params, signal }).then((response) => response.data.data)
}

export const updateNotification = (oid: string) => {
  return axios.patch(`/notification/read/${oid}`).then((response) => response.data.data)
}

export const getTotalNotification = (params: FetchNotificationParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: number }>(`/notification/total-not-read`, { params, signal }).then((response) => response.data.data)
}
