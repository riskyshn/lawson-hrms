import type { RouteObject } from 'react-router-dom'
import CandidateBlacklistedPage from '@/pages/candidates/blacklisted/index/page'
import CandidateManagementPage from '@/pages/candidates/management/index/page'
import CandidateOfferedPage from '@/pages/candidates/offered/index/page'
import CandidatePoolPage from '@/pages/candidates/pool/index/page'
import CandidateProfilePage from '@/pages/candidates/profile/index/page'
import CandidateRejectedPage from '@/pages/candidates/rejected/index/page'
import CandidateShortlistedPage from '@/pages/candidates/shortlisted/index/page'
import CandidateWithdrawPage from '@/pages/candidates/withdraw/index/page'

const candidatesRoute: RouteObject = {
  children: [
    {
      children: [
        {
          element: <CandidatePoolPage />,
          path: '',
        },
      ],
      path: 'pool',
    },
    {
      children: [
        {
          element: <CandidateManagementPage />,
          path: '',
        },
      ],
      path: 'management',
    },
    {
      children: [
        {
          element: <CandidateShortlistedPage />,
          path: '',
        },
      ],
      path: 'shortlisted',
    },
    {
      children: [
        {
          element: <CandidateRejectedPage />,
          path: '',
        },
      ],
      path: 'rejected',
    },
    {
      children: [
        {
          element: <CandidateWithdrawPage />,
          path: '',
        },
      ],
      path: 'withdraw',
    },
    {
      children: [
        {
          element: <CandidateBlacklistedPage />,
          path: '',
        },
      ],
      path: 'blacklisted',
    },
    {
      children: [
        {
          element: <CandidateOfferedPage />,
          path: '',
        },
      ],
      path: 'offered',
    },
    {
      children: [
        {
          element: <CandidateProfilePage />,
          path: '',
        },
      ],
      path: 'profile/:candidateId',
    },
  ],

  path: 'candidates',
}

export default candidatesRoute
