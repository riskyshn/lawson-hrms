import type { ICandidate } from '@/types'
import React from 'react'
import { Avatar, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, PhoneIcon, StarsIcon, User2Icon } from 'lucide-react'
import { useBreakpoint } from '@/hooks'

type PropType = {
  children?: React.ReactNode
  items?: ICandidate
}

const ProfileCard: React.FC<PropType> = ({ children, items }) => {
  const md = useBreakpoint('md')

  if (!items) return null

  return (
    <Card>
      <CardBody className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center justify-center lg:justify-start">
          {items.candidate.photoProfile ? (
            <img
              alt={items.candidate.photoProfile}
              className="block rounded-lg object-cover"
              src={items.candidate.photoProfile}
              style={{
                height: md ? '128px' : '64px',
                width: md ? '128px' : '64px',
              }}
            />
          ) : (
            <Avatar className="flex bg-primary-100 text-2xl text-primary-700" name={items.candidate.name || ''} size={md ? 128 : 64} />
          )}
        </div>
        <div className="mb-2 ml-2 flex flex-1 flex-col gap-3 lg:ml-0">
          <span className="block text-lg font-semibold lg:text-2xl">{items.candidate.name || '-'}</span>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="flex items-center gap-2">
              <PhoneIcon className="text-gray-400" size={14} />
              <span className="block text-sm">{items.candidate.phone || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="text-gray-400" size={14} />
              <a
                className="block text-sm hover:text-primary-600"
                href={`mailto:${items.candidate.email || '-'}`}
                target="_blank"
                rel="noreferrer"
              >
                {items.candidate.email || '-'}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPinnedIcon className="text-gray-400" size={14} />
              <span className="block text-sm">
                {items.candidate.city}, {items.candidate.province || '-'}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="flex items-center gap-2">
              <StarsIcon className="text-gray-400" size={14} />
              <span className="block text-sm">{items.candidate.gender || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <User2Icon className="text-gray-400" size={14} />
              <span className="block text-sm">{items.candidate.age || '-'} Tahun</span>
            </div>
          </div>
        </div>
      </CardBody>
      {children}
    </Card>
  )
}

export default ProfileCard
