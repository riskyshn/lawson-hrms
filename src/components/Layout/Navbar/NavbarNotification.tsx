import useAsyncSearch from '@/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Menu } from '@headlessui/react'
import { Avatar, Badge, Button, CardBody } from 'jobseeker-ui'
import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarNotification: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.recentlyApplied, { limit: 20 })
  const [viewMode, setViewMode] = useState<'applicants' | 'vacancies'>('applicants')

  const dummyVacanciesData = {
    data: {
      content: [
        {
          company: {
            name: 'PT. Sonton Food Indonesia',
            oid: '66106acfd0627d4539a1ed33',
          },
          candidate: {
            name: 'val val',
            email: 'valval@mail.com',
            photoProfile: 'https://s3-bucket.api-jobseeker.site/photo-profile/2b7457412d9f4a0fa49da93363e4ce09.png',
            oid: '662093632fa8be3ca5bb7732',
          },
          vacancy: {
            name: 'cek error fajar',
            oid: '661f44b45eb67bc0212aca3c',
            rrNumber: '#PT.000004',
          },
          activity: {
            applyProcess: 'Interview HR',
            status: 'PASSED',
            type: 'INTERVIEW',
            from: 'HRMS.Basic',
            actionAt: '2024-04-26T21:36:00',
            notes: 'good',
            file: null,
            createdAt: '2024-04-18T22:37:05.999',
            updatedAt: '2024-04-18T22:37:43.643',
            oid: '66213011968ed453cdf6fbf3',
          },
          message: 'Applicant has been scheduled for an interview',
          flag: 'INTERVIEW',
          oid: '66213a0c187c746f6b0e4979',
        },
        {
          company: {
            name: 'PT. Global Solutions',
            oid: '66106bcf8fd7d4539b3e3d7',
          },
          candidate: {
            name: 'John Doe',
            email: 'johndoe@mail.com',
            photoProfile: 'https://example.com/photo-profile/johndoe.png',
            oid: '662094763fa8be3cb3bc7731',
          },
          vacancy: {
            name: 'Software Developer',
            oid: '661f34c45eb67bc0612ada9a',
            rrNumber: '#PT.000005',
          },
          activity: {
            applyProcess: 'Technical Interview',
            status: 'SCHEDULED',
            type: 'INTERVIEW',
            from: 'HRMS.Basic',
            actionAt: '2024-04-27T14:00:00',
            notes: 'Looking forward to discussing the role',
            file: null,
            createdAt: '2024-04-19T09:00:00',
            updatedAt: '2024-04-19T10:00:00',
            oid: '662132e0968ed453cdf6fc3a',
          },
          message: 'Applicant has been scheduled for a technical interview',
          flag: 'INTERVIEW',
          oid: '66213c0c197c746f6c0e4978',
        },
        {
          company: {
            name: 'PT. Innovation Labs',
            oid: '66216ac8fd73f4539b3e4d7',
          },
          candidate: {
            name: 'Jane Smith',
            email: 'janesmith@mail.com',
            photoProfile: 'https://example.com/photo-profile/janesmith.png',
            oid: '662098762fa8be3cb3ac6312',
          },
          vacancy: {
            name: 'Project Manager',
            oid: '661f24a45eb67bc0312bc9a8',
            rrNumber: '#PT.000006',
          },
          activity: {
            applyProcess: 'Final Interview',
            status: 'PASSED',
            type: 'INTERVIEW',
            from: 'HRMS.Basic',
            actionAt: '2024-04-27T10:00:00',
            notes: 'Candidate performed well',
            file: null,
            createdAt: '2024-04-19T11:00:00',
            updatedAt: '2024-04-19T12:00:00',
            oid: '6621b03f068ed43a8ef6fc3b',
          },
          message: 'Applicant passed the final interview',
          flag: 'INTERVIEW',
          oid: '66213b1c197c746f8b0e4964',
        },
        {
          company: {
            name: 'PT. Digital Horizon',
            oid: '66216c9f8d73d4539a3e3e7',
          },
          candidate: {
            name: 'Emily Chang',
            email: 'emilychang@mail.com',
            photoProfile: 'https://example.com/photo-profile/emilychang.png',
            oid: '662093832fa8be7cd5cc7733',
          },
          vacancy: {
            name: 'Data Scientist',
            oid: '661f14d45eb67ccf4124dc3d',
            rrNumber: '#PT.000007',
          },
          activity: {
            applyProcess: 'HR Screening',
            status: 'SCHEDULED',
            type: 'INTERVIEW',
            from: 'HRMS.Basic',
            actionAt: '2024-04-26T11:00:00',
            notes: 'Initial screening with HR',
            file: null,
            createdAt: '2024-04-19T14:00:00',
            updatedAt: '2024-04-19T15:00:00',
            oid: '66213c3f068ed53d9f6fc3e',
          },
          message: 'Applicant has been scheduled for HR screening',
          flag: 'INTERVIEW',
          oid: '66213c0e197c746f9d0e4978',
        },
        {
          company: {
            name: 'PT. Tech Innovations',
            oid: '66216df8c9fd4d4539b3d3d8',
          },
          candidate: {
            name: 'David Lee',
            email: 'davidlee@mail.com',
            photoProfile: 'https://example.com/photo-profile/davidlee.png',
            oid: '662093732fa8be7cd4cc7734',
          },
          vacancy: {
            name: 'UX Designer',
            oid: '661f03d45eb67bc0412ad3b3',
            rrNumber: '#PT.000008',
          },
          activity: {
            applyProcess: 'Design Review',
            status: 'PASSED',
            type: 'INTERVIEW',
            from: 'HRMS.Basic',
            actionAt: '2024-04-25T13:00:00',
            notes: 'Excellent design portfolio',
            file: null,
            createdAt: '2024-04-19T16:00:00',
            updatedAt: '2024-04-19T17:00:00',
            oid: '6621df1f068ed63a9f6fc3c',
          },
          message: 'Applicant has passed the design review',
          flag: 'INTERVIEW',
          oid: '6621df0e197c746f8e0e4967',
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalPages: 1,
      totalElements: 6,
      first: true,
      size: 10,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      numberOfElements: 6,
      empty: false,
    },
    meta: {
      code: 200,
      message: 'Successfully saved',
      status: 'OK',
    },
  }

  const handleViewApplicants = () => setViewMode('applicants')
  const handleViewVacancies = () => setViewMode('vacancies')
  const [currentPage, setCurrentPage] = useState(0)
  const [displayedData, setDisplayedData] = useState(dummyVacanciesData.data.content.slice(0, 3))

  const hasMoreItems = viewMode === 'vacancies' ? dummyVacanciesData.data.content.length > displayedData.length : false
  const handleViewMore = () => {
    const nextPage = currentPage + 1
    const startIndex = nextPage * 3
    const endIndex = startIndex + 3
    const newData = dummyVacanciesData.data.content.slice(startIndex, endIndex)
    setDisplayedData((prevData) => [...prevData, ...newData])
    setCurrentPage(nextPage)
  }

  const renderContent = () => {
    if (viewMode === 'applicants') {
      if (pageData) {
        return (
          <div className="p-3">
            <CardBody as="div" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
              {pageData.content.map((el, i) => (
                <Link key={el.oid || i} to={`/candidates/management?search=${el.candidate?.name}`}>
                  <li className="flex items-center gap-3 py-3">
                    <Avatar
                      name={el.candidate?.name || ''}
                      src={el.candidate?.photoProfile}
                      className="bg-gray-100 text-primary-600"
                      size={48}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-semibold">{el.candidate?.name}</span>
                      <span className="block text-xs text-gray-600">
                        {el.vacancy?.name}
                        {el.vacancy?.rrNumber ? ` | ${el.vacancy.rrNumber}` : ''}
                      </span>
                      <span className="block text-xs text-gray-400">{el.applyDate}</span>
                    </div>
                  </li>
                </Link>
              ))}
            </CardBody>
          </div>
        )
      }
    } else if (viewMode === 'vacancies') {
      return (
        <div className="p-3">
          <CardBody className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
            {displayedData.map((el, i) => (
              <Link key={el.oid || i} to={`/candidates/management?search=${el.candidate?.name}`}>
                <li key={i} className="flex items-center gap-3 py-3">
                  <Avatar
                    name={el.candidate?.name || ''}
                    src={el.candidate?.photoProfile}
                    className="bg-gray-100 text-primary-600"
                    size={48}
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-semibold">{el.candidate?.name}</span>
                    <span className="block text-sm text-gray-600">{el.message}</span>
                    <span className="block text-xs text-gray-400">{el.activity.actionAt}</span>
                  </div>
                </li>
              </Link>
            ))}
            {hasMoreItems && (
              <div className="flex w-full flex-1 pt-3 text-center">
                <Button className="w-full" variant="default" color="primary" onClick={handleViewMore}>
                  View More
                </Button>
              </div>
            )}
          </CardBody>
        </div>
      )
    }
    return null
  }

  return (
    <Menu>
      <Menu.Button as={Button} iconOnly variant="light">
        <Badge color="error" size="small" className="absolute -right-1.5 -top-1.5 min-w-4 font-semibold">
          27
        </Badge>
        <Bell size={16} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 top-14 w-full rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none md:w-96">
        <span className="absolute -top-1 right-28 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
        <div className="relative z-10 bg-white p-3 pt-4">
          <span className="text-lg">Notifications</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-3">
          <Button onClick={handleViewApplicants} variant="light" color={viewMode === 'applicants' ? 'primary' : 'default'}>
            Applicants
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              {pageData?.totalElements}
            </Badge>
          </Button>
          <Button onClick={handleViewVacancies} variant="light" color={viewMode === 'vacancies' ? 'primary' : 'default'}>
            Vacancies
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              {dummyVacanciesData.data.totalElements}
            </Badge>
          </Button>
        </div>

        {renderContent()}
      </Menu.Items>
    </Menu>
  )
}

export default NavbarNotification
