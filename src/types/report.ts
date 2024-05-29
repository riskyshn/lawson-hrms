import { IGeneralDataEmmbed } from './shared'

export interface IRecruitmentFunnel {
  percentage?: {
    label: string
    total: number
  }[]
  total?: {
    label: string
    total: number
  }[]
}

export interface INumberOfHired extends Array<any[]> {}

export interface INumberOfHiredDataTable {
  q1: number
  q2: number
  q3: number
  q4: number
  vacancy: IGeneralDataEmmbed & {
    rrNumber: string
  }
}

export interface Dataset {
  backgroundColor: string
  borderColor: string
  data: any
  label: string
  tension: number
}

export interface IDataPoint {
  label: string
  total: number
}
