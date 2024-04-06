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
