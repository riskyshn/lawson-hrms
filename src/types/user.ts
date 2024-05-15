import { IPermission, IRole } from './authority'
import { IGeneralDataEmmbed } from './shared'

export interface IUser {
  accessDirectPermissions: IPermission[]
  accessGranted: IRole[]
  company?: IGeneralDataEmmbed
  email: string

  employee?: IGeneralDataEmmbed
  firstName?: string

  lastName?: string
  oid: string
}
