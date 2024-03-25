interface IUser {
  oid: string
  email: string
  firstName?: string
  lastName?: string

  company?: {
    oid: string
    name?: string
  }

  employee?: {
    oid: string
    name?: string
  }

  accessGranted: IRole[]
  accessDirectPermissions: IPermission[]
}

interface ICoordinate {
  x: number
  y: number
  type: string
  coordinates: [number, number]
}
