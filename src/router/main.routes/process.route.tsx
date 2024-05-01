import type { RouteObject } from 'react-router-dom'

import AssessmentPage from '@/pages/process/assessment/AssessmentPage'
import InterviewPage from '@/pages/process/interview/InterviewPage'
import CreateOfferingLetterPage from '@/pages/process/offering-letter/create/CreateOfferingLetterPage'
import OfferingLetterPage from '@/pages/process/offering-letter/index/OfferingLetterPage'
import PreviewOfferingLetterPage from '@/pages/process/offering-letter/preview/PreviewOfferingLetterPage'
import ReviseOfferingLetterPage from '@/pages/process/offering-letter/revise/ReviseOfferingLetterPage'
import UploadDocumentsPage from '@/pages/process/offering-letter/upload-documents/UploadDocumentsPage'
import UploadSignedOfferingLetterPage from '@/pages/process/offering-letter/upload-signed/UploadSignedOfferingLetterPage'
import ViewSignedPage from '@/pages/process/offering-letter/view-signed/ViewSignedPage'
import OnboardingPage from '@/pages/process/onboarding/OnboardingPage'

const candidatesRoute: RouteObject = {
  children: [
    {
      element: <InterviewPage />,
      name: 'Interview',
      path: 'interview',
    },
    {
      element: <AssessmentPage />,
      name: 'Assessment',
      path: 'assessment',
    },
    {
      children: [
        {
          element: <OfferingLetterPage />,
          path: '',
        },
        {
          element: <CreateOfferingLetterPage />,
          path: ':applicantId/create',
        },
        {
          element: <ReviseOfferingLetterPage />,
          path: ':applicantId/revise',
        },
        {
          element: <UploadDocumentsPage />,
          path: ':applicantId/upload-documents',
        },
        {
          element: <UploadSignedOfferingLetterPage />,
          path: ':applicantId/upload-signed',
        },
        {
          element: <ViewSignedPage />,
          path: ':applicantId/view-signed',
        },
        {
          element: <PreviewOfferingLetterPage />,
          path: ':applicantId/preview',
        },
      ],
      name: 'Offering Letter',
      path: 'offering-letter',
    },
    {
      element: <OnboardingPage />,
      name: 'Onboarding',
      path: 'onboarding',
    },
  ],
  name: 'Process',
  path: 'process',
}

export default candidatesRoute
