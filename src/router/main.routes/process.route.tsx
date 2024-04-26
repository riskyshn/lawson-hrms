import type { RouteObject } from 'react-router-dom'

import AssessmentPage from '@/pages/process/assessment/AssessmentPage'
import InterviewPage from '@/pages/process/interview/InterviewPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import ReviseOfferingLetterPage from '@/pages/process/offering-letter/revise/ReviseOfferingLetterPage'
import UploadDocumentsPage from '@/pages/process/offering-letter/upload-documents/UploadDocumentsPage'
import UploadSignedOfferingLetterPage from '@/pages/process/offering-letter/upload-signed/UploadSignedOfferingLetterPage'
import ViewSignedPage from '@/pages/process/offering-letter/view-signed/ViewSignedPage'
import OnboardingPage from '@/pages/process/onboarding/OnboardingPage'

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
          path: ':applicantId/revise',
          element: <ReviseOfferingLetterPage />,
        },
        {
          path: ':applicantId/upload-documents',
          element: <UploadDocumentsPage />,
        },
        {
          path: ':applicantId/upload-signed',
          element: <UploadSignedOfferingLetterPage />,
        },
        {
          path: ':applicantId/view-signed',
          element: <ViewSignedPage />,
        },
      ],
    },
    {
      path: 'onboarding',
      name: 'Onboarding',
      element: <OnboardingPage />,
    },
  ],
}

export default candidatesRoute
