/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useCallback, useContext, useMemo } from 'react'
import { useAuthStore } from '@/store'
import { IPermission } from '@/types'

// Define the shape of the context
interface UserPermissionsContextType {
  permissions: IPermission[]
  actions: string[]
  hasPermission: (action?: string) => boolean
}

// Create the context
const UserPermissionsContext = createContext<UserPermissionsContextType | undefined>(undefined)

// Define the provider props type
interface UserPermissionsProviderProps {
  children: ReactNode
}

// Create the provider component
export const UserPermissionsProvider: React.FC<UserPermissionsProviderProps> = ({ children }) => {
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
  const actions = useMemo(() => permissions.map((el) => el.action), [JSON.stringify(permissions)])

  const hasPermission = useCallback(
    (action?: string) => {
      if (!action) return true // No permission required
      return actions.includes(action)
    },
    [actions],
  )

  return <UserPermissionsContext.Provider value={{ permissions, actions, hasPermission }}>{children}</UserPermissionsContext.Provider>
}

// Create a custom hook to use the UserPermissionsContext
export const useUserPermissions = (): UserPermissionsContextType => {
  const context = useContext(UserPermissionsContext)
  if (context === undefined) {
    throw new Error('useUserPermissions must be used within a UserPermissionsProvider')
  }
  return context
}

// Create a custom hook to use the UserPermissionsContext
export const useHasPermission = (): UserPermissionsContextType['hasPermission'] => {
  const context = useContext(UserPermissionsContext)
  if (context === undefined) {
    throw new Error('useUserPermissions must be used within a UserPermissionsProvider')
  }
  return context.hasPermission
}
