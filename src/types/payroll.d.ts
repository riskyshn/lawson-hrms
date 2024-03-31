interface IBPJSComponent {
  paidByEmployer: {
    jht: { rate: number; maxCap?: number }
    jkk: { rate: number; maxCap?: number }
    jkm: { rate: number; maxCap?: number }
    jp: { rate: number; maxCap?: number }
    jks: { rate: number; maxCap?: number }
  }
  paidByEmployee: {
    jht: { rate: number; maxCap?: number }
    jkk?: { rate: number; maxCap?: number }
    jkm?: { rate: number; maxCap?: number }
    jp: { rate: number; maxCap?: number }
    jks: { rate: number; maxCap?: number }
  }
  bpjsComponentId: string
}

interface IBenefitComponent {
  oid: string
  name?: string
  amountType?: 'fixed' | 'variable'
  amount?: number
  maxCap?: number
  applicationType?: 'lump-sum' | 'working-days'
  taxType?: 'taxable' | 'non-taxable'
}

interface IDeductionComponent {
  oid: string
  name?: string
  amountType?: 'fixed' | 'variable'
  amount?: number
  maxCap?: number
  applicationType?: 'lump-sum' | 'working-days'
  taxType?: 'taxable' | 'non-taxable'
}
