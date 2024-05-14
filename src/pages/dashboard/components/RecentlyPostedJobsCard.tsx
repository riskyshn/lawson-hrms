import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '@jshrms/shared/components/Elements/Layout/LoadingScreen'
import { useAsyncAction } from '@jshrms/shared/hooks'
import { dashboardService, organizationService } from '@jshrms/shared/services'
import { Button, Card, CardBody, CardHeader } from '@jshrms/ui'
import { InboxIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

const RecentlyPostedJobsCard: React.FC = () => {
  const [department_id, setDepartmentId] = useState<string>()
  const [vacancies] = useAsyncAction(dashboardService.recentlyPostedJobs, { department_id, limit: 20 })
  const [departments] = useAsyncAction(organizationService.fetchDepartments, { limit: 99999 })

  return (
    <Card className="flex h-[500px] flex-col">
      <LoadingScreen show={!vacancies || !departments} />
      {vacancies && departments && (
        <>
          <CardHeader className="h-16 font-semibold">Recently Posted Jobs</CardHeader>

          <CardBody className="p-0">
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll p-3 pb-2">
              <Card
                as="button"
                className={twJoin(
                  'flex items-center justify-center gap-2 divide-y-0 rounded-lg border px-3 py-2',
                  !department_id && 'border-primary-600 bg-primary-600 text-white',
                  !!department_id && 'hover:border-gray-300 hover:bg-gray-100',
                )}
                onClick={() => setDepartmentId(undefined)}
                type="button"
              >
                <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">All</span>
              </Card>
              {departments.content.map((el, i) => (
                <Card
                  as="button"
                  className={twJoin(
                    'flex items-center justify-center gap-2 divide-y-0 rounded-lg border px-3 py-2',
                    el.oid === department_id && 'border-primary-600 bg-primary-600 text-white',
                    el.oid !== department_id && 'hover:border-gray-300 hover:bg-gray-100',
                  )}
                  key={i}
                  onClick={() => setDepartmentId(el.oid)}
                  type="button"
                >
                  <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">{el.name}</span>
                </Card>
              ))}
            </div>
          </CardBody>
          <CardBody className="chrome-scrollbar flex flex-1 flex-col divide-y overflow-y-auto py-0">
            {vacancies.content.map((el, i) => (
              <li className="flex items-center gap-3 py-3" key={i}>
                <div className="flex-1">
                  <span className="block text-sm font-semibold">{el.name}</span>
                  <span className="block text-xs text-primary-600">{el.applicantCount} Applicants</span>
                </div>
                <Button
                  as={Link}
                  className="px-3"
                  color="primary"
                  size="small"
                  to={`/job/${el.rrNumber ? 'requisition' : 'management'}?search=${el.name}`}
                >
                  View
                </Button>
              </li>
            ))}
            {vacancies.content.length == 0 && (
              <li className="flex flex-1 flex-col items-center justify-center p-3">
                <div className="mb-4 flex animate-pulse justify-center text-gray-900">
                  <InboxIcon className="md:h-28 md:w-28" strokeWidth={0.5} />
                </div>
                <p className="mx-auto max-w-lg text-center text-sm font-light">
                  No recently posted jobs found. Check back later for updates or try adjusting filters.
                </p>
              </li>
            )}
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default RecentlyPostedJobsCard
