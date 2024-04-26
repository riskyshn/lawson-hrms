import { SidebarItemProps } from 'jobseeker-ui'
import { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

export type SidebarLinkTypes<C extends React.ElementType = 'a'> = Array<{
  title?: string
  items: Array<SidebarItemProps<C>>
}>

const useLinks = (links: SidebarLinkTypes<typeof Link>) => {
  const { pathname } = useLocation()

  return useMemo<SidebarLinkTypes<typeof Link>>(() => {
    return links.map(({ title, items }) => {
      const updatedItems = items.map(({ parent, child }) => ({
        parent: {
          ...parent,
          active: !!matchPath(parent.to + '/*', pathname),
        },
        child: child?.map((el) => ({
          ...el,
          active: !!matchPath(el.to.toString() + '/*', pathname),
        })),
      }))

      return { title, items: updatedItems }
    })
  }, [links, pathname])
}

export default useLinks
