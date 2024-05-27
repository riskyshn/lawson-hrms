import { IGeneralDataEmmbed } from './shared'

export interface IPreviousEmployee {
  employeeCode?: string
  jobType?: IGeneralDataEmmbed
  lastdayAt?: string
  name?: string
  oid: string
  reasonInactive?: string
  terminatedBy?: string
}

export interface IDataTableEmployee {
  branch?: IGeneralDataEmmbed
  department?: IGeneralDataEmmbed
  email?: string
  employeeCode?: string
  jobLevel?: IGeneralDataEmmbed
  jobType?: IGeneralDataEmmbed
  name?: string
  oid: string
  position?: IGeneralDataEmmbed
  schedule?: IGeneralDataEmmbed
}

export interface IEmployee {
  components?: {
    benefits?: Array<{
      amount?: number
      amountType?: IGeneralDataEmmbed
      applicationType?: IGeneralDataEmmbed
      component?: IGeneralDataEmmbed
      maxCap?: number
      taxType?: IGeneralDataEmmbed
    }>
    deductions?: Array<{
      amount?: number
      amountType?: IGeneralDataEmmbed
      applicationType?: IGeneralDataEmmbed
      component?: IGeneralDataEmmbed
      maxCap?: number
      taxType?: IGeneralDataEmmbed
    }>
  }
  email?: string
  employeeCode?: string
  employment?: {
    branch?: IGeneralDataEmmbed
    department?: IGeneralDataEmmbed
    jobLevel?: IGeneralDataEmmbed
    jobType?: IGeneralDataEmmbed
    picApproval?: IGeneralDataEmmbed
    position?: IGeneralDataEmmbed
    role?: IGeneralDataEmmbed
    schedule?: IGeneralDataEmmbed
    joinedAt?: string
    workingPeriod?: string
  }
  name?: string
  oid: string
  payroll?: {
    allowOvertime?: boolean
    bank?: {
      accountHolderName?: string
      accountNumber?: string
      bankName?: string
    }
    baseSalary?: number
    baseSalaryType?: IGeneralDataEmmbed
    bpjs?: {
      bpjsKetenagakerjaanNumber: string
      bpjsKesehatanNumber: string
      paidByEmployee?: {
        jht?: { maxCap?: number; rate?: number }
        jkk?: { maxCap?: number; rate?: number }
        jkm?: { maxCap?: number; rate?: number }
        jks?: { maxCap?: number; rate?: number }
        jp?: { maxCap?: number; rate?: number }
      }
      paidByEmployer?: {
        jht?: { maxCap?: number; rate?: number }
        jkk?: { maxCap?: number; rate?: number }
        jkm?: { maxCap?: number; rate?: number }
        jks?: { maxCap?: number; rate?: number }
        jp?: { maxCap?: number; rate?: number }
      }
    }
    participateBpjs?: boolean
    taxConfig?: {
      category?: string
      npwpNumber?: string
      ptkpStatus?: string
      taxStatus?: IGeneralDataEmmbed
    }
    taxMethod?: IGeneralDataEmmbed
  }
  personalData?: {
    birthDate?: string
    cityOfBirth?: IGeneralDataEmmbed
    gender?: IGeneralDataEmmbed
    linkNationalId?: string
    maritalStatus?: IGeneralDataEmmbed
    nationIdAddress?: string
    nationalIdNumber?: string
    numberOfChildren?: number
    phoneNumber?: string
    postalCode?: string
    religion?: IGeneralDataEmmbed
    residentalAddress?: string
    photoProfile?: string
    emergencyContact?: string
  }
}
