import type { RouteObject } from 'react-router-dom'

import InterviewPage from '@/pages/process/interview/index/InterviewPage'
import AssessmentPage from '@/pages/process/assessment/index/AssessmentPage'
import CreateProcessPage from '@/pages/process/assessment/create/CreateProcessPage'
import ReviewProcessPage from '@/pages/process/assessment/index/ReviewProcessPage'
import OfferingPage from '@/pages/process/assessment/index/OfferingPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import PreviewOfferingLetterPage from '@/pages/process/offering-letter/index/PreviewOfferingLetterPage'
import OnboardingPage from '@/pages/process/onboarding/index/OnboardingPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import SetupOfferingLetterPage from '@/pages/process/offering-letter/create/SetupOfferingLetterPage'
import ViewOfferingLetterPage from '@/pages/process/offering-letter/index/ViewOfferingLetterPage'

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
          path: 'setup',
          element: <SetupOfferingLetterPage />,
        },
        {
          path: 'preview',
          element: <PreviewOfferingLetterPage />,
        },
        {
          path: 'create',
          element: <CreateOfferingLetterPage />,
        },
        {
          path: 'view',
          element: <ViewOfferingLetterPage />,
        },
      ],
    },
    {
      path: 'onboarding',
      name: 'Onboarding',
      children: [
        {
          path: '',
          element: <OnboardingPage />,
        },
      ],
    },
  ],
}

export default candidatesRoute
