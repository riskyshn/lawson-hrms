import ErrorPage from '@/pages/Errors/error-page'
import Private from './private'
import MainLayout from '@/components/Layout/MainLayout/MainLayout'

export const jobRoute = {
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
