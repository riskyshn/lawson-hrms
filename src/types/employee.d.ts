interface IEmployee {
  oid: string
  employeeId: string
  name?: string
  email?: string
  personalData: {
    gender?: {
      name?: string
      oid: string
    }
    religion?: {
      name?: string
      oid: string
    }
    cityOfBirth?: {
      name?: string
      oid: string
    }
    maritalStatus?: {
      name?: string
      oid: string
    }
    phoneNumber?: string
    birthDate?: string
    numberOfChildren?: number
    linkNationalId?: string
    nationalIdNumber?: string
    postalCode?: string
    nationIdAddress?: string
    residentalAddress?: string
  }
  employment: {
    branch?: {
      name?: string
      oid: string
    }
    department?: {
      name?: string
      oid: string
    }
    position?: {
      name?: string
      oid: string
    }
    jobLevel?: {
      name?: string
      oid: string
    }
    jobType?: {
      name?: string
      oid: string
    }
    picApproval?: {
      name?: string
      oid: string
    }
    schedule?: {
      name?: string
      oid: string
    }
  }
  payroll: {
    taxMethod?: string
    baseSalary?: number
    baseSalaryType?: number
    allowOvertime?: boolean
    bank?: {
      bankName?: string
      accountNumber?: string
      accountHolderName?: string
    }
    taxConfig?: {
      taxStatus?: number
      npwpNumber?: string
      ptkpStatus?: string
    }
    participateBpjs?: boolean
    bpjs?: {
      paidByCompany?: {
        jht?: number
        jkk?: number
        jkm?: number
        jp?: number
        jks?: number
      }
      paidByEmployee?: {
        jht?: number
        jkk?: number
        jkm?: number
        jp?: number
        jks?: number
      }
    }
  }
  components: {
    benefits?: {
      component?: {
        name?: string
        oid?: string
      }
      taxType?: number
      amountType?: number
      amount?: number
      applicationType?: number
    }[]
    deductions?: {
      component?: {
        name?: string
        oid?: string
      }
      taxType?: number
      amountType?: number
      amount?: number
      applicationType?: number
    }[]
  }
}
