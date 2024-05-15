export interface IEvent {
  description?: string
  end?: string
  guest?: string[]
  location?: string
  start?: string
  timezone?: string
  title?: string
  linkGmeet?: string
}

export interface IEventRefiners {
  extendedProps?: {
    description?: string
    guest?: string[]
    location?: string
    timezone?: string
  }
  start?: string
  end?: string
  title?: string
}
