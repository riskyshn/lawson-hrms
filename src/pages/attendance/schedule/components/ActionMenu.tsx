import { attendanceService } from '@/services'
import { Menu } from '@headlessui/react'
import { Button, useConfirm, useToast } from 'jobseeker-ui'
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import EditScheduleModal from './EditScheduleModal'
import ViewScheduleModal from './ViewScheduleModal'

interface ActionMenuProps {
  options: string[]
  items?: ISchedule
  onApplyVacancy: (data: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ options, items, onApplyVacancy }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const toast = useToast()
  const confirm = useConfirm()

  const handleViewDetails = async (option: string) => {
    setShowOptionModal(true)
    let confirmed = false

    switch (option) {
      case 'View Details':
      case 'Edit Schedule':
        setModalType(option)
        break
      case 'Delete':
        setModalType('')
        confirmed = await confirm({
          text: `Are you sure you want to delete this schedule?`,
          confirmBtnColor: 'primary',
          cancelBtnColor: 'error',
        })

        if (confirmed) {
          try {
            await attendanceService.deleteSchedule(items?.oid)
            toast('Schedule deleted successfully', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          } catch (e: any) {
            toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
          }
        }
        break
      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View Details':
        return <ViewScheduleModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
      case 'Edit Schedule':
        return (
          <EditScheduleModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            items={items}
            onApplyVacancy={onApplyVacancy}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      <Menu as="div" className="relative">
        <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
          Action
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                    active ? 'bg-primary-100' : ''
                  }`}
                  onClick={() => handleViewDetails(option)}
                >
                  {option === 'View Details' && <EyeIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Edit Schedule' && <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Delete' && <TrashIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      {showOptionModal && renderModal()}
    </div>
  )
}

export default ActionMenu
