import type { RouteObject } from 'react-router-dom'

const employeeRoute: RouteObject = {
  children: [
    {
      children: [
        { lazy: () => import('@/pages/employees/employee-management/index/page'), path: '' },
        { lazy: () => import('@/pages/employees/employee-management/create/page'), path: 'create' },
        { lazy: () => import('@/pages/employees/employee-management/detail/page'), path: ':employeeCode' },
        { lazy: () => import('@/pages/employees/employee-management/edit/page'), path: ':employeeCode/edit' },
      ],
      name: 'Employee Management',
      path: 'employee-management',
    },
    { lazy: () => import('@/pages/employees/previous-employee/page'), path: 'previous-employee' },
  ],
  name: 'Employees',
  path: 'employees',
}

export default employeeRoute
