interface IRecruitmentFunnel {
  percentage?: Data[]
  total?: Data[]
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
  q1: number
  q2: number
  q3: number
  q4: number
  vacancy: IVacancy
}

interface Dataset {
  backgroundColor: string
  borderColor: string
  data: any
  label: string
  tension: number
}
