import ErrorPage from '@/pages/Errors/error-page'
import Private from './private'
import MainLayout from '@/components/Layout/MainLayout/MainLayout'
import { RouteObject } from 'react-router-dom'

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
          element: <></>,
        },
      ],
    },
  ],
}
