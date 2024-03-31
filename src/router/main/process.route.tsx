import type { RouteObject } from 'react-router-dom'

import AssessmentPage from '@/pages/process/assessment/AssessmentPage'
import InterviewPage from '@/pages/process/interview/InterviewPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import PreviewPage from '@/pages/process/offering-letter/preview/PreviewPage'
import UploadDocumentsPage from '@/pages/process/offering-letter/upload-documents/UploadDocumentsPage'
import ViewSignedPage from '@/pages/process/offering-letter/view-signed/ViewSignedPage'
import ViewPage from '@/pages/process/offering-letter/view/ViewPage'
import OnboardingPage from '@/pages/process/onboarding/index/OnboardingPage'

const candidatesRoute: RouteObject = {
  path: 'process',
  name: 'Process',
  children: [
    {
      path: 'interview',
      name: 'Interview',
      element: <InterviewPage />,
    },
    {
      path: 'assessment',
      name: 'Assessment',
      element: <AssessmentPage />,
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
          path: ':applicantId/create',
          element: <CreateOfferingLetterPage />,
        },
        {
          path: ':applicantId/upload-documents',
          element: <UploadDocumentsPage />,
        },
        {
          path: 'preview',
          element: <PreviewPage />,
        },
        {
          path: 'view',
          element: <ViewSignedPage />,
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
