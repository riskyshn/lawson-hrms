import React from 'react'
import { Button, Card, CardBody, CardHeader } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { SmileIcon } from 'lucide-react'

const RecentlyPostedJobsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="h-16 font-semibold">Recently Posted Jobs</CardHeader>
      <CardBody className="p-0">
        <div className="chrome-scrollbar flex gap-3 overflow-x-scroll p-3 pb-2">
          {Array.from(Array(10)).map((_, i) => (
            <Card
              as="button"
              key={i}
              className={twJoin(
                'flex items-center justify-center gap-2 divide-y-0 rounded-lg border p-3',
                i == 1 && 'border-primary-600 bg-primary-600 text-white',
                i != 1 && 'hover:border-gray-300 hover:bg-gray-100',
              )}
            >
              <span className="flex w-full items-center justify-center">
                <SmileIcon size={18} />
              </span>
              <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">Departement</span>
            </Card>
          ))}
        </div>
      </CardBody>
      <CardBody as="ul" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
        {Array.from(Array(10)).map((_, i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <div className="flex-1">
              <span className="block text-sm font-semibold">Flutter Developer</span>
              <span className="block text-xs text-primary-600">134 Applicants</span>
            </div>
            <div>
              <Button color="primary" size="small" className="px-3">
                View
              </Button>
            </div>
          </li>
        ))}
      </CardBody>
    </Card>
  )
}

export default RecentlyPostedJobsCard
