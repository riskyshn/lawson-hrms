import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Input, Select, Spinner } from 'jobseeker-ui'
import { FilterIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from './components/StatisticCards'
import Table from './components/Table'
import { vacancyService } from '@/services'
import usePagination from '@/hooks/use-pagination'

const JobManajementPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const keyword = searchParams.get('keyword') || undefined

  const [contents, setContents] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const pagination = usePagination({
    pathname: '/job/management',
    totalPage: contents?.totalPages,
    queryKey: 'start_page',
    params: { ...(keyword ? { keyword } : {}) },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await vacancyService.fetchVacancies({ keyword, start_page: pagination.currentPage }, signal)
        setContents(data)
        setIsLoading(false)
      } catch (error) {
        // console.error('Error fetching vacancies:', error)
        setIsLoading(false)
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [keyword, pagination.currentPage])

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Job Management' }]}
        title="Job Management"
        subtitle="Manage Your Job Vacancy"
        actions={
          <>
            <Button
              as={Link}
              to="/job/management/recruitment-stages"
              variant="light"
              color="primary"
              className="text-gray-600"
              leftChild={<SettingsIcon size={16} />}
            >
              Recruitment Stages
            </Button>
            <Button as={Link} to="/job/management/create" color="primary" className="ml-3">
              Create Job Posting
            </Button>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards />

        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Vacancy List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">200+ Job Posted</span> in total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="m-0 mt-1 w-full lg:w-64"
                    inputClassName="peer pl-7"
                    rightChild={
                      <SearchIcon
                        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                        size={16}
                      />
                    }
                    value={keyword || ''}
                    onChange={(e) => setSearchParam((el) => ({ ...el, start_page: 0, keyword: e.currentTarget.value }))}
                  />
                  <Button iconOnly type="button" color="primary" onClick={toggleOpen}>
                    <FilterIcon size={16} />
                  </Button>
                </div>
              </div>
              {open && (
                <div className="grid grid-cols-2 gap-3 p-3">
                  <Select placeholder="All Departement" options={[]} />
                  <Select placeholder="All Status" options={[]} />
                </div>
              )}
            </>
          )}
          body={
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spinner className="h-10 w-10 text-primary-600" />
              </div>
            ) : contents?.contents && contents?.contents?.length > 0 ? (
              <Table data={contents} />
            ) : (
              <div className="flex items-center justify-center py-20">
                <p>No data available.</p>
              </div>
            )
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default JobManajementPage
