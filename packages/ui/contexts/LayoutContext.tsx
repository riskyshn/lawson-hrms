import React, { useContext, useState } from 'react'
import { useLocalStorageState } from '../hooks'

export type LayoutContextProps = {
  sidebarOpen: boolean
  sidebarMini: boolean
  sidebarActive: boolean
  toggleSidebarOpen: (value?: boolean) => void
  toggleSidebarMini: (value?: boolean) => void
  toggleSidebarActive: (value?: boolean) => void
}

const LayoutContext = React.createContext<LayoutContextProps>({
  sidebarOpen: false,
  sidebarMini: false,
  sidebarActive: false,
  toggleSidebarOpen: () => {},
  toggleSidebarMini: () => {},
  toggleSidebarActive: () => {},
})

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(false)
  const [sidebarMini, setSidebarMini] = useLocalStorageState('SIDEBAR_MINI', false)

  const toggleSidebarOpen = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') {
      setSidebarOpen(isOpen)
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  }

  const toggleSidebarMini = (isMini?: boolean) => {
    if (typeof isMini === 'boolean') {
      setSidebarMini(isMini)
    } else {
      setSidebarMini(!sidebarMini)
    }
    setSidebarActive(false)
  }

  const toggleSidebarActive = (isActive?: boolean) => {
    if (typeof isActive === 'boolean') {
      setSidebarActive(isActive)
    } else {
      setSidebarActive(!sidebarActive)
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        sidebarMini,
        sidebarActive,
        toggleSidebarOpen,
        toggleSidebarMini,
        toggleSidebarActive,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => useContext(LayoutContext)
