import type { RouteObject } from 'react-router-dom'

import BenefitComponentsPage from '@/pages/payroll/benefit-components/BenefitComponentsPage'
import BpjsComponentPage from '@/pages/payroll/bpjs-component/BpjsComponentPage'
import DeductionComponentsPage from '@/pages/payroll/deduction-components/DeductionComponentsPage'
import DetailRunRequestPage from '@/pages/payroll/run-payroll-request/detail/DetailRunRequestPage'
import RunRequestPage from '@/pages/payroll/run-payroll-request/index/RunRequestPage'
import GeneratedPayrollRequestPage from '@/pages/payroll/generated-payroll-request/GeneratedPayrollRequestPage'
import DetailAppliedBenefitEmployeesPage from '@/pages/payroll/benefit-components/detail-employees/DetailAppliedBenefitEmployeesPage'
import DetailAppliedDeductionEmployeesPage from '@/pages/payroll/deduction-components/detail-employees/DetailAppliedDeductionEmployeesPage'

const payrollRoute: RouteObject = {
  path: 'payroll',
  name: 'Payroll',
  children: [
    {
      path: 'bpjs-component',
      element: <BpjsComponentPage />,
    },
    {
      path: 'benefit-components',
      children: [
        {
          path: '',
          element: <BenefitComponentsPage />,
        },
        {
          path: ':componentId/employees',
          element: <DetailAppliedBenefitEmployeesPage />,
        },
      ],
    },
    {
      path: 'deduction-components',
      children: [
        {
          path: '',
          element: <DeductionComponentsPage />,
        },
        {
          path: ':componentId/employees',
          element: <DetailAppliedDeductionEmployeesPage />,
        },
      ],
    },
    {
      path: 'run-payroll-request',
      children: [
        {
          path: '',
          element: <RunRequestPage />,
        },
        {
          path: ':payrollRequestId',
          element: <DetailRunRequestPage />,
        },
      ],
    },
    {
      path: 'generated-payroll-request',
      element: <GeneratedPayrollRequestPage />,
    },
  ],
}

export default payrollRoute
