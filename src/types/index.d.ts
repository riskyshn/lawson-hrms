interface IGeneralDataEmmbed {
  oid: string
  name?: string
}

interface IUser {
  oid: string
  email: string
  firstName?: string
  lastName?: string

  company?: IGeneralDataEmmbed
  employee?: IGeneralDataEmmbed

  accessGranted: IRole[]
  accessDirectPermissions: IPermission[]
}

interface ICoordinate {
  x: number
  y: number
  type: string
  coordinates: [number, number]
}
