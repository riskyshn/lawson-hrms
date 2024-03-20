import type { RouteObject } from 'react-router-dom'

import InterviewPage from '@/pages/process/interview/index/InterviewPage'
import AssessmentPage from '@/pages/process/assessment/index/AssessmentPage'
import UploadPage from '@/pages/process/offering-letter/upload/UploadPage'
import ViewPage from '@/pages/process/offering-letter/view/ViewPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import PreviewPage from '@/pages/process/offering-letter/preview/PreviewPage'
import OnboardingPage from '@/pages/process/onboarding/index/OnboardingPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import SetupPage from '@/pages/process/offering-letter/setup/SetupPage'
import ViewSignedPage from '@/pages/process/offering-letter/view-signed/ViewSignedPage'

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
          element: <SetupPage />,
        },
        {
          path: 'preview',
          element: <PreviewPage />,
        },
        {
          path: 'create',
          element: <CreateOfferingLetterPage />,
        },
        {
          path: 'view',
          element: <ViewSignedPage />,
        },
        {
          path: 'upload-document',
          element: <UploadPage />,
        },
        {
          path: ':candidateId/view/offering-letter',
          element: <ViewPage />,
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
