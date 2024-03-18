import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import Table from '../components/Table'
import MainCard from '@/components/Elements/MainCard'
import { BaseInput, Button, Select } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
import { FilterIcon, SearchIcon } from 'lucide-react'

const EmployeeManagementPage: React.FC = () => {
  const pageData = {
    content: [
      {
        id: '1',
        name: 'John Doe',
        branch: 'New York',
        department: 'Finance',
        position: 'Senior Accountant',
        jobLevel: 'Level 3',
        employmentStatus: 'Full-time',
      },
      {
        id: '2',
        name: 'Jane Smith',
        branch: 'Los Angeles',
        department: 'Marketing',
        position: 'Marketing Manager',
        jobLevel: 'Level 4',
        employmentStatus: 'Full-time',
      },
      {
        id: '3',
        name: 'Michael Johnson',
        branch: 'Chicago',
        department: 'Human Resources',
        position: 'HR Specialist',
        jobLevel: 'Level 2',
        employmentStatus: 'Full-time',
      },
      {
        id: '4',
        name: 'Emma Lee',
        branch: 'San Francisco',
        department: 'Engineering',
        position: 'Software Engineer',
        jobLevel: 'Level 3',
        employmentStatus: 'Full-time',
      },
      {
        id: '5',
        name: 'William Brown',
        branch: 'Seattle',
        department: 'Sales',
        position: 'Sales Representative',
        jobLevel: 'Level 2',
        employmentStatus: 'Full-time',
      },
      {
        id: '6',
        name: 'Sophia Martinez',
        branch: 'Miami',
        department: 'Customer Service',
        position: 'Customer Support Specialist',
        jobLevel: 'Level 1',
        employmentStatus: 'Part-time',
      },
      {
        id: '7',
        name: 'Alexander Garcia',
        branch: 'Boston',
        department: 'IT',
        position: 'System Administrator',
        jobLevel: 'Level 3',
        employmentStatus: 'Full-time',
      },
      {
        id: '8',
        name: 'Olivia Anderson',
        branch: 'Dallas',
        department: 'Operations',
        position: 'Operations Manager',
        jobLevel: 'Level 4',
        employmentStatus: 'Full-time',
      },
      {
        id: '9',
        name: 'Noah Wilson',
        branch: 'Houston',
        department: 'Research and Development',
        position: 'R&D Scientist',
        jobLevel: 'Level 2',
        employmentStatus: 'Full-time',
      },
      {
        id: '10',
        name: 'Ava Taylor',
        branch: 'Phoenix',
        department: 'Quality Assurance',
        position: 'QA Analyst',
        jobLevel: 'Level 1',
        employmentStatus: 'Full-time',
      },
    ],
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Employees' }, { text: 'Employee Management' }]}
        title="Employee Management"
        actions={
          <>
            <Button as={Link} to="/employee/employee-management/create" color="primary" className="ml-3">
              Add Employee
            </Button>
          </>
        }
      />

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
                  <Select placeholder="All Branch" options={[]} />
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

export default EmployeeManagementPage
