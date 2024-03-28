import { BanknoteIcon, UserCogIcon, UserPlus2Icon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const hrisLinks = genSidebarLinks({
  title: 'HRIS',
  items: [
    {
      parent: { icon: UserPlus2Icon, text: 'Employee', to: '/employees' },
      child: [
        { text: 'Employee Management', to: '/employees/employee-management' },
        { text: 'Previous Employee', to: '/employees/previous-employee' },
      ],
    },
    {
      parent: { icon: UserCogIcon, text: 'Attendance', to: '/attendance' },
      child: [
        {
          text: 'Schedule',
          to: '/attendance/schedule',
        },
        {
          text: 'Attendance Management',
          to: '/attendance/attendance-management',
        },
      ],
    },
    {
      parent: { icon: BanknoteIcon, text: 'Payroll', to: '/payroll' },
      child: [
        {
          text: 'BPJS Component',
          to: '/payroll/bpjs-component',
        },
        {
          text: 'Benefit Components',
          to: '/payroll/benefit-components',
        },
        {
          text: 'Deduction Components',
          to: '/payroll/deduction-components',
        },
      ],
    },
  ],
})

export default hrisLinks
