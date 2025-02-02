import { BanknoteIcon, MapPinnedIcon, UserCogIcon, UserPlus2Icon } from 'lucide-react'
import { SidebarLinksOptions } from '@/hooks'

const hrisLinks: SidebarLinksOptions = {
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
        { text: 'Schedule', to: '/attendance/schedule' },
        { text: 'Attendance Management', to: '/attendance/attendance-management/attendance' },
        { text: 'Request Management', to: '/attendance/request-management' },
        { text: 'Report', to: '/attendance/report' },
      ],
    },
    {
      parent: { icon: BanknoteIcon, text: 'Payroll', to: '/payroll' },
      child: [
        { text: 'BPJS Component', to: '/payroll/bpjs-component' },
        { text: 'Benefit Components', to: '/payroll/benefit-components' },
        { text: 'Deduction Components', to: '/payroll/deduction-components' },
        { text: 'Run Payroll Request', to: '/payroll/run-payroll-request' },
        { text: 'Generated Payroll Request', to: '/payroll/generated-payroll-request' },
        { text: 'Payroll Request', to: '/payroll/payroll-request' },
      ],
    },
    {
      parent: { icon: MapPinnedIcon, text: 'Employee Demography', to: '/demography' },
    },
  ],
  title: 'HRIS',
}

export default hrisLinks
