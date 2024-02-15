import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarProfile from './NavbarProfile'
import { Calendar, Menu, MessageCircle, Search } from 'lucide-react'
import NavbarInfo from './NavbarInfo'
import { twJoin } from 'tailwind-merge'
import { useLayout, Navbar as BaseNavbar, NavbarBrand, NavbarNav, Button } from 'jobseeker-ui'
import NavbarNotification from './NavbarNotification'
import LogoFull from '@/components/Logo/LogoFull'

const Navbar: React.FC = () => {
  const { toggleSidebarOpen } = useLayout()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => setOpen(false)
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  return (
    <BaseNavbar>
      <NavbarBrand>
        <Link to="/">
          <LogoFull height={40} />
        </Link>
      </NavbarBrand>

      <NavbarNav className="justify-end gap-3">
        <Button className="lg:hidden" variant="light">
          <Search size={16} />
        </Button>

        <Button className="lg:hidden" variant="light" onClick={() => toggleSidebarOpen()}>
          <Menu size={16} />
        </Button>

        <Button
          variant="light"
          block
          leftChild={<Search size={16} className="h-4 w-4" />}
          rightChild={<Menu size={16} className="ml-auto h-4 w-4" />}
          className="mr-auto hidden w-1/3 lg:flex"
        >
          Search by Location / Position
        </Button>

        <div
          className={twJoin(
            open ? 'flex' : 'hidden lg:flex',
            'absolute left-0 right-0 top-16 h-16 border-y bg-white p-3 lg:relative lg:right-auto lg:top-auto lg:h-auto lg:border-0 lg:px-0',
          )}
        >
          <div className="relative flex flex-1 items-center justify-end gap-3">
            <NavbarInfo />

            <Button iconOnly variant="light">
              <MessageCircle size={16} />
            </Button>

            <NavbarNotification />

            <Button iconOnly variant="light">
              <Calendar size={16} />
            </Button>

            <NavbarProfile />
          </div>
        </div>

        <Button variant="light" className="lg:hidden" onClick={() => setOpen(!open)}>
          <Menu size={16} className="block rotate-90" />
        </Button>
      </NavbarNav>
    </BaseNavbar>
  )
}

export default Navbar
