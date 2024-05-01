interface IPermission {
  action: string
  arn: {
    apiId: string
    region: string
    stage: string
  }
  groupName: string
  method: '*' | 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'
  name: string
  oid: string
  path: string
}

interface IRole {
  action: string
  attachedPolicies: IPermission[]
  code: string
  createdAt: string
  description: string
  name: string
  oid: string
}
