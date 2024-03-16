import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { employeeService, organizationService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { BaseSelect, Button, Card, CardBody, CardFooter, OptionProps, Spinner, useToast } from 'jobseeker-ui'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ApproveListPage: React.FC = () => {
  const [employees, setEmployees] = useState<OptionProps[]>([])
  const [values, setValues] = useState<string[]>([])
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageError, setPageError] = useState<any>()
  const organizationStore = useOrganizationStore()
  const toast = useToast()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.fetchEmployees({ limit: 100000 })
        const employeeOptions = data.content.map((el) => ({ label: el.name || el.oid, value: el.oid }))
        setEmployees(employeeOptions)
        setInitLoading(false)
      } catch (error) {
        setPageError(error)
      }
    }

    setValues(organizationStore.master.approvals.map((el) => el.employee.oid))
    fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const data = await organizationService.createApproval(values.filter((el) => !!el))
      organizationStore.setApprovals(data)
      toast('Approval process setup successfully', { color: 'success', position: 'top-right' })
    } catch (error: any) {
      toast(axiosErrorMessage(error), { color: 'error', position: 'top-right' })
    }

    setLoading(false)
  }

  const handleUpdateValue = (index: number, value: string) => {
    const updatedValues = [...values]
    updatedValues[index] = value
    setValues(updatedValues)
  }

  const handleRemove = (index: number) => {
    const updatedValues = [...values]
    updatedValues.splice(index, 1)
    setValues(updatedValues)
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Approve List' }]}
        title="Setup Approval"
        subtitle="Setup Approval Process for Your Job Requisition"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        {initLoading && (
          <div className="flex items-center justify-center py-48">
            <Spinner height={40} className="text-primary-600" />
          </div>
        )}

        {!initLoading && (
          <Card<'form'> as="form" onSubmit={handleSubmit}>
            <CardBody className="grid grid-cols-1 gap-2">
              <h3 className="text-lg font-semibold">Approval</h3>

              {values.map((el, i) => (
                <div className="flex gap-1" key={i}>
                  <BaseSelect
                    value={el}
                    onChange={(value) => handleUpdateValue(i, value.toString())}
                    className="w-full"
                    placeholder="Please Select Aprover"
                    options={employees.filter((employee) => !values.includes(employee.value.toString()) || employee.value === el)}
                  />
                  <Button color="error" iconOnly type="button" disabled={values.length <= 1} onClick={() => handleRemove(i)}>
                    <MinusCircleIcon size={16} />
                  </Button>
                </div>
              ))}

              <Button block type="button" onClick={() => setValues((states) => [...states, ''])} variant="light" color="primary">
                <PlusCircleIcon size={16} />
              </Button>
            </CardBody>

            <CardFooter className="gap-3">
              <Button type="submit" color="primary" className="w-32" loading={loading} disabled={loading}>
                Save
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  )
}

export default ApproveListPage
