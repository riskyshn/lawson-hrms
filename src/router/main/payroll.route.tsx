import type { RouteObject } from 'react-router-dom'

import BenefitComponentsPage from '@/pages/payroll/benefit-components/BenefitComponentsPage'
import BpjsComponentPage from '@/pages/payroll/bpjs-component/BpjsComponentPage'
import DeductionComponentsPage from '@/pages/payroll/deduction-components/DeductionComponentsPage'
import RunPage from '@/pages/payroll/run/RunPage'
import RequestPage from '@/pages/payroll/run/RequestPage'

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
      path: 'run',
      name: 'Run Payroll',
      element: <RunPage />,
    },
    {
      path: 'detail',
      name: 'Detail Payroll',
      element: <RequestPage />,
    },
  ],
}

export default payrollRoute
