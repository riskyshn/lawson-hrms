interface ICandidate {
  id: string
  candidateId?: string
  vacancyId?: string
  email?: string
  name?: string
  position?: string
  rrNumber?: string
  photoProfile?: string
  cv?: string
  videoResume?: string
  province?: string
  city?: string
  lastEducation?: string
  blacklistedBy?: string
  blacklistReason?: string
  blacklistDate?: string
  matchPercentage?: string
  applyDate?: string
  source?: string
  status?: string
  candidateMatches?: {
    requirementType: string
    vacancyData: string
    candidateData: string
    isMatch: boolean
  }[]
  candidateMatchesMandatory?: {
    requirementType: string
    vacancyData: string
    candidateData: string
    isMatch: boolean
  }[]
  matchPercentage?: number
  rejectReason?: string
  withdrawReason?: string
  vacancyId?: string
  vacancyName?: string
}
