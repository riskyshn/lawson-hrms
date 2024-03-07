import React from 'react'
import { Button, Input, Avatar, InputCheckbox } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { ClockIcon } from 'lucide-react'
import { LogoGoogleMeet } from '@/components/Logo/LogoGoogleMeet'

type ProcessModalProps = {
  show: boolean
  onClose: () => void
}

const SendReminderModal: React.FC<ProcessModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Schedule Your Interview</h3>
          <p className="text-xs text-gray-500">Add Interview to Your Calendar</p>
        </div>

        <div className="mb-4">
          <Input label="Title" labelRequired placeholder="Add Title" />
        </div>

        <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
          <ClockIcon style={{ marginRight: '10px' }} />
          <div>
            <span className="block text-sm font-semibold">Monday, September 12th | 1:00pm - 2:00pm</span>
            <span className="block text-xs text-gray-500">(GMT+07:00) Western Indonesian Time - Change Time</span>
          </div>
        </div>

        <div className="mb-4">
          <div>
            <Input label="Guests" labelRequired placeholder="Add Guest" />
          </div>

          <div className="pb-2">
            {[1, 2].map((i) => (
              <li key={i} className="flex items-center gap-3 py-1">
                <div>
                  <Avatar name="Jhon Doe" className="bg-gray-100 text-primary-600" size={48} />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold">John Doe</span>
                  <span className="block text-xs text-gray-500">Vacancy Name | RR Number</span>
                </div>
              </li>
            ))}
          </div>
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

        <div className="mb-4">
          <Input label="Location" labelRequired placeholder="Add Location" />
        </div>

        <div>
          <Input label="Description" labelRequired placeholder="Add Description" />
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
