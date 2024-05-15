import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { Avatar, Button, useConfirm, usePubSub } from 'jobseeker-ui'
import { PowerIcon } from 'lucide-react'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants/pubsub'
import { useAuthStore } from '@/store'
import ChangePasswordModal from './ChangePasswordModal'
import UploadResumeModal from './UploadResumeModal'

const NavbarProfile: React.FC = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showUploadResumeModal, setShowUploadResumeModal] = useState(false)
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()
  const router = useLocation()
  const pubSub = usePubSub()
  const confirm = useConfirm()

  const handleSearchClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (router.pathname === '/explore') {
      e.preventDefault()
      pubSub.publish(ON_NAVBAR_SEARCH_CLICKED, null)
    }
  }

  const handleLogout = async () => {
    confirm({
      cancelBtnColor: 'primary',
      cancelBtnText: 'Cancel',
      cancelBtnVariant: 'light',
      confirmBtnColor: 'error',
      confirmBtnText: 'Logout',
      icon: 'error',
      text: 'Are you sure you want to log out?',
      title: 'Confirm Logout',
    }).then((confirmed) => {
      if (confirmed) {
        logout()
        navigate('/auth/login')
      }
    })
  }

  const fullName = [user?.firstName, user?.lastName].filter((el) => !!el).join(' ')

  return (
    <>
      <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} show={showChangePasswordModal} />
      <UploadResumeModal onClose={() => setShowUploadResumeModal(false)} show={showUploadResumeModal} />
      <Menu>
        <Menu.Button as={Button} className="overflow-hidden" color="primary" iconOnly variant="light">
          <Avatar className="h-full w-full" name={fullName} />
        </Menu.Button>

        <Menu.Items className="absolute right-0 top-14 w-64 rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none">
          <span className="absolute -top-1 right-2 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
          <div className="relative z-10 rounded-lg bg-white pb-0 pt-6">
            <div className="flex flex-1 flex-col items-center justify-center px-3">
              <Avatar className="m-auto mb-3 bg-primary-100 text-2xl text-primary-700" name={fullName} size={64} />
              <h3 className="text-md capitalized w-full truncate text-center font-semibold">{fullName}</h3>
              <p className="w-full text-center text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-3">
            <Menu.Item>
              <Button block onClick={() => setShowUploadResumeModal(true)} type="button" variant="light">
                Upload Resume
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button as={Link} block onClick={handleSearchClick} to="/explore" variant="light">
                Explore Candidate
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button block onClick={() => setShowChangePasswordModal(true)} type="button" variant="light">
                Change Password
              </Button>
            </Menu.Item>
          </div>
          <div className="bg-neutral-200/30 p-3">
            <Menu.Item>
              <Button block color="error" leftChild={<PowerIcon size={16} />} onClick={handleLogout} type="button">
                Logout
              </Button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  )
}

export default NavbarProfile
