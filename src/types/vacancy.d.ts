interface IVacancy {
  name?: string
  oid: string
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
    oid: string
    name?: string
  }
  jobLevel?: {
    oid: string
    name?: string
  }
  jobType?: {
    oid: string
    name?: { en?: string; oid: string }
  }
  workplacementType?: {
    oid: string
    name?: {
      en?: string
      oid: string
    }
  }
  department?: {
    oid: string
    name?: string
  }
  branch?: {
    oid: string
    name?: string
  }
  city?: {
    oid: string
    name?: string
  }
  genderRequirement?: {
    type?: string
    name?: {
      en?: string
      oid: string
    }
    mustMeetCriteria?: boolean
  }
  ageRequirement?: {
    minimumAgeRequirement?: number
    maximumAgeRequirement?: number
    mustMeetCriteria?: boolean
  }
  minimalEducationRequirement?: {
    oid: string
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
    oid: string
    name?: string
    mustMeetCriteria?: boolean
  }
  provinceRequirement?: {
    oid: string
    name?: string
    mustMeetCriteria?: boolean
  }
  maximumSalaryRequirement?: {
    maximumSalary?: number
    mustMeetCriteria?: boolean
  }
  recruitmentProcess?: Array<{
    oid: string
    name?: string
    seq?: number
  }>
  approvals?: {
    flag?: number
    users?: Array<{
      oid: string
      seq?: number
      flag?: number
      name?: string
      email?: string
      notes?: string

      department?: {
        oid: string
        name?: string
      }
      position?: {
        oid: string
        name?: string
      }

      createdAt?: string | null
      updatedAt?: string | null
    }>
  }
  district?: {
    oid: string
    name?: string
  }
  status?: string
}
