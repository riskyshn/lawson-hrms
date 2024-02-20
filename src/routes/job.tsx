import ErrorPage from '@/pages/Errors/error-page'
import Private from './private'
import MainLayout from '@/components/Layout/MainLayout/MainLayout'
import { RouteObject } from 'react-router-dom'
import JobManagement from '@/pages/Main/Job/JobManagement'
import CreateJob from '@/pages/Main/Job/CreateJob'

export const jobRoute: RouteObject = {
  element: <Private />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'job',
      element: <MainLayout />,
      children: [
        {
          path: 'management',
          children: [
            {
              path: '',
              element: <JobManagement />,
            },
            {
              path: 'create',
              element: <CreateJob />,
            },
          ],
        },
        {
          path: '',
          element: '',
        },
      ],
    },
  ],
}
