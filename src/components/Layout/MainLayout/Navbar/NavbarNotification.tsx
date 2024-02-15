import { Menu } from '@headlessui/react'
import { Badge, Button } from 'jobseeker-ui'
import { Bell } from 'lucide-react'

const NavbarNotification: React.FC = () => {
  return (
    <Menu>
      <Menu.Button as={Button} iconOnly variant="light">
        <Badge color="error" size="small" className="absolute -right-1.5 -top-1.5 min-w-4 font-semibold">
          27
        </Badge>
        <Bell size={16} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 top-14 w-full rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none md:w-96">
        <span className="absolute -top-1 right-28 h-6 w-6 rotate-45 transform rounded bg-primary-600" />
        <div className="relative z-10 bg-white p-3 pt-4">
          <span className="text-lg">Notifications</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-3">
          <Button variant="light">
            Appliciants
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              7
            </Badge>
          </Button>
          <Button disabled color="primary">
            Vacancies
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              20
            </Badge>
          </Button>
        </div>

        <div className="p-3"></div>
      </Menu.Items>
    </Menu>
  )
}

export default NavbarNotification
