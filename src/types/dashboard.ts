export interface IDashboardSchedule {
  description?: string
  endedAt?: string
  guests?: string[]
  location?: string
  meet?: boolean
  name?: string
  startedAt?: string
  timezone?: string
  linkGmeet?: string
  leadBy?: string
}

export interface IDashboardRecentlyPostedJob {
  applicantCount?: number
  createdAt?: string
  name?: string
  oid: string
  rrNumber?: string
}

export interface IDashboardRecentlyApplied {
  applyDate?: string
  candidate?: {
    cv?: string
    email?: string
    name?: string
    oid?: string
    photoProfile?: string
    videoResume?: string
  }
  candidateMatches?: Array<{
    candidateData?: string
    isMatch?: boolean
    requirementType?: string
    vacancyData?: string
  }>
  candidateMatchesMandatory?: Array<{
    candidateData?: string
    isMatch?: boolean
    requirementType?: string
    vacancyData?: string
  }>
  matchPercentage?: number
  message: string
  oid: string
  source?: string
  status?: string
  vacancy?: {
    name?: string
    oid?: string
    rrNumber?: string
  }
}

export interface IDashboardAnnouncement {
  company?: {
    name?: string
    oid: string
  }
  content?: string
  createdAt?: string
  isPinned?: boolean
  oid: string
  poster?: string
  title?: string
}
