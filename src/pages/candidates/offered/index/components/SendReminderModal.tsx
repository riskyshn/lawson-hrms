import MainModal from '@/components/Elements/Modals/MainModal'
import { LogoGoogleMeet } from '@/components/Logo/LogoGoogleMeet'
import { Avatar, Button, Input, InputCheckbox, Select } from 'jobseeker-ui'
import { ClockIcon, MapPinIcon, PencilIcon, TextIcon, Users2Icon } from 'lucide-react'
import React, { useState } from 'react'

type SendReminderModalProps = {
  show: boolean
  onClose: () => void
}

const SendReminderModal: React.FC<SendReminderModalProps> = ({ show, onClose }) => {
  const guestOptions = [
    { value: 'senin@gmail.com', label: 'senin@gmail.com' },
    { value: 'selasa@gmail.com', label: 'selasa@gmail.com' },
  ]

  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [showChangeTime, setShowChangeTime] = useState<boolean>(false)

  const getCurrentDate = (): string => {
    const date = new Date()
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  }

  const getCurrentTime = (): string => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const getCurrentTimeZone = (): string => {
    const offsetHours = -(new Date().getTimezoneOffset() / 60)
    const offset = offsetHours < 0 ? offsetHours.toString() : `+${offsetHours.toString()}`
    return `(GMT${offset})`
  }

  const [scheduledDate, setScheduledDate] = useState<string>(getCurrentDate())
  const [startTime, setStartTime] = useState<string>(getCurrentTime())
  const [endTime, setEndTime] = useState<string>(getCurrentTime())
  const [timeZone, setTimeZone] = useState<string>(getCurrentTimeZone())

  const handleGuestSelect = (value: any) => {
    if (!selectedGuests.includes(value)) {
      setSelectedGuests([...selectedGuests, value])
    }
  }

  const handleTimeChangeClick = () => {
    setShowChangeTime(true)
  }

  const formatScheduledDate = (dateString: string): string => {
    const date = new Date(dateString)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dayOfWeek = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`
  }

  return (
    <MainModal className="max-w-xl py-8" show={show} onClose={onClose}>
      <div className="mb-8">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Schedule Your Interview</h3>
          <p className="text-xs text-gray-500">Add Interview to Your Calendar</p>
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <PencilIcon style={{ marginRight: '10px' }} />
          <div style={{ flex: '1' }}>
            <Input placeholder="Add Title" />
          </div>
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <ClockIcon style={{ marginRight: '10px' }} />
          <div style={{ width: '100%' }}>
            <span className="block text-sm font-semibold">
              {formatScheduledDate(scheduledDate)} | {startTime} - {endTime}
            </span>
            <span className="block text-xs text-gray-500">
              {timeZone} -
              <span className="text-blue-500" onClick={handleTimeChangeClick} style={{ cursor: 'pointer' }}>
                {' '}
                Change Time
              </span>
            </span>
            {showChangeTime && (
              <div className="mt-2">
                <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-1/2" />
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-1/2" />
                </div>
                <Select placeholder="Select Time Zone" options={guestOptions} value={timeZone} onChange={(value) => setTimeZone(value)} />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Users2Icon style={{ marginRight: '10px' }} />
            <div style={{ flex: '1' }}>
              <Select placeholder="Add Guest" options={guestOptions} className="mb-1" onChange={(e) => handleGuestSelect(e)} />
            </div>
          </div>

          {selectedGuests.length > 0 && (
            <div className="ml-8">
              {selectedGuests.map((guest) => (
                <li key={guest} className="flex items-center gap-3 pt-1">
                  <div>
                    <Avatar name={guest} className="bg-gray-100 text-primary-600" size={48} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm">{guest}</span>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoGoogleMeet style={{ marginRight: '10px' }} />
            <div className="ml-2">
              <span className="block text-sm font-semibold">Add Google Meet Video Conferencing</span>
              <span className="block text-xs text-gray-500">For Online Interview</span>
            </div>
          </div>
          <div>
            <InputCheckbox size={30} id="check-google-meet"></InputCheckbox>
          </div>
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <MapPinIcon style={{ marginRight: '10px' }} />
          <div style={{ flex: '1' }}>
            <Input placeholder="Add Location" />
          </div>
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextIcon style={{ marginRight: '10px' }} />
          <div style={{ flex: '1' }}>
            <Input placeholder="Add Description" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button color="primary" className="ml-2 w-1/2">
          Add Interview
        </Button>
      </div>
    </MainModal>
  )
}

export default SendReminderModal
