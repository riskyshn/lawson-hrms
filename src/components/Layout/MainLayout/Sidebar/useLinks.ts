import { Link, matchPath, useLocation } from 'react-router-dom'
import { SidebarItemProps } from 'jobseeker-ui'
import { useMemo } from 'react'
import links from './links'

export type SidebarLinkTypes<C extends React.ElementType = 'a'> = Array<{
  title?: string
  items: Array<SidebarItemProps<C>>
}>

const useLinks = () => {
  const location = useLocation()

  return useMemo<SidebarLinkTypes<typeof Link>>(() => {
    return links.map(({ title, items }) => {
      const updatedItems = items.map(({ parent, child }) => ({
        parent: {
          ...parent,
          active: !!matchPath(parent.to + '/*', location.pathname),
        },
        child: child?.map((el) => ({
          ...el,
          active: !!matchPath(el.to.toString() + '/*', location.pathname),
        })),
      }))

      return { title, items: updatedItems }
    })
  }, [location.pathname])
}

export default useLinks
