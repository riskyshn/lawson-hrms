import type { RouteObject } from 'react-router-dom'

import CandidatePoolPage from '@/pages/candidates/pool/index/CandidatePoolPage'
import CandidateManagementPage from '@/pages/candidates/management/index/CandidateManagementPage'
import CandidateShortlistedPage from '@/pages/candidates/shortlisted/index/CandidateShortlistedPage'
import CandidateRejectedPage from '@/pages/candidates/rejected/index/CandidateRejectedPage'
import CandidateWithdrawPage from '@/pages/candidates/withdraw/index/CandidateWithdrawPage'
import CandidateBlacklistedPage from '@/pages/candidates/blacklisted/index/CandidateBlacklistedPage'
import CandidateOfferedPage from '@/pages/candidates/offered/index/CandidateOfferedPage'
import CandidateProfilePage from '@/pages/candidates/profile/index/CandidateProfilePage'

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
    {
      path: 'profile/:candidateId',
      name: 'Candidate Profile',
      children: [
        {
          path: '',
          element: <CandidateProfilePage />,
        },
      ],
    },
  ],
}

export default candidatesRoute
