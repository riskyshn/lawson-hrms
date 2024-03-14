import React from 'react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'

const RecentlyAppliedCandidatesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="h-16 font-semibold">Recently Applied Candidates</CardHeader>
      <CardBody as="ul" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <div>
              <Avatar name="Jhon Doe" className="bg-gray-100 text-primary-600" size={48} />
            </div>
            <div className="flex-1">
              <span className="block text-sm font-semibold">John Doe</span>
              <span className="block text-xs text-gray-500">Vacancy Name | RR Number</span>
            </div>
            <div>
              <Button color="primary" size="small" className="px-3">
                View
              </Button>
            </div>
          </li>
        ))}
      </CardBody>
      <CardFooter>
        <Button block color="primary" variant="light">
          See All Applicants
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RecentlyAppliedCandidatesCard
