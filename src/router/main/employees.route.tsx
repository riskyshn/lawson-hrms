import CreateEmployeePage from '@/pages/employees/employee-management/create/CreateEmployeePage'
import EmployeeDetailPage from '@/pages/employees/employee-management/detail/EmployeeDetailPage'
import EditEmployeePage from '@/pages/employees/employee-management/edit/EditEmployeePage'
import EmployeeManagementPage from '@/pages/employees/employee-management/index/EmployeeManagementPage'
import PreviousEmployeePage from '@/pages/employees/previous-employee/index/PreviousEmployeePage'
import type { RouteObject } from 'react-router-dom'

const employeeRoute: RouteObject = {
  path: 'employees',
  name: 'Employees',
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
          path: ':employeeId',
          name: 'View',
          element: <EmployeeDetailPage />,
        },
        {
          path: ':employeeId/edit',
          name: 'View',
          element: <EditEmployeePage />,
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
