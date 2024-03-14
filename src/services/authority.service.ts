import type { PaginationParam, PaginationResponse } from '@/types/pagination'
import type { GenericAbortSignal } from 'axios'

import { API_ORGANIZATION_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_ORGANIZATION_BASE_URL,
  withAuth: true,
})

/**
 * Roles
 *
 */
export const fetchRoles = (params?: PaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IRole> }>(`/authority/roles`, { params, signal }).then((response) => response.data.data)
}

export const fetchRole = (oid: string) => {
  return axios.get<{ data: IRole }>(`/authority/roles/${oid}`).then((response) => response.data.data)
}

export const createRole = (payload: Record<string, any>) => {
  return axios.post<{ data: IRole }>(`/authority/roles`, payload).then((response) => response.data.data)
}

export const updateRole = (oid: string, payload: Record<string, any>) => {
  return axios.put<{ data: IRole }>(`/authority/roles/${oid}`, payload).then((response) => response.data.data)
}

export const deleteRole = (oid: string) => {
  return axios.delete(`/authority/roles/${oid}`).then((response) => response.data.data)
}

/**
 * Permissions
 *
 */
export const fetchPermissions = (params?: PaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IRole> }>(`/authority/permission`, { params, signal }).then((response) => response.data.data)
}

export const fetchPermission = (oid: string) => {
  return axios.get<{ data: IPermission }>(`/authority/permission/${oid}`).then((response) => response.data.data)
}

/**
 * Given access
 *
 */
export const givenRolesToUser = (userId: string, roleIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/role-user`, { userId, roles: roleIds })
    .then((response) => response.data.data)
}

export const givenPermissionsToUser = (userId: string, permissionIds: string[]) => {
  return axios
    .patch<{ data: IUser }>(`/authority/provide-access/permissions-user`, { userId, permissions: permissionIds })
    .then((response) => response.data.data)
}
