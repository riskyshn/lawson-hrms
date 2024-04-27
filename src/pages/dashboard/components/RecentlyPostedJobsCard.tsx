import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import useAsyncSearch from '@/core/hooks/use-async-search'
import { dashboardService, organizationService } from '@/services'
import { Button, Card, CardBody, CardHeader } from 'jobseeker-ui'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

const RecentlyPostedJobsCard: React.FC = () => {
  const [department_id, setDepartmentId] = useState<string>()
  const { pageData, isLoading } = useAsyncSearch(dashboardService.recentlyPostedJobs, { limit: 20, department_id })
  const [departments] = useAsyncAction(organizationService.fetchDepartments, { limit: 100 * 100 })

  return (
    <Card>
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="h-16 font-semibold">Recently Posted Jobs</CardHeader>
          <CardBody className="p-0">
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll p-3 pb-2">
              <Card
                as="button"
                type="button"
                className={twJoin(
                  'flex items-center justify-center gap-2 divide-y-0 rounded-lg border px-3 py-2',
                  !department_id && 'border-primary-600 bg-primary-600 text-white',
                  !!department_id && 'hover:border-gray-300 hover:bg-gray-100',
                )}
                onClick={() => setDepartmentId(undefined)}
              >
                <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">All</span>
              </Card>
              {departments?.content.map((el, i) => (
                <Card
                  key={i}
                  as="button"
                  type="button"
                  className={twJoin(
                    'flex items-center justify-center gap-2 divide-y-0 rounded-lg border px-3 py-2',
                    el.oid === department_id && 'border-primary-600 bg-primary-600 text-white',
                    el.oid !== department_id && 'hover:border-gray-300 hover:bg-gray-100',
                  )}
                  onClick={() => setDepartmentId(el.oid)}
                >
                  <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">{el.name}</span>
                </Card>
              ))}
            </div>
          </CardBody>
          <CardBody className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
            {!isLoading &&
              pageData.content.map((el, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <div className="flex-1">
                    <span className="block text-sm font-semibold">{el.name}</span>
                    <span className="block text-xs text-primary-600">{el.applicantCount} Applicants</span>
                  </div>
                  <Button
                    as={Link}
                    to={`/job/${el.rrNumber ? 'requisition' : 'management'}?search=${el.name}`}
                    color="primary"
                    size="small"
                    className="px-3"
                  >
                    View
                  </Button>
                </li>
              ))}
            <LoadingScreen show={isLoading} />
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default RecentlyPostedJobsCard
