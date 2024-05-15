import type { GenericAbortSignal } from 'axios'
import type { IPaginationParam, IPaginationResponse, IPermission, IRole, IUser } from '../types'
import { API_AUTH_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_AUTH_URL,
  withAuth: true,
})

/**
 * Roles
 *
 */
export const fetchRoles = (params?: { active?: boolean } & IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IRole> }>(`/authority/roles`, { params, signal }).then((response) => response.data.data)
}

export const fetchRole = (oid: string) => {
  return axios.get<{ data: IRole }>(`/authority/roles/${oid}`).then((response) => response.data.data)
}

export const createRole = (payload: Record<string, any>) => {
  return axios.post<{ data: IRole }>(`/authority/roles`, payload).then((response) => response.data.data)
}

export const updateRole = (oid: string, payload: Record<string, any>) => {
  return axios.put<{ data: IRole }>(`/authority/roles`, { id: oid, ...payload }).then((response) => response.data.data)
}

export const deleteRole = (oid: string) => {
  return axios.delete(`/authority/roles/${oid}`).then((response) => response.data.data)
}

/**
 * Permissions
 *
 */
export const fetchPermissions = (params?: { active?: boolean } & IPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IPermission> }>(`/authority/permissions`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchPermission = (oid: string) => {
  return axios.get<{ data: IPermission }>(`/authority/permissions/${oid}`).then((response) => response.data.data)
}

export const createPermission = (payload: Record<string, any>) => {
  return axios.post<{ data: IPermission }>(`/authority/permissions`, payload).then((response) => response.data.data)
}

export const updatePermission = (oid: string, payload: Record<string, any>) => {
  return axios.put<{ data: IPermission }>(`/authority/permissions`, { id: oid, ...payload }).then((response) => response.data.data)
}

export const deletePermission = (oid: string) => {
  return axios.delete(`/authority/permissions/${oid}`).then((response) => response.data.data)
}

/**
 * Given access
 *
 */
export const givenRolesToUser = (userId: string, roleIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/roles-user`, { roles: roleIds, userId })
    .then((response) => response.data.data)
}

export const givenPermissionsToUser = (userId: string, permissionIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/permissions-user`, { permissions: permissionIds, userId })
    .then((response) => response.data.data)
}
