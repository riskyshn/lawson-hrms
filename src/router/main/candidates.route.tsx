import type { RouteObject } from 'react-router-dom'

import CandidatePoolPage from '@/pages/Main/candidates/pool/index/CandidatePoolPage'
import CandidateManagementPage from '@/pages/Main/candidates/management/index/CandidateManagementPage'
import CandidateShortlistedPage from '@/pages/Main/candidates/shortlisted/index/CandidateShortlistedPage'
import CandidateRejectedPage from '@/pages/Main/candidates/rejected/index/CandidateRejectedPage'
import CandidateWithdrawPage from '@/pages/Main/candidates/withdraw/index/CandidateWithdrawPage'
import CandidateBlacklistedPage from '@/pages/Main/candidates/blacklisted/index/CandidateBlacklistedPage'
import CandidateOfferedPage from '@/pages/Main/candidates/offered/index/CandidateOfferedPage'

const candidatesRoute: RouteObject = {
  path: 'candidates',
  name: 'Candidates',
  children: [
    {
      path: 'pool',
      name: 'Candidate Pool',
      children: [
        {
          path: '',
          element: <CandidatePoolPage />,
        },
      ],
    },
    {
      path: 'management',
      name: 'Candidate Management',
      children: [
        {
          path: '',
          element: <CandidateManagementPage />,
        },
      ],
    },
    {
      path: 'shortlisted',
      name: 'Candidate Shortlisted',
      children: [
        {
          path: '',
          element: <CandidateShortlistedPage />,
        },
      ],
    },
    {
      path: 'rejected',
      name: 'Candidate Rejected',
      children: [
        {
          path: '',
          element: <CandidateRejectedPage />,
        },
      ],
    },
    {
      path: 'withdraw',
      name: 'Candidate Withdraw',
      children: [
        {
          path: '',
          element: <CandidateWithdrawPage />,
        },
      ],
    },
    {
      path: 'blacklisted',
      name: 'Candidate Blacklisted',
      children: [
        {
          path: '',
          element: <CandidateBlacklistedPage />,
        },
      ],
    },
    {
      path: 'offered',
      name: 'Candidate Offered',
      children: [
        {
          path: '',
          element: <CandidateOfferedPage />,
        },
      ],
    },
  ],
}

export default candidatesRoute
