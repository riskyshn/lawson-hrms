/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'
import { useAuthStore } from '@/store'
import { IPermission } from '@/types'

export default function useUserPermissions() {
  const { user } = useAuthStore()

  const computePermissions = () => {
    const grantedPermissions = user?.accessGranted?.flatMap((el) => el.attachedPolicies || []) || []
    const directPermissions = user?.accessDirectPermissions || []
    const permissions = [...grantedPermissions, ...directPermissions].reduce<Array<IPermission>>((acc, permission) => {
      if (!acc.some((item) => item.action === permission.action)) acc.push(permission)
      return acc
    }, [])
    return permissions
  }

  const permissions = useMemo(computePermissions, [JSON.stringify(user || null)])
  const actions = useMemo(() => permissions.map((el) => el.name), [JSON.stringify(permissions)])

  const hasPermission = useCallback(
    (action?: string) => {
      if (!action) return true // No permission required
      return actions.includes(action)
    },
    [actions],
  )

  return {
    permissions,
    actions,
    hasPermission,
  }
}
