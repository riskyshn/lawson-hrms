import usePagination from '@/core/hooks/use-pagination'
import { notificationService } from '@/services'
import { Menu } from '@headlessui/react'
import { Avatar, Badge, Button, CardBody, Spinner } from 'jobseeker-ui'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarNotification: React.FC = () => {
  const [viewMode, setViewMode] = useState<'applicants' | 'vacancies'>('applicants')
  const [pageDataVacancies, setPageDataVacancies] = useState<IPaginationResponse<INotification>>()
  const [pageDataApplicants, setPageDataApplicants] = useState<IPaginationResponse<INotification>>()
  const [pageError, setPageError] = useState<any>()
  const [hasMoreItemsVacancies, setHasMoreItemsVacancies] = useState<boolean>(false)
  const [hasMoreItemsApplicants, setHasMoreItemsApplicants] = useState<boolean>(false)
  const [notificationUpdated, setNotificationUpdated] = useState<boolean>(false)
  const [totalApplicantsNotification, setTotalApplicantsNotification] = useState<number>(0)
  const [totalVacanciesNotification, setTotalVacanciesNotification] = useState<number>(0)

  const [currentPageApplicants, setCurrentPageApplicants] = useState({
    currentPage: 1,
  })
  const [currentPageVacancies, setCurrentPageVacancies] = useState({
    currentPage: 1,
  })
  const [loadingVacancies, setLoadingVacancies] = useState(false)
  const [loadingApplicants, setLoadingApplicants] = useState(false)

  const paginationVacancies = usePagination({
    pathname: '',
    totalPage: pageDataVacancies?.totalPages,
  })

  const paginationApplicants = usePagination({
    pathname: '',
    totalPage: pageDataApplicants?.totalPages,
  })

  const navigate = useNavigate()

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
  }

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const responseVacancies = await notificationService.fetchNotification({
          limit: 10,
          type: 'VACANCIES',
          page: paginationVacancies.currentPage,
        })
        setPageDataVacancies(responseVacancies)
        setHasMoreItemsVacancies(responseVacancies?.content?.length < responseVacancies?.totalElements)
      } catch (e) {
        setPageError(e)
      }
    }

    loadEmployeeData()
  }, [paginationVacancies.currentPage, notificationUpdated])

  useEffect(() => {
    const loadApplicantsData = async () => {
      try {
        const responseApplicants = await notificationService.fetchNotification({
          limit: 10,
          type: 'APPLICANTS',
          page: paginationApplicants.currentPage,
        })
        setPageDataApplicants(responseApplicants)
        setHasMoreItemsApplicants(responseApplicants?.content?.length < responseApplicants?.totalElements)
      } catch (e) {
        setPageError(e)
      }
    }

    loadApplicantsData()
  }, [paginationApplicants.currentPage, notificationUpdated])

  useEffect(() => {
    const loadTotalNotification = async () => {
      try {
        const responseNotification = await notificationService.getTotalNotification({
          type: 'APPLICANTS',
        })
        setTotalApplicantsNotification(responseNotification)
      } catch (e) {
        setPageError(e)
      }
    }

    loadTotalNotification()
  }, [notificationUpdated])

  useEffect(() => {
    const loadTotalNotification = async () => {
      try {
        const responseNotification = await notificationService.getTotalNotification({
          type: 'VACANCIES',
        })
        setTotalVacanciesNotification(responseNotification)
      } catch (e) {
        setPageError(e)
      }
    }

    loadTotalNotification()
  }, [notificationUpdated])

  const loadMoreDataVacancies = async () => {
    try {
      setLoadingVacancies(true)
      const response = await notificationService.fetchNotification({
        limit: 10,
        type: 'VACANCIES',
        page: currentPageVacancies.currentPage + 1,
      })
      setPageDataVacancies((prevData) => ({
        ...response,
        content: prevData ? [...prevData.content, ...response.content] : response.content,
      }))

      setCurrentPageVacancies((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }))

      setHasMoreItemsVacancies(response?.totalPages > currentPageVacancies.currentPage + 1)
      setLoadingVacancies(false)
    } catch (e) {
      setPageError(e)
      setLoadingVacancies(false)
    }
  }

  const loadMoreDataApplicants = async () => {
    try {
      setLoadingApplicants(true)
      const response = await notificationService.fetchNotification({
        limit: 10,
        type: 'APPLICANTS',
        page: currentPageApplicants.currentPage + 1,
      })
      setPageDataApplicants((prevData) => ({
        ...response,
        content: prevData ? [...prevData.content, ...response.content] : response.content,
      }))

      setCurrentPageApplicants((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }))

      setHasMoreItemsApplicants(response.totalPages > currentPageApplicants.currentPage + 1)
      setLoadingApplicants(false)
    } catch (e) {
      setPageError(e)
      setLoadingApplicants(false)
    }
  }

  const handleViewApplicants = () => setViewMode('applicants')
  const handleViewVacancies = () => setViewMode('vacancies')

  const handleItemClick = async (item: INotification, type: string) => {
    try {
      if (item.isRead === false) {
        await notificationService.updateNotification(item.oid)
        setNotificationUpdated(true)
      }
      if (type === 'applicants') {
        navigate(`/candidates/management?search=${item.candidate?.name?.replace(/\s/g, '+')}`)
      } else {
        navigate(
          `/process/${item.module === 'offering' ? 'offering-letter' : item.module?.toLowerCase()}?search=${item.candidate.name?.replace(/\s/g, '+')}`,
        )
      }
    } catch (e) {
      setPageError(e)
    }
  }

  if (pageError) throw pageError

  const renderContent = () => {
    if (viewMode === 'applicants') {
      if (pageDataApplicants) {
        return (
          <div className="p-3">
            <CardBody as="div" className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
              {pageDataApplicants.content.map((el, i) => (
                <div key={el.oid || i} onClick={() => handleItemClick(el, 'applicants')} className="cursor-pointer">
                  <li className="relative flex items-center gap-3 py-3">
                    <Avatar
                      name={el.candidate?.name || ''}
                      src={el.candidate?.photoProfile}
                      className="bg-gray-100 text-primary-600"
                      size={48}
                    />
                    <div className="flex-1">
                      <span className="mb-1 block text-sm font-semibold">{el.candidate?.name}</span>
                      <span className="mb-1 block text-sm text-gray-600">{el.message}</span>
                      <span className="block text-xs text-gray-400">{formatDate(el.createdAt)}</span>
                    </div>
                    {!el.isRead && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                        <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                      </div>
                    )}
                  </li>
                </div>
              ))}
            </CardBody>
            {hasMoreItemsApplicants && (
              <div className="flex w-full flex-1 pt-3 text-center">
                <Button className="w-full" variant="default" color="primary" disabled={loadingApplicants} onClick={loadMoreDataApplicants}>
                  {loadingApplicants ? <Spinner className="text-whte h-4 w-4" /> : 'View More'}
                </Button>
              </div>
            )}
          </div>
        )
      }
    } else if (viewMode === 'vacancies') {
      return (
        <div className="p-3">
          <CardBody className="chrome-scrollbar flex max-h-80 flex-col divide-y overflow-y-auto py-0">
            {pageDataVacancies?.content?.map((el, i) => (
              <div key={el.oid || i} onClick={() => handleItemClick(el, 'vacancies')} className="cursor-pointer">
                <li className="relative flex items-center gap-3 py-3">
                  <Avatar
                    name={el.candidate?.name || ''}
                    src={el.candidate?.photoProfile}
                    className="bg-gray-100 text-primary-600"
                    size={48}
                  />
                  <div className="flex-1">
                    <span className="mb-1 block text-sm font-semibold">{el.candidate?.name}</span>
                    <span className="mb-1 block text-sm text-gray-600">{el.message}</span>
                    <span className="block text-xs text-gray-400">{formatDate(el.createdAt)}</span>
                  </div>
                  {!el.isRead && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                      <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                    </div>
                  )}
                </li>
              </div>
            ))}
            {hasMoreItemsVacancies && (
              <div className="flex w-full flex-1 pt-3 text-center">
                <Button className="w-full" variant="default" color="primary" disabled={loadingVacancies} onClick={loadMoreDataVacancies}>
                  {loadingVacancies ? <Spinner className="h-4 w-4 text-white" /> : 'View More'}
                </Button>
              </div>
            )}
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
          {(totalApplicantsNotification || 0) + (totalVacanciesNotification || 0)}
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
              {totalApplicantsNotification}
            </Badge>
          </Button>
          <Button onClick={handleViewVacancies} variant="light" color={viewMode === 'vacancies' ? 'primary' : 'default'}>
            Vacancies
            <Badge color="error" size="small" className="absolute -right-px -top-px ml-2 min-w-6 font-semibold">
              {totalVacanciesNotification}
            </Badge>
          </Button>
        </div>

        {renderContent()}
      </Menu.Items>
    </Menu>
  )
}

export default NavbarNotification
