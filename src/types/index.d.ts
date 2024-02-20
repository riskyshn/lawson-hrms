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
  firstName: string
  lastName: string
  email: string
  accessGranted: AccessGrantedRole[]
  accessDirectPermissions: any[]
}
