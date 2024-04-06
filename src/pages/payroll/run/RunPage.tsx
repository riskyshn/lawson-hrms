import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import LoadingScreen from '@/components/UI/LoadingScreen'
import { employeeService } from '@/services'
import { Button, Card, CardBody, CardFooter, Input, InputDate, InputWrapper } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import EmployeeSelectorModal from '../components/EmployeeSelectorModal'

const RunPage = () => {
  const [showSelectEmployeeModal, setShowSelectEmployeeModal] = useState(false)
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [pageError, setPageError] = useState<any>()

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (e) {
        setPageError(e)
      }
    }

    loadEmployees()
  }, [])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Run Payroll' }]}
        title="Run Payroll"
        subtitle={
          <>
            You can check payroll <span className="text-primary-600">Requests here</span>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card>
          <LoadingScreen show={!employees} className="py-32" />

          {employees && (
            <CardBody className="grid grid-cols-1 gap-2">
              <Input labelRequired label="Title" />
              <InputDate label="Period" displayFormat="DD-MM-YYYY" />
              <InputDate label="Schedule" asSingle useRange={false} displayFormat="DD-MM-YYYY" />
              <InputWrapper
                label="Who will be processed in this run payroll?"
                labelRequired
                wrapperClassName="flex py-1 gap-3 items-center"
              >
                <Button color="primary" variant="outline" onClick={() => setShowSelectEmployeeModal(true)}>
                  Select Employees
                </Button>
                <span className="block">
                  {selectedEmployees.length} Selected of {employees.length} Employees
                </span>
              </InputWrapper>
            </CardBody>
          )}

          <CardFooter className="gap-3">
            <Button type="button" color="error" variant="light" className="w-24">
              Cancel
            </Button>
            <Button type="button" color="primary" className="w-24">
              Create
            </Button>
          </CardFooter>
        </Card>
      </Container>

      {employees && (
        <EmployeeSelectorModal
          show={showSelectEmployeeModal}
          employees={employees}
          selected={selectedEmployees}
          setSelected={setSelectedEmployees}
          onClose={() => setShowSelectEmployeeModal(false)}
        />
      )}
    </>
  )
}

export default RunPage
