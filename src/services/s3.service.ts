import { AxiosRequestConfig } from 'axios'
import { API_S3_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

// Create an instance of axios with base URL and authentication
const axiosInstance = createAxiosInstance({
  baseURL: API_S3_BASE_URL,
  withAuth: true,
})

// Function to upload files
export const upload = (type: string, formData: FormData, config?: AxiosRequestConfig<FormData>) => {
  // Merge provided config with headers containing x-file-function
  const updatedConfig: AxiosRequestConfig<FormData> = {
    ...(config || {}),
    headers: {
      ...((config && config.headers) || {}),
      'x-file-function': type,
    },
  }

  // Post request to upload file using axios instance
  return axiosInstance.post<{ data: { link: string; location: string } }>('/file', formData, updatedConfig).then(({ data }) => data.data)
}
