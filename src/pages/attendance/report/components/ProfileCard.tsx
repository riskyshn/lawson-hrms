import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon } from 'lucide-react'
import React from 'react'
import StatisticCards from './StatisticCards'

type ProfileData = {
  name?: string
  title?: string
  phone?: string
  email?: string
  location?: string
  avatarUrl?: string
}

type PropType = {
  items?: ProfileData
  children?: React.ReactNode
}

const ProfileCard: React.FC<PropType> = ({ items = {}, children }) => {
  const md = useBreakpoint('md')

  // Destructure the items prop for easier access
  const {
    name = 'Name not available',
    title = 'Title not available',
    phone = 'Phone not available',
    email = 'Email not available',
    location = 'Location not available',
    avatarUrl,
  } = items

  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        {/* Display Avatar */}
        <div className="flex">
          <Avatar name={name} size={md ? 128 : 64} src={avatarUrl} className="flex bg-primary-100 text-2xl text-primary-700" />
        </div>

        {/* Display Profile Details */}
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            {/* Display Name */}
            <span className="mb-2 block text-lg font-semibold lg:text-2xl">{name}</span>

            {/* Display Title */}
            <div className="mb-4 flex flex-col lg:gap-3">
              <div className="flex items-center gap-2">
                <span className="block text-sm">{title}</span>
              </div>

              {/* Display Contact Details */}
              <div className="flex flex-1 items-center gap-2">
                {/* Display Phone */}
                {phone && (
                  <div className="mr-4 flex items-center gap-2">
                    <PhoneIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{phone}</span>
                  </div>
                )}

                {/* Display Email */}
                {email && (
                  <div className="mr-4 flex items-center gap-2">
                    <MailIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{email}</span>
                  </div>
                )}

                {/* Display Location */}
                {location && (
                  <div className="mr-4 flex items-center gap-2">
                    <MapPinnedIcon className="text-gray-400" size={14} />
                    <span className="block text-sm">{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Display Statistics */}
            <StatisticCards />
          </div>
        </div>
      </CardBody>

      {/* Display children components */}
      {children}
    </Card>
  )
}

export default ProfileCard
