import type { RouteObject } from 'react-router-dom'

import BenefitComponentsPage from '@/pages/payroll/benefit-components/BenefitComponentsPage'
import BpjsComponentPage from '@/pages/payroll/bpjs-component/BpjsComponentPage'
import DeductionComponentsPage from '@/pages/payroll/deduction-components/DeductionComponentsPage'
import DetailRunRequestPage from '@/pages/payroll/run-payroll-request/detail/DetailRunRequestPage'
import RunRequestPage from '@/pages/payroll/run-payroll-request/index/RunRequestPage'
import GeneratedPayrollRequestPage from '@/pages/payroll/generated-payroll-request/GeneratedPayrollRequestPage'

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
      path: 'run-payroll-request',
      children: [
        {
          path: '',
          name: 'Run Payroll',
          element: <RunRequestPage />,
        },
        {
          path: ':payrollRequestId',
          name: 'Detail Payroll',
          element: <DetailRunRequestPage />,
        },
      ],
    },
    {
      path: 'generated-payroll-request',
      name: 'Generated Payroll Request',
      element: <GeneratedPayrollRequestPage />,
    },
  ],
}

export default payrollRoute
