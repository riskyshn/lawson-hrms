interface ITimezone {
  id: string
  title: string
  createdAt?: string
  updatedAt?: string
  oid?: string
}

interface ISchedule {
  id: string
  title: string
  createdAt?: string
  updatedAt?: string
  timezone?: ITimezone
  details?: Array<{
    day?: number
    start?: string
    end?: string
    isActive?: boolean
  }>
}
