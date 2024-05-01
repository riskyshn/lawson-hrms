interface IVacancy {
  ageRequirement?: {
    maximumAgeRequirement?: number
    minimumAgeRequirement?: number
    mustMeetCriteria?: boolean
  }
  applicantCount?: number
  approvals?: {
    flag?: number
    users?: Array<{
      createdAt?: null | string
      department?: IGeneralDataEmmbed
      email?: string
      flag?: number
      name?: string
      notes?: string

      oid: string
      position?: IGeneralDataEmmbed

      seq?: number
      updatedAt?: null | string
    }>
  }
  branch?: IGeneralDataEmmbed
  canceledDate?: string
  city?: IGeneralDataEmmbed
  cityRequirement?: {
    mustMeetCriteria?: boolean
    name?: string
    oid: string
  }
  company?: IGeneralDataEmmbed
  createdAt?: string
  department?: IGeneralDataEmmbed
  district?: IGeneralDataEmmbed
  expiredDate?: string
  expiredDate?: string
  flag?: number
  genderRequirement?: {
    mustMeetCriteria?: boolean
    name?: {
      en?: string
      oid: string
    }
    type?: string
  }
  gpaRequirement?: {
    minimumGpa?: number
    mustMeetCriteria?: boolean
  }
  hideRangeSalary?: boolean
  jobLevel?: IGeneralDataEmmbed
  jobType?: IGeneralDataEmmbed
  maximumSalary?: number
  maximumSalaryRequirement?: {
    maximumSalary?: number
    mustMeetCriteria?: boolean
  }
  minimalEducationRequirement?: {
    minimalEducation?: {
      en?: string
      id: string
    }
    mustMeetCriteria?: boolean
    oid: string
    pointEducation?: number
  }
  minimumExperienceRequirement?: {
    minimumExperience?: number
    mustMeetCriteria?: boolean
  }
  minimumSalary?: number
  name?: string
  negotiableSalary?: boolean
  numberOfEmployeeNeeded?: number
  oid: string
  other?: string
  provinceRequirement?: {
    mustMeetCriteria?: boolean
    name?: string
    oid: string
  }
  publishDate?: string
  recruitmentProcess?: Array<{
    name?: string
    oid: string
    seq?: number
  }>
  rrNumber?: string
  status?: string
  updatedAt?: string
  vacancyName?: string
  workplacementType?: IGeneralDataEmmbed
}
