interface IPreviousEmployee {
  oid: string
  employeeCode?: string
  name?: string
  lastdayAt?: string
  reasonInactive?: string
  jobType?: IGeneralDataEmmbed
}

interface IDataTableEmployee {
  oid: string
  employeeCode?: string
  name?: string
  email?: string
  branch?: IGeneralDataEmmbed
  department?: IGeneralDataEmmbed
  position?: IGeneralDataEmmbed
  jobType?: IGeneralDataEmmbed
  jobLevel?: IGeneralDataEmmbed
}

interface IEmployee {
  oid: string
  employeeCode?: string
  name?: string
  email?: string
  personalData?: {
    gender?: IGeneralDataEmmbed
    religion?: IGeneralDataEmmbed
    cityOfBirth?: IGeneralDataEmmbed
    maritalStatus?: IGeneralDataEmmbed
    phoneNumber?: string
    birthDate?: string
    numberOfChildren?: number
    linkNationalId?: string
    nationalIdNumber?: string
    postalCode?: string
    nationIdAddress?: string
    residentalAddress?: string
  }
  employment?: {
    branch?: IGeneralDataEmmbed
    department?: IGeneralDataEmmbed
    position?: IGeneralDataEmmbed
    jobLevel?: IGeneralDataEmmbed
    jobType?: IGeneralDataEmmbed
    picApproval?: IGeneralDataEmmbed
    schedule?: IGeneralDataEmmbed
    role?: IGeneralDataEmmbed
  }
  payroll?: {
    taxMethod?: IGeneralDataEmmbed
    baseSalary?: number
    baseSalaryType?: IGeneralDataEmmbed
    allowOvertime?: boolean
    bank?: {
      bankName?: string
      accountNumber?: string
      accountHolderName?: string
    }
    taxConfig?: {
      taxStatus?: IGeneralDataEmmbed
      npwpNumber?: string
      ptkpStatus?: string
    }
    participateBpjs?: boolean
    bpjs?: {
      paidByEmployer?: {
        jht?: { rate?: number; maxCap?: number }
        jkk?: { rate?: number; maxCap?: number }
        jkm?: { rate?: number; maxCap?: number }
        jp?: { rate?: number; maxCap?: number }
        jks?: { rate?: number; maxCap?: number }
      }
      paidByEmployee?: {
        jht?: { rate?: number; maxCap?: number }
        jkk?: { rate?: number; maxCap?: number }
        jkm?: { rate?: number; maxCap?: number }
        jp?: { rate?: number; maxCap?: number }
        jks?: { rate?: number; maxCap?: number }
      }
    }
  }
  components?: {
    benefits?: Array<{
      component?: IGeneralDataEmmbed
      taxType?: IGeneralDataEmmbed
      maxCap?: number
      amountType?: IGeneralDataEmmbed
      amount?: number
      applicationType?: string
    }>
    deductions?: Array<{
      component?: IGeneralDataEmmbed
      taxType?: IGeneralDataEmmbed
      maxCap?: number
      amountType?: IGeneralDataEmmbed
      amount?: number
      applicationType?: string
    }>
  }
}
