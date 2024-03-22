interface IAccessGrantedPolicy {
  oid: string
  method: string
  path: string
  action: string
}

interface IAccessGrantedRole {
  oid: string
  name: string
  attachedPolicies: IAccessGrantedPolicy[]
}

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
