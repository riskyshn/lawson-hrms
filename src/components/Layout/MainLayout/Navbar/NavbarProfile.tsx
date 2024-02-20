import { useAuthStore } from '@/store'
import { Menu } from '@headlessui/react'
import { Avatar, Button } from 'jobseeker-ui'
import { PowerIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavbarProfile: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  const fullName = [user?.firstName, user?.lastName].filter((el) => !!el).join(' ')

  return (
    <Menu>
      <Menu.Button as={Button} variant="light" color="primary" iconOnly className="overflow-hidden">
        <Avatar name={fullName} className="h-full w-full" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 top-14 w-64 rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none">
        <span className="absolute -top-1 right-2 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
        <div className="relative z-10 rounded-lg bg-white pb-0 pt-6">
          <div className="flex flex-1 flex-col items-center justify-center px-3">
            <Avatar name={fullName} size={64} className="m-auto mb-3 bg-primary-100 text-2xl text-primary-700" />
            <h3 className="text-md capitalized w-full truncate text-center font-semibold">{fullName}</h3>
            <p className="w-full text-center text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3">
          <Menu.Item>
            <Button variant="light" block>
              Upload Resume
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button variant="light" block>
              Explore Candidate
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button variant="light" block>
              Change Password
            </Button>
          </Menu.Item>
        </div>
        <div className="bg-neutral-200/30 p-3">
          <Menu.Item>
            <Button type="button" color="error" block leftChild={<PowerIcon size={16} />} onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default NavbarProfile
