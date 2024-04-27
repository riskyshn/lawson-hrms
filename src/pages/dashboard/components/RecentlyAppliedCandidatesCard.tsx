import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/core/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'
import React from 'react'
import { Link } from 'react-router-dom'

const RecentlyAppliedCandidatesCard: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.recentlyApplied, { limit: 20 })

  return (
    <Card>
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="h-16 font-semibold">Recently Applied Candidates</CardHeader>
          <CardBody as="ul" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
            {pageData.content.map((el, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <Avatar
                  name={el.candidate?.name || ''}
                  src={el.candidate?.photoProfile}
                  className="bg-gray-100 text-primary-600"
                  size={48}
                />
                <div className="flex-1">
                  <span className="block text-sm font-semibold">{el.candidate?.name}</span>
                  <span className="block text-xs text-gray-500">
                    {el.vacancy?.name}
                    {el.vacancy?.rrNumber ? ` | ${el.vacancy.rrNumber}` : ''}
                  </span>
                </div>
                <Button as={Link} to={`/candidates/management?search=${el.candidate?.name}`} color="primary" size="small" className="px-3">
                  View
                </Button>
              </li>
            ))}
          </CardBody>
          <CardFooter>
            <Button as={Link} to="/candidates/management" block color="primary" variant="light">
              See All Applicants
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default RecentlyAppliedCandidatesCard
