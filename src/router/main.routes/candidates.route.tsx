import type { RouteObject } from 'react-router-dom'

import CandidateBlacklistedPage from '@/pages/candidates/blacklisted/index/CandidateBlacklistedPage'
import CandidateManagementPage from '@/pages/candidates/management/index/CandidateManagementPage'
import CandidateOfferedPage from '@/pages/candidates/offered/index/CandidateOfferedPage'
import CandidatePoolPage from '@/pages/candidates/pool/index/CandidatePoolPage'
import CandidateProfilePage from '@/pages/candidates/profile/index/CandidateProfilePage'
import CandidateRejectedPage from '@/pages/candidates/rejected/index/CandidateRejectedPage'
import CandidateShortlistedPage from '@/pages/candidates/shortlisted/index/CandidateShortlistedPage'
import CandidateWithdrawPage from '@/pages/candidates/withdraw/index/CandidateWithdrawPage'

const candidatesRoute: RouteObject = {
  children: [
    {
      children: [
        {
          element: <CandidatePoolPage />,
          path: '',
        },
      ],
      name: 'Candidate Pool',
      path: 'pool',
    },
    {
      children: [
        {
          element: <CandidateManagementPage />,
          path: '',
        },
      ],
      name: 'Candidate Management',
      path: 'management',
    },
    {
      children: [
        {
          element: <CandidateShortlistedPage />,
          path: '',
        },
      ],
      name: 'Candidate Shortlisted',
      path: 'shortlisted',
    },
    {
      children: [
        {
          element: <CandidateRejectedPage />,
          path: '',
        },
      ],
      name: 'Candidate Rejected',
      path: 'rejected',
    },
    {
      children: [
        {
          element: <CandidateWithdrawPage />,
          path: '',
        },
      ],
      name: 'Candidate Withdraw',
      path: 'withdraw',
    },
    {
      children: [
        {
          element: <CandidateBlacklistedPage />,
          path: '',
        },
      ],
      name: 'Candidate Blacklisted',
      path: 'blacklisted',
    },
    {
      children: [
        {
          element: <CandidateOfferedPage />,
          path: '',
        },
      ],
      name: 'Candidate Offered',
      path: 'offered',
    },
    {
      children: [
        {
          element: <CandidateProfilePage />,
          path: '',
        },
      ],
      name: 'Candidate Profile',
      path: 'profile/:candidateId',
    },
  ],
  name: 'Candidates',
  path: 'candidates',
}

export default candidatesRoute
