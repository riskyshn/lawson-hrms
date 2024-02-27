import { Link } from 'react-router-dom'
import { Color } from 'jobseeker-ui'

export type SidebarChildLinkParams = {
  text: string
  to: string
  badge?: {
    show: boolean
    color?: Color
    text?: string
  }
  onClick?: React.MouseEventHandler
}

export type SidebarParentLinkParams = SidebarChildLinkParams & {
  icon: React.ComponentType
}

export type GenSidebarLinksOptions = {
  title?: string
  items: Array<{
    parent: SidebarParentLinkParams
    child?: Array<SidebarChildLinkParams>
  }>
}

export default function genSidebarLinks({
  title,
  items,
}: {
  title?: string
  items: { parent: SidebarParentLinkParams; child?: SidebarChildLinkParams[] }[]
}) {
  return {
    title,
    items: items.map(({ parent, child }) => ({
      parent: {
        as: Link,
        icon: parent.icon,
        text: parent.text,
        badge: parent.badge,
        onClick: parent.onClick,
        to: parent.to,
      },
      child: child?.map((prm: SidebarChildLinkParams) => ({
        as: Link,
        text: prm.text,
        badge: prm.badge,
        onClick: prm.onClick,
        to: prm.to,
      })),
    })),
  }
}
