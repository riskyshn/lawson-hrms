import { Link } from 'react-router-dom'
import { Color } from 'jobseeker-ui'

export type SidebarChildLinkParams = {
  badge?: {
    color?: Color
    show: boolean
    text?: string
  }
  onClick?: React.MouseEventHandler
  text: string
  to: string
}

export type SidebarParentLinkParams = {
  icon: React.ComponentType
} & SidebarChildLinkParams

export type GenSidebarLinksOptions = {
  items: Array<{
    child?: Array<SidebarChildLinkParams>
    parent: SidebarParentLinkParams
  }>
  title?: string
}

export default function genSidebarLinks({
  items,
  title,
}: {
  items: { child?: SidebarChildLinkParams[]; parent: SidebarParentLinkParams }[]
  title?: string
}) {
  return {
    items: items.map(({ child, parent }) => ({
      child: child?.map((prm: SidebarChildLinkParams) => ({
        as: Link,
        badge: prm.badge,
        onClick: prm.onClick,
        text: prm.text,
        to: prm.to,
      })),
      parent: {
        as: Link,
        badge: parent.badge,
        icon: parent.icon,
        onClick: parent.onClick,
        text: parent.text,
        to: parent.to,
      },
    })),
    title,
  }
}
