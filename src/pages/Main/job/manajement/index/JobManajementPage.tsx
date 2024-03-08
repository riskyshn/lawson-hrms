import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Input, Pagination, PaginationItem, Select } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatisticCards from './components/StatisticCards'
import Table from './components/Table'
import { vacancyService } from '@/services'

const JobManajementPage: React.FC = () => {
  const [search, setSearch] = useState('')
  // @ts-expect-error
  const [contents, setContents] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const data = await vacancyService.fetchVacancies({ keyword: search })
      setContents(data)
    }
    load()
  }, [search])

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
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
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
          body={<Table />}
          footer={
            <Pagination>
              <PaginationItem disabled>
                <ChevronLeftIcon />
              </PaginationItem>
              <PaginationItem active>1</PaginationItem>
              <PaginationItem>2</PaginationItem>
              <PaginationItem>3</PaginationItem>
              <PaginationItem>4</PaginationItem>
              <PaginationItem>5</PaginationItem>
              <PaginationItem>6</PaginationItem>
              <PaginationItem>
                <ChevronRightIcon />
              </PaginationItem>
            </Pagination>
          }
        />
      </Container>
    </>
  )
}

export default JobManajementPage
