import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BaseSelect, Button, Card, CardBody, CardFooter, OptionProps, Spinner, useToast } from '@jshrms/ui'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { employeeService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

export const Component: React.FC = () => {
  const [employees, setEmployees] = useState<OptionProps[]>([])
  const [values, setValues] = useState<string[]>([])
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageError, setPageError] = useState<any>()
  const toast = useToast()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const [employees, approvals] = await Promise.all([
          employeeService.fetchEmployees({ limit: 999999 }),
          organizationService.fetchApprovals({ limit: 999999 }),
        ])

        const employeeOptions = employees.content.map((el) => ({ label: el.name || el.oid, value: el.oid }))
        setValues(approvals.content.map((el) => el.employee.oid))
        setEmployees(employeeOptions)
        setInitLoading(false)
      } catch (error) {
        setPageError(error)
      }
    }

    fetchEmployees()
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await organizationService.createApproval(values.filter((el) => !!el))
      toast('Approval process setup successfully', { color: 'success' })
    } catch (error: any) {
      toast(axiosErrorMessage(error), { color: 'error' })
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
        actions={
          <Button as={Link} color="error" to="/job/requisition" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Approve List' }]}
        subtitle="Setup Approval Process for Your Job Requisition"
        title="Setup Approval"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        {initLoading && (
          <div className="flex items-center justify-center py-48">
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {!initLoading && (
          <Card<'form'> as="form" onSubmit={handleSubmit}>
            <CardBody className="grid grid-cols-1 gap-2">
              <h3 className="text-lg font-semibold">Approval</h3>

              {values.map((el, i) => (
                <div className="flex gap-1" key={i}>
                  <BaseSelect
                    className="w-full"
                    onChange={(value) => handleUpdateValue(i, value.toString())}
                    options={employees.filter((employee) => !values.includes(employee.value.toString()) || employee.value === el)}
                    placeholder="Please Select Aprover"
                    value={el}
                  />
                  <Button color="error" disabled={values.length <= 1} iconOnly onClick={() => handleRemove(i)} type="button">
                    <MinusCircleIcon size={16} />
                  </Button>
                </div>
              ))}

              <Button block color="primary" onClick={() => setValues((states) => [...states, ''])} type="button" variant="light">
                <PlusCircleIcon size={16} />
              </Button>
            </CardBody>

            <CardFooter className="gap-3">
              <Button className="w-32" color="primary" disabled={loading} loading={loading} type="submit">
                Save
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  )
}

Component.displayName = 'ApproveListPage'
