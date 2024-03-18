import CreateEmployeePage from '@/pages/employee/employee-management/create/CreateEmployeePage'
import EmployeeDetailPage from '@/pages/employee/employee-management/index/EmployeeDetailPage'
import EmployeeManagementPage from '@/pages/employee/employee-management/index/EmployeeManagementPage'
import PreviousEmployeePage from '@/pages/employee/previous-employee/index/PreviousEmployeePage'
import type { RouteObject } from 'react-router-dom'

const employeeRoute: RouteObject = {
  path: 'employee',
  name: 'Employee',
  children: [
    {
      path: 'employee-management',
      name: 'Employee Management',
      children: [
        {
          path: '',
          element: <EmployeeManagementPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateEmployeePage />,
        },
        {
          path: ':employeeId/view',
          name: 'View',
          element: <EmployeeDetailPage />,
        },
      ],
    },
    {
      path: 'previous-employee',
      name: 'Previous Employee',
      children: [
        {
          path: '',
          element: <PreviousEmployeePage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateEmployeePage />,
        },
      ],
    },
  ],
}

export default employeeRoute
