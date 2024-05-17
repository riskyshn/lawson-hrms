import React, { memo, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Navbar as BaseNavbar, Button, NavbarBrand, NavbarNav, useLayout, usePubSub } from 'jobseeker-ui'
import { Calendar, Menu, Search } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { LogoFull } from '@/components'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants'
import { useAuthStore } from '@/store'
import NavbarInfo from './NavbarInfo'
import NavbarNotification from './NavbarNotification'
import NavbarProfile from './NavbarProfile'

const Navbar: React.FC = () => {
  const { toggleSidebarOpen } = useLayout()
  const [open, setOpen] = useState(false)
  const pubSub = usePubSub()
  const { company } = useAuthStore()

  const navigate = useNavigate()
  const router = useLocation()

  const handleSearchClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (router.pathname === '/explore') {
      e.preventDefault()
      pubSub.publish(ON_NAVBAR_SEARCH_CLICKED, null)
    }
  }

  useEffect(() => {
    const onResize = () => setOpen(false)
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  const handleCalendar = () => {
    navigate('/calendar')
  }

  // const handleChat = () => {
  //   navigate('/chat')
  // }

  return (
    <BaseNavbar>
      <NavbarBrand>
        <Link to="/">
          {!company?.logo?.file && <LogoFull height={40} />}
          {!!company?.logo?.file && <img alt={company.name} className="block h-10" src={company.logo.file} />}
        </Link>
      </NavbarBrand>

      <NavbarNav className="justify-end gap-3 xl:px-8">
        <Button as={Link} className="lg:hidden" onClick={handleSearchClick} to="/explore" variant="light">
          <Search size={16} />
        </Button>

        <Button className="lg:hidden" onClick={() => toggleSidebarOpen()} variant="light">
          <Menu size={16} />
        </Button>

        <Button
          as={Link}
          block
          className="mr-auto hidden w-1/4 lg:flex"
          onClick={handleSearchClick}
          rightChild={<Search className="ml-auto h-4 w-4" size={16} />}
          to="/explore"
          variant="light"
        >
          Explore Candidates
        </Button>

        <div
          className={twJoin(
            open ? 'flex' : 'hidden lg:flex',
            'absolute left-0 right-0 top-16 h-16 border-y bg-white p-3 lg:relative lg:right-auto lg:top-auto lg:h-auto lg:border-0 lg:bg-transparent lg:px-0',
          )}
        >
          <div className="relative flex flex-1 items-center justify-end gap-3">
            <NavbarInfo />

            {/* <Button iconOnly variant="light" onClick={handleChat}>
              <MessageCircle size={16} />
            </Button> */}

            <NavbarNotification />

            <Button iconOnly onClick={handleCalendar} variant="light">
              <Calendar size={16} />
            </Button>

            <NavbarProfile />
          </div>
        </div>

        <Button className="lg:hidden" onClick={() => setOpen(!open)} variant="light">
          <Menu className="block rotate-90" size={16} />
        </Button>
      </NavbarNav>
    </BaseNavbar>
  )
}

export default memo(Navbar)
