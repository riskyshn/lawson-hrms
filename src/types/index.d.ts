interface IGeneralDataEmmbed {
  name?: string
  oid: string
}

interface IUser {
  accessDirectPermissions: IPermission[]
  accessGranted: IRole[]
  company?: IGeneralDataEmmbed
  email: string

  employee?: IGeneralDataEmmbed
  firstName?: string

  lastName?: string
  oid: string
}

interface ICoordinate {
  coordinates: [number, number]
  type: string
  x: number
  y: number
}
