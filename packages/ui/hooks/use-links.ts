import { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { SidebarItemProps } from '../components'

export type SidebarLinkTypes<C extends React.ElementType = 'a'> = Array<{
  items: Array<SidebarItemProps<C>>
  title?: string
}>

const useLinks = (links: SidebarLinkTypes<typeof Link>) => {
  const { pathname } = useLocation()

  return useMemo<SidebarLinkTypes<typeof Link>>(() => {
    return links.map(({ items, title }) => {
      const updatedItems = items.map(({ child, parent }) => ({
        child: child?.map((el) => ({
          ...el,
          active: !!matchPath(el.to.toString() + '/*', pathname),
        })),
        parent: {
          ...parent,
          active: !!matchPath(parent.to + '/*', pathname),
        },
      }))

      return { items: updatedItems, title }
    })
  }, [links, pathname])
}

export default useLinks
