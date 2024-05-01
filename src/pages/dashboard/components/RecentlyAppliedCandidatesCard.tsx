import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/core/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'
import { InboxIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const RecentlyAppliedCandidatesCard: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.recentlyApplied, { limit: 20 })

  return (
    <Card className="flex h-[500px] flex-col">
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="h-16 font-semibold">Recently Applied Candidates</CardHeader>
          <CardBody as="ul" className="chrome-scrollbar flex flex-1 flex-col divide-y overflow-y-auto py-0">
            {pageData.content.map((el, i) => (
              <li className="flex items-center gap-3 py-3" key={i}>
                <Avatar
                  className="bg-gray-100 text-primary-600"
                  name={el.candidate?.name || ''}
                  size={48}
                  src={el.candidate?.photoProfile}
                />
                <div className="flex-1">
                  <span className="block text-sm font-semibold">{el.candidate?.name}</span>
                  <span className="block text-xs text-gray-500">
                    {el.vacancy?.name}
                    {el.vacancy?.rrNumber ? ` | ${el.vacancy.rrNumber}` : ''}
                  </span>
                </div>
                <Button as={Link} className="px-3" color="primary" size="small" to={`/candidates/management?search=${el.candidate?.name}`}>
                  View
                </Button>
              </li>
            ))}
            {pageData.content.length == 0 && (
              <li className="flex flex-1 flex-col items-center justify-center p-3">
                <div className="mb-4 flex animate-pulse justify-center text-gray-900">
                  <InboxIcon className="md:h-28 md:w-28" strokeWidth={0.5} />
                </div>
                <p className="mx-auto max-w-lg text-center text-sm font-light">
                  No recently applied candidates found. Keep an eye out for new applicants!
                </p>
              </li>
            )}
          </CardBody>
          <CardFooter>
            <Button as={Link} block color="primary" to="/candidates/management" variant="light">
              See All Applicants
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default RecentlyAppliedCandidatesCard
