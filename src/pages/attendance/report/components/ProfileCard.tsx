import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon } from 'lucide-react'
import React from 'react'
import StatisticCards from './StatisticCards'

type PropType = {
  children?: React.ReactNode
}

const ProfileCard: React.FC<PropType> = ({ children }) => {
  const md = useBreakpoint('md')

  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <div className="flex">
          <Avatar name={'John Doe'} size={md ? 128 : 64} className="flex bg-primary-100 text-2xl text-primary-700" />
        </div>
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <span className="mb-2 block text-lg font-semibold lg:text-2xl">{'John Doe'}</span>
            <div className="mb-4 flex flex-col lg:gap-3">
              <div className="flex items-center gap-2">
                <span className="block text-sm">{'Talent Acquisition Specialist | Creative Department'}</span>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="mr-4 flex items-center gap-2">
                  <PhoneIcon className="text-gray-400" size={14} />
                  <span className="block text-sm">{'+628111108109'}</span>
                </div>
                <div className="mr-4 flex items-center gap-2">
                  <MailIcon className="text-gray-400" size={14} />
                  <p className="block text-sm">{'budi@email.com'}</p>
                </div>
                <div className="mr-4 flex items-center gap-2">
                  <MapPinnedIcon className="text-gray-400" size={14} />
                  <p className="block text-sm">{'Jakarta'}</p>
                </div>
              </div>
            </div>
            <StatisticCards />
          </div>
        </div>
      </CardBody>
      {children}
    </Card>
  )
}

export default ProfileCard
