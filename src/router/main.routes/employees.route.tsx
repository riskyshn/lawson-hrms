import type { RouteObject } from 'react-router-dom'

const employeeRoute: RouteObject = {
  path: 'employees',
  name: 'Employees',
  children: [
    {
      path: 'employee-management',
      name: 'Employee Management',
      children: [
        { path: '', lazy: () => import('@/pages/employees/employee-management/index/page') },
        { path: 'create', lazy: () => import('@/pages/employees/employee-management/create/page') },
        { path: ':employeeCode', lazy: () => import('@/pages/employees/employee-management/detail/page') },
        { path: ':employeeCode/edit', lazy: () => import('@/pages/employees/employee-management/edit/page') },
      ],
    },
    { path: 'previous-employee', lazy: () => import('@/pages/employees/previous-employee/page') },
  ],
}

export default employeeRoute
