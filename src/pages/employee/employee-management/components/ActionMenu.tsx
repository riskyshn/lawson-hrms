import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { ArrowLeftRightIcon, EditIcon, EyeIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import ResignTerminateModal from './ResignTerminateModal'
import EmployeeDetailPage from '../index/EmployeeDetailPage'
import { useNavigate } from 'react-router-dom'

type Employee = {
  id: string
  name?: string
  branch?: string
  department?: string
  position?: string
  jobLevel?: string
  employmentStatus?: string
}

type ActionMenuProps = {
  items: Employee
}

const ActionMenu: React.FC<ActionMenuProps> = ({ items }) => {
  const [modalType, setModalType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const openModal = (type: string = '') => {
    if (type == 'Resign/Terminate') {
      setModalType(type)
      setShowModal(true)
    }
    if (type == 'View Details') {
      navigate(`/employee/employee-management/${items.id}/view`)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Resign/Terminate':
        return <ResignTerminateModal show={showModal} onClose={closeModal} items={items} />
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      {renderModal()}
      <Menu as="div" className="relative">
        <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
          Action
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none">
          {['View Details', 'Edit Employee', 'Resign/Terminate'].map((option, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <button
                  className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                  onClick={() => openModal(option)}
                >
                  {i === 0 && <EyeIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {i === 1 && <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {i === 2 && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default ActionMenu
