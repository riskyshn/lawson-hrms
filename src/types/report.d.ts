interface IRecruitmentFunnel {
  total?: Data[]
  percentage?: Data[]
}

interface Data {
  label: string
  total: number
}

interface INumberOfHired extends Array<Data[]> {}

interface IVacancy {
  name: string
  oid: string
  rrNumber: string
}

interface INumberOfHiredDataTable {
  vacancy: IVacancy
  q1: number
  q2: number
  q3: number
  q4: number
}

interface Dataset {
  label: string
  data: any
  borderColor: string
  backgroundColor: string
  tension: number
}
