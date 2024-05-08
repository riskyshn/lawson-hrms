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
