export interface IVacancy {
  id: string
  createdAt?: string
  updatedAt?: string
  vacancyName?: string
  rrNumber?: string
  flag?: number
  applicantCount?: number
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
    name?: {
      en?: string
      id: string
    }
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
  city?: {
    id: string
    name?: string
  }
  numberOfEmployeeNeeded?: number
  minimumSalary?: number
  maximumSalary?: number
  hideRangeSalary?: boolean
  negotiableSalary?: boolean
  other?: string
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
  cityRequirement?: any
  provinceRequirement?: any
  maximumSalaryRequirement?: any
  flows?: any[]
  approvals?: any[]
  district?: {
    id: string
    name?: string
  }
}
