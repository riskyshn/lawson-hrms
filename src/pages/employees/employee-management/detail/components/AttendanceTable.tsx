import MainTable from '@/components/Elements/MainTable'
import MapsPreviewer from '@/components/Elements/MapsPreviewer'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { Card } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import React, { useState } from 'react'

const AttendanceTable: React.FC<{ employee: IEmployee }> = () => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()

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
              onClick={() => setSelectedLocation([-8.7931195, 115.1501316])}
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
              onClick={() => previewImage(item.type[0].attachment)}
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
      <MapsPreviewer coordinates={selectedLocation} radius={100} onClose={() => setSelectedLocation(null)} />
      <MainTable headerItems={headerItems} bodyItems={bodyItems} />
    </Card>
  )
}

export default AttendanceTable

const dummyAttendance = [
  {
    date: '18/03/2024',
    type: [
      {
        name: 'Clock In',
        time: '08:40:35',
        status: 'Pending',
        location: [-8.7931195, 115.1501316],
        attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      },
      {
        name: 'Clock Out',
        time: '17:30:00',
        status: 'Completed',
        location: [-8.7931195, 115.1501316],
        attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      },
    ],
  },
]
