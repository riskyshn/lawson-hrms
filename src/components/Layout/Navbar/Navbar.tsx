import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavbarProfile from './NavbarProfile'
import { Calendar, Menu, MessageCircle, Search } from 'lucide-react'
import NavbarInfo from './NavbarInfo'
import { twJoin } from 'tailwind-merge'
import { useLayout, Navbar as BaseNavbar, NavbarBrand, NavbarNav, Button, usePubSub } from 'jobseeker-ui'
import NavbarNotification from './NavbarNotification'
import LogoFull from '@/components/Logo/LogoFull'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants/pubsub'
import { useOrganizationStore } from '@/store'

const Navbar: React.FC = () => {
  const { toggleSidebarOpen } = useLayout()
  const [open, setOpen] = useState(false)
  const pubSub = usePubSub()
  const { company } = useOrganizationStore()

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

  return (
    <BaseNavbar className="bg-white/80 backdrop-blur">
      <NavbarBrand>
        <Link to="/">
          {!company?.logo?.file && <LogoFull height={40} />}
          {!!company?.logo?.file && <img src={company.logo.file} alt={company.name} height={40} />}
        </Link>
      </NavbarBrand>

      <NavbarNav className="justify-end gap-3 xl:px-8">
        <Button as={Link} to="/explore" className="lg:hidden" variant="light" onClick={handleSearchClick}>
          <Search size={16} />
        </Button>

        <Button className="lg:hidden" variant="light" onClick={() => toggleSidebarOpen()}>
          <Menu size={16} />
        </Button>

        <Button
          as={Link}
          to="/explore"
          variant="light"
          block
          rightChild={<Search size={16} className="ml-auto h-4 w-4" />}
          className="mr-auto hidden w-1/4 lg:flex"
          onClick={handleSearchClick}
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
