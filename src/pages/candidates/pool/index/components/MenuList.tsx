import type { ICandidate } from '@/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { CopyPlusIcon, HistoryIcon, UserIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import ApplyVacancyModal from './ApplyVacancyModal'
import ViewHistoryModal from './ViewHistoryModal'

interface MenuListProps {
  item: ICandidate
  onApplyVacancy: (data: string) => void
  options: string[]
}

const MenuList: React.FC<MenuListProps> = ({ item, onApplyVacancy, options }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    setShowOptionModal(true)

    switch (option) {
      case 'Apply to Vacancy':
      case 'View History':
        setModalType(option)
        break

      case 'View Profile':
        navigate(`/candidates/profile/${item.oid}`)
        break

      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Apply to Vacancy':
        return (
          <ApplyVacancyModal item={item} onApplyVacancy={onApplyVacancy} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
        )
      case 'View History':
        return <ViewHistoryModal item={item} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      <Menu as="div" className="relative">
        <Menu.Button as={Button} block className="text-xs" color="primary" size="small" variant="light">
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
                  {option === 'Apply to Vacancy' && (
                    <CopyPlusIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'View History' && (
                    <HistoryIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'View Profile' && <UserIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
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

export default MenuList
