import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon } from 'lucide-react'
import React from 'react'
import StatisticCards from './StatisticCards'

type PropType = {
  items?: IEmployee
  children?: React.ReactNode
}

const ProfileCard: React.FC<PropType> = ({ items, children }) => {
  const md = useBreakpoint('md')

  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <div className="flex">
          <Avatar name={items?.name || ''} size={md ? 128 : 64} className="flex bg-primary-100 text-2xl text-primary-700" />
        </div>

        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <span className="mb-2 block text-lg font-semibold lg:text-2xl">{items?.name}</span>

            <div className="mb-4 flex flex-col lg:gap-3">
              <div className="flex items-center gap-2">
                <span className="block text-sm">{items?.employment?.position?.name}</span>
              </div>

              <div className="flex flex-1 items-center gap-2">
                {items?.personalData?.phoneNumber && (
                  <div className="mr-4 flex items-center gap-2">
                    <PhoneIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{items?.personalData?.phoneNumber}</span>
                  </div>
                )}

                {items?.email && (
                  <div className="mr-4 flex items-center gap-2">
                    <MailIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{items?.email}</span>
                  </div>
                )}

                {items?.employment?.branch?.name && (
                  <div className="mr-4 flex items-center gap-2">
                    <MapPinnedIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{items?.employment?.branch?.name}</span>
                  </div>
                )}
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
