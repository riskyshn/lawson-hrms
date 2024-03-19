import { createAxiosInstance } from '@/utils/axios'
import { AxiosRequestConfig } from 'axios'

interface ImageUploadResponse {
  data: {
    id: string
    title: string
    url_viewer: string
    url: string
    display_url: string
    width: string
    height: string
    size: string
    time: string
    expiration: string
    image: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    thumb: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    medium: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    delete_url: string
  }
  success: boolean
  status: number
}

const axios = createAxiosInstance({
  withoutSource: true,
  baseURL: 'https://api.imgbb.com',
  params: {
    key: import.meta.env.IMGBB_KEY,
  },
})

export const upload = (formData: FormData, config?: AxiosRequestConfig<FormData>) => {
  return axios.post<ImageUploadResponse>('/1/upload', formData, config).then(({ data }) => {
    return {
      data: {
        url: data.data.image.url,
      },
    }
  })
}
