import { BanknoteIcon, UserCogIcon, UserPlus2Icon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const hrisLinks = genSidebarLinks({
  title: 'HRIS',
  items: [
    { parent: { icon: UserPlus2Icon, text: 'Employee', to: '/employee' } },
    { parent: { icon: UserCogIcon, text: 'Attendance', to: '/attendance' } },
    { parent: { icon: BanknoteIcon, text: 'Payroll', to: '/payroll' } },
  ],
})

export default hrisLinks
