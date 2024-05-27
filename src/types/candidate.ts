import { IGeneralDataEmmbed } from './shared'
import { IVacancy } from './vacancy'

export interface ICandidateHistories {
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

export interface ICandidate {
  candidate: {
    name: string
    email: string
    cv: string
    videoResume: null | string
    oid: string
    photoProfile: null | string
    lastEducation: string
    city: string
    province: string
    phone: string
    gender: string
    age: string
    expectedSalary: string
    nik: string
    birthdate: string
    lastPosition: string
    educations: {
      degree: {
        name: string
        oid: string
      }
      major: string
      institution: string
      gpa: string
      startDate: string
      graduateDate: string
      untilNow: string
      pointEducation: string
    }[]
  }
  experiences?: Array<{
    companyName: string
    endDate: string
    position: string
    startDate: string
  }>
  vacancy: {
    name: string
    oid: string
    rrNumber: string
  }
  applyDate: string
  source: string
  status: string
  module: string
  candidateMatches: {
    requirementType: string
    vacancyData: string
    candidateData: string
    isMatch: boolean
  }[]
  candidateMatchesMandatory: {
    requirementType: string
    vacancyData: string
    candidateData: string
    isMatch: boolean
  }[]
  listAppliedVacancy: null
  matchPercentage: number
  oid: string
  blacklist: {
    by: string
    reason: string
    date: string
  }
  withdraw: {
    by: string
    reason: string
  }
  reject: {
    by: string
    reason: string
  }
}

export interface ICandidateToCreateEmployee {
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
  emergencyContact?: string
  joinedAt?: string
}
