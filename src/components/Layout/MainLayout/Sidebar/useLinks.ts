import { matchPath, useLocation } from 'react-router-dom'
import { SidebarLinkTypes } from 'jobseeker-ui'
import { useMemo } from 'react'
import links from './links'

const useLinks = () => {
  const location = useLocation()

  return useMemo<SidebarLinkTypes>(() => {
    return links.map(({ title, items }) => {
      const updatedItems = items.map(({ parent, child }) => ({
        parent: {
          ...parent,
          active: !!matchPath(parent.componentProps?.to + '/*', location.pathname),
        },
        child: child?.map((el) => ({
          ...el,
          active: !!matchPath(el.componentProps?.to, location.pathname),
        })),
      }))

      return { title, items: updatedItems }
    })
  }, [location.pathname])
}

export default useLinks
