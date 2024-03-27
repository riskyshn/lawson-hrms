import type { RouteObject } from 'react-router-dom'

import ApplyToPage from '@/pages/payroll/apply-to/ApplyToPage'
import BenefitComponentsPage from '@/pages/payroll/benefit-components/BenefitComponentsPage'
import BpjsComponentPage from '@/pages/payroll/bpjs-component/BpjsComponentPage'
import DeductionComponentsPage from '@/pages/payroll/deduction-components/DeductionComponentsPage'

const payrollRoute: RouteObject = {
  path: 'payroll',
  name: 'Payroll',
  children: [
    {
      path: 'bpjs-component',
      name: 'BPJS Component',
      element: <BpjsComponentPage />,
    },
    {
      path: 'benefit-components',
      name: 'Benefit Component',
      element: <BenefitComponentsPage />,
    },
    {
      path: 'deduction-components',
      name: 'Deduction Component',
      element: <DeductionComponentsPage />,
    },
    {
      path: 'apply-to/:type/:oid',
      name: 'Apply To',
      element: <ApplyToPage />,
    },
  ],
}

export default payrollRoute
