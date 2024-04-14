interface IBPJSComponent {
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
  bpjsComponentId: string
}

interface IBenefitComponent {
  oid: string
  name?: string
  amountType?: IGeneralDataEmmbed
  amount?: number
  maxCap?: number
  applicationType?: IGeneralDataEmmbed
  taxType?: IGeneralDataEmmbed
}

interface IDeductionComponent {
  oid: string
  name?: string
  amountType?: IGeneralDataEmmbed
  amount?: number
  maxCap?: number
  applicationType?: IGeneralDataEmmbed
  taxType?: IGeneralDataEmmbed
}

interface IComponentInEmployee {
  component: IDeductionComponent | IBenefitComponent
  employee: IDataTableEmployee
}

interface IPayrollRequest {
  oid: string
  name?: string
  startPeriod?: string
  endPeriod?: string
  paymentedAt?: string
  status?: IGeneralDataEmmbed
  statusRunner?: string
  createdAt?: string
  totalAmount?: string
  totalEmployee?: string
  requestor?: {
    oid: string
    employeeCode?: string
    name?: string
    email?: string
  }
  approver?: {
    oid: string
    employeeCode?: string
    name?: string
    email?: string
  }
}

interface IEmployeePayrollResult {
  oid: string
  name?: string
  taxMethod?: string
  ptkpStatus?: string
  baseSalary?: string
  totalBenefit?: string
  totalDeduction?: string
  totalAll?: string
}

interface IEmployeePayrollDetail {
  oid: string
  name?: string
  employeeCode?: string
  components?: {
    name: string
    type: { oid: 'DEDUCTION' | 'BENEFIT' | 'BASE_SALARY'; name: string }
    amount: string
  }[]
  totalAll?: string
}
