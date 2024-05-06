import type { RouteObject } from 'react-router-dom'
import BenefitComponentsPage from '@/pages/payroll/(components)/benefit-components/BenefitComponentsPage'
import DetailAppliedBenefitEmployeesPage from '@/pages/payroll/(components)/benefit-components/detail-employees/DetailAppliedBenefitEmployeesPage'
import BpjsComponentPage from '@/pages/payroll/(components)/bpjs-component/BpjsComponentPage'
import DeductionComponentsPage from '@/pages/payroll/(components)/deduction-components/DeductionComponentsPage'
import DetailAppliedDeductionEmployeesPage from '@/pages/payroll/(components)/deduction-components/detail-employees/DetailAppliedDeductionEmployeesPage'
import GeneratedPayrollRequestPage from '@/pages/payroll/generated-payroll-request/GeneratedPayrollRequestPage'
import DetailPayrollRequestPage from '@/pages/payroll/payroll-request/detail/DetailPayrollRequestPage'
import PayrollRequestPage from '@/pages/payroll/payroll-request/index/PayrollRequestPage'
import DetailRunRequestPage from '@/pages/payroll/run-payroll-request/detail/DetailRunRequestPage'
import RunRequestPage from '@/pages/payroll/run-payroll-request/index/RunRequestPage'

const payrollRoute: RouteObject = {
  children: [
    {
      element: <BpjsComponentPage />,
      path: 'bpjs-component',
    },
    {
      children: [
        {
          element: <BenefitComponentsPage />,
          path: '',
        },
        {
          element: <DetailAppliedBenefitEmployeesPage />,
          path: ':componentId/employees',
        },
      ],
      path: 'benefit-components',
    },
    {
      children: [
        {
          element: <DeductionComponentsPage />,
          path: '',
        },
        {
          element: <DetailAppliedDeductionEmployeesPage />,
          path: ':componentId/employees',
        },
      ],
      path: 'deduction-components',
    },
    {
      children: [
        {
          element: <RunRequestPage />,
          path: '',
        },
        {
          element: <DetailRunRequestPage />,
          path: ':payrollRequestId',
        },
      ],
      path: 'run-payroll-request',
    },
    {
      element: <GeneratedPayrollRequestPage />,
      path: 'generated-payroll-request',
    },
    {
      children: [
        {
          element: <PayrollRequestPage />,
          path: '',
        },
        {
          element: <DetailPayrollRequestPage />,
          path: ':payrollRequestId',
        },
      ],
      path: 'payroll-request',
    },
  ],
  name: 'Payroll',
  path: 'payroll',
}

export default payrollRoute
