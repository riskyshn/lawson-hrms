import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { BaseInput, Button, Select } from 'jobseeker-ui'
import { FilterIcon, SearchIcon } from 'lucide-react'
import Table from '../components/Table'

const PreviousEmployeePage: React.FC = () => {
  const pageData = {
    content: [
      {
        name: 'John Doe',
        email: 'jd@gmail.com',
        lastDay: '12/12/2024',
        status: 'Senior Accountant',
        reason: 'Level 3',
      },
    ],
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Employee' }, { text: 'Previous Employee' }]} title="Previous Employee" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2">
                    <span className="block text-lg font-semibold">Employee List</span>
                    <span className="block text-sm">
                      You have <span className="text-primary-600">{pageData?.content?.length ?? 0} Employee</span> in this list
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex flex-1">
                    <BaseInput type="text" placeholder="Search..." className="peer w-full rounded-r-none lg:w-64" />
                    <Button iconOnly color="primary" className="rounded-l-none">
                      <SearchIcon size={16} />
                    </Button>
                  </div>
                  <Button iconOnly type="button" color="primary" onClick={toggleOpen}>
                    <FilterIcon size={16} />
                  </Button>
                </div>
              </div>
              {open && (
                <div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-2">
                  <Select placeholder="All Department" options={[]} />
                </div>
              )}
            </>
          )}
          body={<Table items={pageData.content} />}
          footer={0}
        />
      </Container>
    </>
  )
}

export default PreviousEmployeePage
