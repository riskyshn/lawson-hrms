import Container from '@/components/Elements/Container'
import PageHeader from '@/components/UI/PageHeader'
import { BaseInput, Button, Card, CardBody, CardFooter, Pagination, PaginationItem, Select } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatisticCards from './components/StatisticCards'
import { useState } from 'react'
import Table from './components/Table'

const JobRequisitionPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Job Requisition' }]}
        title="Job Requisition"
        subtitle="Manage Your Job Requisition Needs"
        actions={
          <>
            <Button
              as={Link}
              to="/job/requisition/approve-list"
              variant="light"
              color="primary"
              className="text-gray-600"
              leftChild={<SettingsIcon size={16} />}
            >
              Approve List
            </Button>
            <Button as={Link} to="/job/management/create" color="primary" className="ml-3">
              Create Job Posting
            </Button>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards />

        <Card>
          <div className="sticky top-16 z-40 grid grid-cols-1 rounded-t-lg border-b bg-white/80 backdrop-blur">
            <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="block text-lg font-semibold">Vacancy List</span>
                <span className="block text-sm">
                  You have <span className="text-primary-600">200+ Job Posted</span> in total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex flex-1">
                  <BaseInput type="text" placeholder="Search..." className="peer w-full rounded-r-none lg:w-64" />
                  <Button iconOnly color="primary" className="rounded-l-none">
                    <SearchIcon size={16} />
                  </Button>
                </div>
                <Button iconOnly type="button" color="primary" onClick={() => setOpen(!open)}>
                  <FilterIcon size={16} />
                </Button>
              </div>
            </div>
            {open && (
              <div className="grid grid-cols-2 gap-3 border-t p-3">
                <Select placeholder="All Departement" options={[]} />
                <Select placeholder="All Status" options={[]} />
              </div>
            )}
          </div>
          <CardBody className="overflow-x-auto p-0">
            <Table />
          </CardBody>
          <CardFooter>
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
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default JobRequisitionPage
