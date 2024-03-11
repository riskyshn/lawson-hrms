import type { RouteObject } from 'react-router-dom'
import CreateJobPage from '@/pages/Main/job/manajement/create/CreateJobPage'
import DetailJobPage from '@/pages/Main/job/manajement/detail/DetailJobPage'
import EditJobPage from '@/pages/Main/job/manajement/edit/EditJobPage'
import JobManajementPage from '@/pages/Main/job/manajement/index/JobManajementPage'
import RecruitmentStagesPage from '@/pages/Main/job/manajement/recruitment-stages/RecruitmentStagesPage'
import ApproveListPage from '@/pages/Main/job/requisition/approve-list/ApproveListPage'
import CreateJobRequisitionPage from '@/pages/Main/job/requisition/create/CreateJobRequisitionPage'
import DetailJobRequisitionPage from '@/pages/Main/job/requisition/detail/DetailJobRequisitionPage'
import EditJobRequisitionPage from '@/pages/Main/job/requisition/edit/EditJobRequisitionPage'
import JobRequisitionPage from '@/pages/Main/job/requisition/index/JobRequisitionPage'

const jobRoute: RouteObject = {
  path: 'job',
  name: 'Job',
  children: [
    {
      path: 'management',
      name: 'Management',
      children: [
        {
          path: '',
          element: <JobManajementPage />,
        },
        {
          path: ':vacancyId',
          name: 'Detail',
          element: <DetailJobPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateJobPage />,
        },
        {
          path: ':vacancyId/edit',
          name: 'Edit',
          element: <EditJobPage />,
        },
        {
          path: 'recruitment-stages',
          name: 'Recruitment Stages',
          element: <RecruitmentStagesPage />,
        },
      ],
    },
    {
      path: 'requisition',
      name: 'Requisition',
      children: [
        {
          path: '',
          element: <JobRequisitionPage />,
        },
        {
          path: ':vacancyId',
          name: 'Detail',
          element: <DetailJobRequisitionPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateJobRequisitionPage />,
        },
        {
          path: ':vacancyId/edit',
          name: 'Edit',
          element: <EditJobRequisitionPage />,
        },
        {
          path: 'approve-list',
          name: 'Approve List',
          element: <ApproveListPage />,
        },
      ],
    },
  ],
}

export default jobRoute
