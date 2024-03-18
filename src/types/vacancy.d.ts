interface IVacancy {
  id: string
  createdAt?: string
  updatedAt?: string
  expiredDate?: string
  vacancyName?: string
  rrNumber?: string
  flag?: number
  publishDate?: string
  expiredDate?: string
  canceledDate?: string
  applicantCount?: number
  numberOfEmployeeNeeded?: number
  minimumSalary?: number
  maximumSalary?: number
  hideRangeSalary?: boolean
  negotiableSalary?: boolean
  other?: string
  company?: {
    id: string
    name?: string
  }
  jobLevel?: {
    id: string
    name?: string
  }
  jobType?: {
    id: string
    name?: { en?: string; id: string }
  }
  workplacementType?: {
    id: string
    name?: {
      en?: string
      id: string
    }
  }
  department?: {
    id: string
    name?: string
  }
  branch?: {
    id: string
    name?: string
  }
  city?: {
    id: string
    name?: string
  }
  genderRequirement?: {
    type?: string
    name?: {
      en?: string
      id: string
    }
    mustMeetCriteria?: boolean
  }
  ageRequirement?: {
    minimumAgeRequirement?: number
    maximumAgeRequirement?: number
    mustMeetCriteria?: boolean
  }
  minimalEducationRequirement?: {
    minimalEducation?: {
      en?: string
      id: string
    }
    pointEducation?: number
    mustMeetCriteria?: boolean
  }
  minimumExperienceRequirement?: {
    minimumExperience?: number
    mustMeetCriteria?: boolean
  }
  gpaRequirement?: {
    minimumGpa?: number
    mustMeetCriteria?: boolean
  }
  cityRequirement?: {
    id: string
    name?: string
    mustMeetCriteria?: boolean
  }
  provinceRequirement?: {
    id: string
    name?: string
    mustMeetCriteria?: boolean
  }
  maximumSalaryRequirement?: {
    maximumSalary?: number
    mustMeetCriteria?: boolean
  }
  recruitmentProcess?: Array<{
    id: string
    name?: string
    seq?: number
  }>
  approvals?: {
    flag?: number
    users?: Array<{
      id: string
      seq?: number
      flag?: number
      notes?: string
    }>
  }
  district?: {
    id: string
    name?: string
  }
  status?: string
}
