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
  module?: string
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
  lastPosition?: {
    name?: string
    oid: string
  }
  phone?: string
  gender?: string
  age?: string
  expectedSalary?: string
  nik?: string
  birthdate?: string
  educations?: {
    id: string
    degree?: {
      id: string
      name: string
    }
    major: string
    institution: string
    gpa: string
    startDate: string
    graduateDate: string
    untilNow: string
  }[]
  experiences?: {
    companyName: string
    position: string
    startDate: string
    endDate: string
  }[]
  ktp?: string
}
