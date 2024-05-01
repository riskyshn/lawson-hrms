interface ICandidateHistories {
  candidate?: ICandidate
  history?: {
    histories?: {
      actionAt?: string
      applyProcess?: string
      createdAt?: string
      file?: string
      from?: string
      inReview?: string
      notes?: string
      offeringLetter?: string
      offeringLetterSigned?: string
      oid?: string
      schedules?: string
      status?: string
      type?: string
      updatedAt?: string
    }[]
    vacancy?: IVacancy
  }[]
}

interface ICandidate {
  age?: string
  applyDate?: string
  birthdate?: string
  blacklistDate?: string
  blacklistReason?: string
  blacklistedBy?: string
  candidateId?: string
  candidateMatches?: {
    candidateData: string
    isMatch: boolean
    requirementType: string
    vacancyData: string
  }[]
  candidateMatchesMandatory?: {
    candidateData: string
    isMatch: boolean
    requirementType: string
    vacancyData: string
  }[]
  city?: string
  cv?: string
  documents?: {
    label: string
    value: string
  }[]
  educations?: {
    degree?: {
      id: string
      name: string
    }
    gpa: string
    graduateDate: string
    id: string
    institution: string
    major: string
    startDate: string
    untilNow: string
  }[]
  email?: string
  expectedSalary?: string
  experiences?: {
    companyName: string
    endDate: string
    position: string
    startDate: string
  }[]
  gender?: string
  id: string
  ktp?: string
  lastEducation?: string
  lastPosition?: {
    name?: string
    oid: string
  }
  matchPercentage?: string
  matchPercentage?: number
  module?: string
  name?: string
  nik?: string
  phone?: string
  photoProfile?: string
  position?: string
  province?: string
  rejectReason?: string
  rrNumber?: string
  source?: string
  status?: string
  vacancyId?: string
  vacancyId?: string
  vacancyName?: string
  videoResume?: string
  withdrawReason?: string
}

interface ICandidateToCreateEmployee {
  age?: string
  birthdate?: string
  city?: IGeneralDataEmmbed
  cv?: string
  educations?: Array<{
    degree?: IGeneralDataEmmbed
    gpa?: number
    graduateDate?: string
    institution?: string
    major?: string
    point_education?: number
    startDate?: string
    untilNow?: boolean
  }>
  email?: string
  expectedSalary?: string
  experiences?: Array<{
    companyName?: string
    endDate?: string
    position?: string
    startDate?: string
  }>
  gender?: IGeneralDataEmmbed
  ktp?: string
  lastEducation?: IGeneralDataEmmbed
  lastPosition?: string
  maritalStatus?: IGeneralDataEmmbed
  name?: string
  nik?: string
  oid: string
  phone?: string
  photoProfile?: string
  position?: IGeneralDataEmmbed
  province?: IGeneralDataEmmbed
  religion?: IGeneralDataEmmbed
  videoResume?: string
  videoThumbnail?: string
}
