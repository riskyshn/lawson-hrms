interface IDashboardSchedule {
  oid: string
  name?: string
  startTime?: string
  endTime?: string
  timezone?: string
  date?: string
}

interface IDashboardRecentlyPostedJob {
  oid: string
  name?: string
  rrNumber?: string
  applicantCount?: number
  createdAt?: string
}

interface IDashboardRecentlyApplied {
  oid: string
  candidate?: {
    name?: string
    email?: string
    cv?: string
    oid?: string
    photoProfile?: string
    videoResume?: string
  }
  vacancy?: {
    name?: string
    oid?: string
    rrNumber?: string
  }
  applyDate?: string
  source?: string
  status?: string
  candidateMatches?: Array<{
    requirementType?: string
    vacancyData?: string
    candidateData?: string
    isMatch?: boolean
  }>
  candidateMatchesMandatory?: Array<{
    requirementType?: string
    vacancyData?: string
    candidateData?: string
    isMatch?: boolean
  }>
  matchPercentage?: number
}

interface IDashboardAnnouncement {
  oid: string
  title?: string
  poster?: string
  content?: string
  company?: {
    oid: string
    name?: string
  }
  isPinned?: boolean
  createdAt?: string
}
