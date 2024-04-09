import type { RouteObject } from 'react-router-dom'

import SummaryPage from '@/pages/report/summary/index/SummaryPage'
import DemographyPage from '@/pages/report/demography/index/DemographyPage'

const reportRoute: RouteObject = {
  path: 'report',
  name: 'Report',
  children: [
    {
      path: 'demography',
      name: 'Candidate Demography',
      element: <DemographyPage />,
    },
    {
      path: 'summary',
      name: 'Summary & Analytics',
      element: <SummaryPage />,
    },
  ],
}

export default reportRoute
