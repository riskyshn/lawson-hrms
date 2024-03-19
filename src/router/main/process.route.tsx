import type { RouteObject } from 'react-router-dom'

import CandidateRejectedPage from '@/pages/candidates/rejected/index/CandidateRejectedPage'
import InterviewPage from '@/pages/process/interview/index/InterviewPage'
import AssessmentPage from '@/pages/process/assessment/index/AssessmentPage'
import CreateProcessPage from '@/pages/process/assessment/create/CreateProcessPage'
import ReviewProcessPage from '@/pages/process/assessment/index/ReviewProcessPage'
import OfferingPage from '@/pages/process/assessment/index/OfferingPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import PreviewOfferingLetterPage from '@/pages/process/offering-letter/index/PreviewOfferingLetterPage'

const candidatesRoute: RouteObject = {
  path: 'process',
  name: 'Process',
  children: [
    {
      path: 'interview',
      name: 'Interview',
      children: [
        {
          path: '',
          element: <InterviewPage />,
        },
      ],
    },
    {
      path: 'assessment',
      name: 'Assessment',
      children: [
        {
          path: '',
          element: <AssessmentPage />,
        },
        {
          path: ':candidateId/process',
          element: <CreateProcessPage />,
        },
        {
          path: ':candidateId/process/view',
          element: <ReviewProcessPage />,
        },
        {
          path: ':candidateId/offering-letter',
          element: <OfferingPage />,
        },
      ],
    },
    {
      path: 'offering-letter',
      name: 'Offering Letter',
      children: [
        {
          path: '',
          element: <OfferingLetterPage />,
        },
        {
          path: 'create',
          element: <CreateOfferingLetterPage />,
        },
        {
          path: 'preview',
          element: <PreviewOfferingLetterPage />,
        },
      ],
    },
    {
      path: 'onboarding',
      name: 'Onboarding',
      children: [
        {
          path: '',
          element: <CandidateRejectedPage />,
        },
      ],
    },
  ],
}

export default candidatesRoute
