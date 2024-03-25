import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { EditIcon, HistoryIcon, LogOutIcon, UserRoundPlusIcon, UserXIcon, XCircleIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ViewHistoryModal from '../../Modals/ViewHistoryModal'
import RejectModal from '../../Modals/RejectModal'
import BlacklistModal from '../../Modals/BlacklistModal'
import WithdrawModal from '../../Modals/WithdrawModal'

interface MenuListProps {
  options: string[]
  items?: any
}

const ActionMenu: React.FC<MenuListProps> = ({ options, items }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    switch (option) {
      case 'View History':
      case 'Reject':
      case 'Blacklist':
      case 'Withdraw':
        setModalType(option)
        setShowOptionModal(true)
        break
      case 'Add as Employee':
        navigate('/employee/employee-management/create')
        break
      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View History':
        return <ViewHistoryModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
      case 'Reject':
        return <RejectModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Blacklist':
        return <BlacklistModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Withdraw':
        return <WithdrawModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
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
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${active && 'bg-primary-100'}`}
                  onClick={() => handleViewDetails(option)}
                >
                  {option === 'Add as Employee' && (
                    <UserRoundPlusIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'Edit Join Date' && <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'View History' && (
                    <HistoryIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'Blacklist' && <UserXIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}

                  {option === 'Reject' && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                  {option === 'Withdraw' && <LogOutIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}

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
