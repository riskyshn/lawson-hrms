/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react' // Assuming you're using React
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

  return {
    permissions,
    actions,
  }
}
