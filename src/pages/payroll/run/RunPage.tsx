import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputDate, useToast } from 'jobseeker-ui'
import SelectEmployeeModal from './components/SelectEmployeeModal'
import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const RunPage = () => {
  const [showModal, setShowModal] = useState(false)

  // const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const toast = useToast()

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      }
    }

    loadEmployees()
  }, [toast])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Payroll' }, { text: 'Run' }]} title="Payroll" />
      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card>
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Run Payroll Request</h3>
              <p className="text-xs text-gray-500">You can check payroll Requests here</p>
            </div>
            <Input labelRequired label="Title" />
            <InputDate label="Period" displayFormat="DD-MM-YYYY" />
            <InputDate label="Schedule" asSingle useRange={false} displayFormat="DD-MM-YYYY" />
            <div className="flex flex-col">
              <span className="text-xs">Who will be processed in this run payroll?</span>
              <div className="mt-2 flex items-center">
                <Button color="primary" variant="outline" onClick={() => setShowModal(true)}>
                  Select Employee
                </Button>
                <div className="ml-4 flex items-center">
                  <InputCheckbox id="employees" size={16} />
                  <span className="ml-2 text-xs">Select All Employees ({employees?.length})</span>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="mt-8 flex justify-end gap-3">
            <Button type="button" color="error" variant="light" className="w-24">
              Cancel
            </Button>
            <Button type="button" color="primary">
              Create
            </Button>
          </CardFooter>
        </Card>
      </Container>
      {showModal && <SelectEmployeeModal show onClose={() => setShowModal(false)} employees={employees} />}
    </>
  )
}

export default RunPage
