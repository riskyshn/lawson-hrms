import React, { useState } from 'react'
import MainTable from '@/components/Elements/MainTable'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import PreviewMapsModal from '../../previous-employee/components/PreviewMapsModal'
import PreviewImageModal from '../../previous-employee/components/PreviewImageModal'

type AttendanceData = {
  date: string
  type: AttendanceType[]
}

type AttendanceType = {
  name: string
  time: string
  status: string
  location: {
    lng: number
    lat: number
  }
  attachment: string
}

type TableProps = {
  items: AttendanceData[]
}

const AttendanceTable: React.FC<TableProps> = ({ items }) => {
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

  const bodyItems = items.map((item) => ({
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
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} />
      {selectedLocation && <PreviewMapsModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
      {selectedAttachment && <PreviewImageModal imageUrl={selectedAttachment} onClose={() => setSelectedAttachment(null)} />}
    </>
  )
}

export default AttendanceTable
