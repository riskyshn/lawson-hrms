import useAsyncSearch from '@/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Menu } from '@headlessui/react'
import { Avatar, Badge, Button, CardBody } from 'jobseeker-ui'
import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarNotification: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.recentlyApplied, { limit: 20 })

  // State variable to manage view mode (applicants or vacancies)
  const [viewMode, setViewMode] = useState<'applicants' | 'vacancies'>('applicants')

  // Event handlers for toggling view mode
  const handleViewApplicants = () => setViewMode('applicants')
  const handleViewVacancies = () => setViewMode('vacancies')

  // Render the content based on the selected view mode
  const renderContent = () => {
    if (pageData) {
      return (
        <div className="p-3">
          <CardBody as="ul" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
            {pageData.content.map((el, i) => {
              if ((viewMode === 'applicants' && el.candidate) || (viewMode === 'vacancies' && el.vacancy)) {
                return (
                  <li key={i} className="flex items-center gap-3 py-3">
                    <Avatar
                      name={el.candidate?.name || ''}
                      src={el.candidate?.photoProfile}
                      className="bg-gray-100 text-primary-600"
                      size={48}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-semibold">{el.candidate?.name}</span>
                      <span className="block text-xs text-gray-600">
                        {el.vacancy?.name}
                        {el.vacancy?.rrNumber ? ` | ${el.vacancy.rrNumber}` : ''}
                      </span>
                      <span className="block text-xs text-gray-400">{el.applyDate}</span>
                    </div>
                    <Button
                      as={Link}
                      to={`/candidates/management?search=${el.candidate?.name}`}
                      color="primary"
                      size="small"
                      className="px-3"
                    >
                      View
                    </Button>
                  </li>
                )
              }
              return null
            })}
          </CardBody>
        </div>
      )
    }
    return null
  }

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
          <Button onClick={handleViewApplicants} variant="light" color={viewMode === 'applicants' ? 'primary' : 'default'}>
            Applicants
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              {pageData?.totalElements}
            </Badge>
          </Button>
          <Button onClick={handleViewVacancies} variant="light" color={viewMode === 'vacancies' ? 'primary' : 'default'}>
            Vacancies
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              {pageData?.totalElements}
            </Badge>
          </Button>
        </div>

        {renderContent()}
      </Menu.Items>
    </Menu>
  )
}

export default NavbarNotification
