interface IVacancy {
  applicantCount?: number
  approvals?: {
    flag?: number
    users?: Array<
      IGeneralDataEmmbed & {
        createdAt?: null | string
        department?: IGeneralDataEmmbed
        email?: string
        flag?: number
        notes?: string
        position?: IGeneralDataEmmbed
        seq?: number
        updatedAt?: null | string
      }
    >
  }
  branch?: IGeneralDataEmmbed
  canceledDate?: string
  city?: IGeneralDataEmmbed
  company?: IGeneralDataEmmbed
  createdAt?: string
  department?: IGeneralDataEmmbed
  district?: IGeneralDataEmmbed
  expiredDate?: string
  expiredDate?: string
  flag?: number
  hideRangeSalary?: boolean
  jobLevel?: IGeneralDataEmmbed
  jobType?: IGeneralDataEmmbed
  maximumSalary?: number
  minimumSalary?: number
  name?: string
  negotiableSalary?: boolean
  numberOfEmployeeNeeded?: number
  oid: string
  other?: string
  publishDate?: string
  rrNumber?: string
  status?: string
  updatedAt?: string
  vacancyName?: string
  workplacementType?: IGeneralDataEmmbed

  recruitmentProcess?: Array<IGeneralDataEmmbed & { seq?: number }>

  genderRequirement?: IGeneralDataEmmbed & { mustMeetCriteria?: boolean }
  ageRequirement?: { maximumAgeRequirement?: number; minimumAgeRequirement?: number; mustMeetCriteria?: boolean }
  minimalEducationRequirement?: IGeneralDataEmmbed & { mustMeetCriteria?: boolean; pointEducation?: number }
  minimumExperienceRequirement?: { minimumExperience?: number; mustMeetCriteria?: boolean }
  gpaRequirement?: { minimumGpa?: number; mustMeetCriteria?: boolean }
  cityRequirement?: IGeneralDataEmmbed & { mustMeetCriteria?: boolean }
  provinceRequirement?: IGeneralDataEmmbed & { mustMeetCriteria?: boolean }
  maximumSalaryRequirement?: { maximumSalary?: number; mustMeetCriteria?: boolean }
}
