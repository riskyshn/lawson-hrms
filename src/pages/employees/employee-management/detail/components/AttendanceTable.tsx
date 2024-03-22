import React, { useState } from 'react'
import MainTable from '@/components/Elements/MainTable'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import PreviewMapsModal from './PreviewMapsModal'
import PreviewImageModal from './PreviewImageModal'
import { Card } from 'jobseeker-ui'

const dummyAttendance = [
  {
    date: '18/03/2024',
    type: [
      {
        name: 'Clock In',
        time: '08:40:35',
        status: 'Pending',
        location: {
          lat: -8.7931195,
          lng: 115.1501316,
        },
        attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      },
      {
        name: 'Clock Out',
        time: '17:30:00',
        status: 'Completed',
        location: {
          lat: -8.7931195,
          lng: 115.1501316,
        },
        attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      },
    ],
  },
]

const AttendanceTable: React.FC<{ employee: IEmployee }> = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null)

  const handleView = (status: string, location: { lat: number; lng: number } | null, attachment: string | null) => {
    if (status == 'maps') {
      setSelectedLocation(location)
    }

    if (status == 'image') {
      setSelectedAttachment(attachment)
    }
  }

  const headerItems = [
    { children: 'Date', className: 'text-left' },
    { children: 'Type', className: 'text-left' },
    { children: 'Time', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
    { children: 'Location', className: 'text-left' },
    { children: 'Attachment', className: 'text-left' },
  ]

  const bodyItems = dummyAttendance.map((item) => ({
    items: [
      {
        children: item.date,
      },
      {
        children: (
          <>
            <span className="block">{item.type[0].name}</span>
            <span>{item.type[1].name}</span>
          </>
        ),
      },
      {
        children: (
          <>
            <span className="block">{item.type[0].time}</span>
            <span>{item.type[1].time}</span>
          </>
        ),
      },
      {
        children: (
          <>
            <span className="block">{item.type[0].status}</span>
            <span>{item.type[1].status}</span>
          </>
        ),
      },
      {
        children: (
          <span className="flex gap-2">
            <button
              title="Maps"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => handleView('maps', item.type[0].location, '')}
            >
              <MapPinIcon size={18} />
            </button>
          </span>
        ),
      },
      {
        children: (
          <span className="flex gap-2">
            <button
              title="Maps"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => handleView('image', null, item.type[0].attachment)}
            >
              <ImageIcon size={18} />
            </button>
          </span>
        ),
      },
    ],
  }))

  return (
    <Card>
      {selectedLocation && <PreviewMapsModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
      {selectedAttachment && <PreviewImageModal imageUrl={selectedAttachment} onClose={() => setSelectedAttachment(null)} />}
      <MainTable headerItems={headerItems} bodyItems={bodyItems} />
    </Card>
  )
}

export default AttendanceTable
