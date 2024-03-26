import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon, StarsIcon, User2Icon } from 'lucide-react'
import React from 'react'

type PropType = {
  items?: ICandidate
  children?: React.ReactNode
}

const ProfileCard: React.FC<PropType> = ({ items, children }) => {
  const md = useBreakpoint('md')

  if (!items) return null

  return (
    <Card>
      <CardBody className="flex gap-3">
        <div className="flex">
          <Avatar name={items.name || ''} size={md ? 128 : 64} className="flex bg-primary-100 text-2xl text-primary-700" />
        </div>
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <span className="mb-2 block text-lg font-semibold lg:text-2xl">{items.name || '-'}</span>
            <div className="flex lg:gap-3">
              <div className="flex items-center gap-2">
                <PhoneIcon className="text-gray-400" size={14} />
                <span className="block text-sm">{items.phone || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="text-gray-400" size={14} />
                <a className="block text-sm hover:text-primary-600" target="_blank" href={`mailto:${items.email || '-'}`}>
                  {items.email || '-'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPinnedIcon className="text-gray-400" size={14} />
                <span className="block text-sm">
                  {items.city}, {items.province || '-'}
                </span>
              </div>
            </div>
            <div className="flex lg:gap-3">
              <div className="flex items-center gap-2">
                <StarsIcon className="text-gray-400" size={14} />
                <span className="block text-sm">{items.gender || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <User2Icon className="text-gray-400" size={14} />
                <span className="block text-sm">{items.age || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      {children}
    </Card>
  )
}

export default ProfileCard
