export interface IGeneralDataEmmbed {
  name?: string
  oid: string
}

export interface ICoordinate {
  coordinates: [number, number]
  type: string
  x: number
  y: number
}
