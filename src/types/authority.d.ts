interface IPermission {
  oid: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  groupName: string
  name: string
  path: string
  action: string
}

interface IRole {
  oid: string
  name: string
  code: string
  description: string
  action: string
  attachedPolicies: IPermission[]
  createdAt: string
}
