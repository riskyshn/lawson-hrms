import type { GenericAbortSignal } from 'axios'

import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_AUTH_BASE_URL,
  withAuth: true,
})

/**
 * Roles
 *
 */
export const fetchRoles = (params?: IPaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
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
export const fetchPermissions = (params?: IPaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IPermission> }>(`/authority/permissions`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchPermission = (oid: string) => {
  return axios.get<{ data: IPermission }>(`/authority/permissions/${oid}`).then((response) => response.data.data)
}

/**
 * Given access
 *
 */
export const givenRolesToUser = (userId: string, roleIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/roles-user`, { userId, roles: roleIds })
    .then((response) => response.data.data)
}

export const givenPermissionsToUser = (userId: string, permissionIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/permissions-user`, { userId, permissions: permissionIds })
    .then((response) => response.data.data)
}