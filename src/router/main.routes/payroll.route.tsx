import type { RouteObject } from 'react-router-dom'

const payrollRoute: RouteObject = {
  path: 'payroll',
  children: [
    { path: 'bpjs-component', lazy: () => import('@/pages/payroll/(components)/bpjs-component/page') },
    {
      path: 'benefit-components',
      children: [
        { path: '', lazy: () => import('@/pages/payroll/(components)/benefit-components/page') },
        { path: ':componentId/employees', lazy: () => import('@/pages/payroll/(components)/benefit-components/detail-employees/page') },
      ],
    },
    {
      path: 'deduction-components',
      children: [
        { path: '', lazy: () => import('@/pages/payroll/(components)/deduction-components/page') },
        { path: ':componentId/employees', lazy: () => import('@/pages/payroll/(components)/deduction-components/detail-employees/page') },
      ],
    },
    {
      path: 'run-payroll-request',
      children: [
        { path: '', lazy: () => import('@/pages/payroll/run-payroll-request/index/page') },
        { path: ':payrollRequestId', lazy: () => import('@/pages/payroll/run-payroll-request/detail/page') },
      ],
    },
    { path: 'generated-payroll-request', lazy: () => import('@/pages/payroll/generated-payroll-request/page') },
    {
      path: 'payroll-request',
      children: [
        { path: '', lazy: () => import('@/pages/payroll/payroll-request/index/page') },
        { path: ':payrollRequestId', lazy: () => import('@/pages/payroll/payroll-request/detail/page') },
      ],
    },
  ],
}

export default payrollRoute
