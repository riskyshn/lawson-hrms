import type { IEmployee, IFilterDate } from '@/types'
import React from 'react'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon } from 'lucide-react'
import { useBreakpoint } from '@/hooks'
import StatisticCards from './StatisticCards'

type PropType = {
  children?: React.ReactNode
  filterDate?: IFilterDate
  items?: IEmployee
}

const ProfileCard: React.FC<PropType> = ({ children, filterDate, items }) => {
  const md = useBreakpoint('md')

  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <div className="flex">
          <Avatar className="flex bg-primary-100 text-2xl text-primary-700" name={items?.name || ''} size={md ? 128 : 64} />
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold lg:text-2xl">{items?.name}</span>

          <div className="mt-2 flex flex-col space-y-1">
            <span className="mb-2 text-sm">{items?.employment?.position?.name}</span>

            <div className="flex flex-wrap items-start gap-2">
              {items?.personalData?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <PhoneIcon className="text-gray-400" size={14} />
                  <span className="text-sm">{items?.personalData?.phoneNumber}</span>
                </div>
              )}

              {items?.email && (
                <div className="flex items-center gap-2">
                  <MailIcon className="text-gray-400" size={14} />
                  <span className="text-sm">{items?.email}</span>
                </div>
              )}

              {items?.employment?.branch?.name && (
                <div className="flex items-center gap-2">
                  <MapPinnedIcon className="text-gray-400" size={14} />
                  <span className="text-sm">{items?.employment?.branch?.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
      <div className="p-4">
        <StatisticCards filterDate={filterDate} items={items} />
      </div>

      {children}
    </Card>
  )
}

export default ProfileCard
