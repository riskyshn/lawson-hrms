import React from 'react'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'

const UpcomingScheduleCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="h-16 font-semibold">
        Upcoming Schedule
        <span className="block text-xs font-normal text-gray-500">Wednesday, 24 January 2024</span>
      </CardHeader>
      <CardBody as="ul" className="chrome-scrollbar flex max-h-80 flex-col gap-3 overflow-y-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <li
            key={i}
            className="flex cursor-pointer flex-col gap-1 rounded-lg border border-l-4 border-l-success-300 bg-gray-50 p-2 transition-colors hover:border-success-300"
          >
            <span className="block text-sm">13:30 - 14:00</span>
            <span className="block text-sm font-semibold">
              Business Development Manager (B2B) Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <span className="block text-xs text-gray-500">Lead by Ayu Rosyidah</span>
          </li>
        ))}
      </CardBody>
    </Card>
  )
}

export default UpcomingScheduleCard
