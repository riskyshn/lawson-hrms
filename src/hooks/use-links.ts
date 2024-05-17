/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { Color } from 'jobseeker-ui'

type SidebarChildLinkParams = {
  badge?: { color?: Color; show: boolean; text?: string }
  text: string
  to: string
  permission?: string
  onClick?: React.MouseEventHandler
}

type SidebarParentLinkParams = { icon: React.ComponentType } & SidebarChildLinkParams

export type SidebarLinksOptions = {
  items: Array<{ child?: Array<SidebarChildLinkParams>; parent: SidebarParentLinkParams }>
  title?: string
}

const genSidebarLinks = ({ items, title }: SidebarLinksOptions) => {
  return {
    items: items.map(({ child, parent }) => ({
      child: child?.map((prm: SidebarChildLinkParams) => ({
        as: Link,
        badge: prm.badge,
        onClick: prm.onClick,
        text: prm.text,
        to: prm.to,
        permission: prm.permission,
      })),
      parent: {
        as: Link,
        badge: parent.badge,
        icon: parent.icon,
        onClick: parent.onClick,
        text: parent.text,
        to: parent.to,
        permission: parent.permission,
      },
    })),
    title,
  }
}

export const useLinks = (...items: SidebarLinksOptions[]) => {
  const { pathname } = useLocation()

  const links = useMemo(() => {
    return items.map(genSidebarLinks)
  }, [JSON.stringify(items)])

  return useMemo(() => {
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
  }, [[JSON.stringify(items)], pathname])
}

export default useLinks
