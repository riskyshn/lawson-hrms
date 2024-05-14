interface IRecruitmentFunnel {
  percentage?: {
    label: string
    total: number
  }[]
  total?: {
    label: string
    total: number
  }[]
}

interface INumberOfHired extends Array<Data[]> {}

interface INumberOfHiredDataTable {
  q1: number
  q2: number
  q3: number
  q4: number
  vacancy: IGeneralDataEmmbed & {
    rrNumber: string
  }
}

interface Dataset {
  backgroundColor: string
  borderColor: string
  data: any
  label: string
  tension: number
}
