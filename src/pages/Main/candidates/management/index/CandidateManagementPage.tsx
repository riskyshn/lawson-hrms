import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { BaseInput, Button, Input, Pagination, PaginationItem, Select } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon, SearchIcon } from 'lucide-react'
import Table from './components/Table'
import { useEffect, useState } from 'react'
import { vacancyService } from '@/services'

const CandidateManagementPage: React.FC = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const data = await vacancyService.fetchVacancies({ keyword: search })
      console.log(data)
    }

    load()
  }, [search])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Candidate Management' }]} title="Candidate Management" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Candidate List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">You have 21000 Candidates in total</span> in total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="peer w-full rounded-r-none lg:w-64"
                    leftChild={<SearchIcon size={16} />}
                  />
                  <Button iconOnly type="button" color="primary" onClick={toggleOpen}>
                    <FilterIcon size={16} />
                  </Button>
                </div>
              </div>
              {open && (
                <div className="grid grid-cols-1 gap-3 p-3">
                  <Select placeholder="All Vacancy" options={[]} />
                </div>
              )}
            </>
          )}
          body={<Table setPreviewVideoModalUrl={() => null} setPreviewPdfModalUrl={() => null} />}
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

export default CandidateManagementPage
