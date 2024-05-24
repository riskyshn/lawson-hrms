import { IDataTableEmployee } from './employee'
import { IGeneralDataEmmbed } from './shared'

export interface IBPJSComponent {
  bpjsKesehatanNumber: string
  bpjsKetenagakerjaanNumber: string
  bpjsComponentId: string
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

export interface IPPH21 {
  category?: string
  description?: string
  name?: string
  oid: string
  yearValidRegulation?: string
}

export interface IBenefitComponent {
  amount?: number
  amountType?: IGeneralDataEmmbed
  applicationType?: IGeneralDataEmmbed
  maxCap?: number
  name?: string
  oid: string
  taxType?: IGeneralDataEmmbed
}

export interface IDeductionComponent {
  amount?: number
  amountType?: IGeneralDataEmmbed
  applicationType?: IGeneralDataEmmbed
  maxCap?: number
  name?: string
  oid: string
  taxType?: IGeneralDataEmmbed
}

export interface IComponentInEmployee {
  component: IBenefitComponent | IDeductionComponent
  employee: IDataTableEmployee
}

export interface IPayrollRequest {
  approver?: {
    email?: string
    employeeCode?: string
    name?: string
    oid: string
  }
  createdAt?: string
  endPeriod?: string
  name?: string
  oid: string
  paymentedAt?: string
  requestor?: {
    email?: string
    employeeCode?: string
    name?: string
    oid: string
  }
  startPeriod?: string
  status?: IGeneralDataEmmbed
  statusRunner?: string
  totalAmount?: string
  totalEmployee?: string
}

export interface IEmployeePayrollResult {
  baseSalary?: string
  name?: string
  oid: string
  ptkpStatus?: string
  taxMethod?: string
  totalAll?: string
  totalBenefit?: string
  totalDeduction?: string
}

export interface IEmployeePayrollDetail {
  components?: {
    amount: string
    name: string
    type: { name: string; oid: 'BASE_SALARY' | 'BENEFIT' | 'DEDUCTION' }
  }[]
  employeeCode?: string
  name?: string
  oid: string
  totalAll?: string
}
