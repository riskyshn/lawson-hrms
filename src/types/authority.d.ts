interface IPermission {
  oid: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  groupName: string
  path: string
  action: string
}

interface IRole {
  oid: string
  name: string
  action: string
  attachedPolicies: IPermission[]
  createdAt: string
}
