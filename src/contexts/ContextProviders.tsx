import React from 'react'
import { UserPermissionsProvider } from './UserPermissionsContext'

export const ContextProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <UserPermissionsProvider>{children}</UserPermissionsProvider>
}
