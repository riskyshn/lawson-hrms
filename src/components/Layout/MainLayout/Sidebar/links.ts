import { Home, Briefcase, Users, Repeat, File, UserPlus2, UserCog, Banknote, Settings, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Color } from 'jobseeker-ui'
import { SidebarLinkTypes } from './useLinks'

type ChildLinkParams = {
  text: string
  to: string
  badge?: {
    show: boolean
    color?: Color
    text?: string
  }
  onClick?: React.MouseEventHandler
}

type ParentLinkParams = ChildLinkParams & {
  icon: React.ComponentType
}

const genLinks = ({ title, items }: { title?: string; items: { parent: ParentLinkParams; child?: ChildLinkParams[] }[] }) => {
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
      child: child?.map((prm: ChildLinkParams) => ({
        as: Link,
        text: prm.text,
        badge: prm.badge,
        onClick: prm.onClick,
        to: prm.to,
      })),
    })),
  }
}

const links: SidebarLinkTypes<typeof Link> = [
  genLinks({
    items: [{ parent: { icon: Home, text: 'Dashboard', to: '/' } }],
  }),
  genLinks({
    title: 'Recruitment',
    items: [
      {
        parent: { icon: Briefcase, text: 'Job', to: '/job' },
        child: [
          { text: 'Job Management', to: '/job/management' },
          { text: 'Job Requisition', to: '/job/requisition' },
        ],
      },
      { parent: { icon: Users, text: 'Candidates', to: '/candidates' } },
      { parent: { icon: Repeat, text: 'Process', to: '/process' } },
      { parent: { icon: File, text: 'Report', to: '/report' } },
    ],
  }),
  genLinks({
    title: 'HRIS',
    items: [
      { parent: { icon: UserPlus2, text: 'Employee', to: '/employee' } },
      { parent: { icon: UserCog, text: 'Attendance', to: '/attendance' } },
      { parent: { icon: Banknote, text: 'Payroll', to: '/payroll' } },
    ],
  }),
  genLinks({
    title: 'Other',
    items: [
      { parent: { icon: Settings, text: 'Settings', to: '/settings' } },
      { parent: { icon: Palette, text: 'Careersite CMS', to: '/cms' } },
    ],
  }),
]

export default links
