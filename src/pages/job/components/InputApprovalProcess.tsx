import { employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { BaseSelect, Button, InputWrapper, OptionProps } from 'jobseeker-ui'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const InputApprovalProcess: React.FC<{
  error?: string | (string | undefined)[]
  value?: string[]
  onChange?: (value: string[]) => void
}> = ({ error, value, onChange }) => {
  const [employees, setEmployees] = useState<OptionProps[]>([])
  const organizationStore = useOrganizationStore()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.fetchEmployees({ limit: 1000000 })
        const employeeOptions = data.content.map((el) => ({ label: el.name || '', value: el.oid }))
        const ids = organizationStore.master.approvals.map((el) => el.employee.oid)
        setEmployees(employeeOptions.filter((el) => ids.includes(el.value)))
      } catch (error) {
        console.error(error)
      }
    }

    fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateValue = (index: number, v: string) => {
    if (!value) return

    const updatedValues = [...value]
    updatedValues[index] = v
    onChange?.(updatedValues)
  }

  const handleRemove = (index: number) => {
    if (!value) return

    const updatedValues = [...value]
    updatedValues.splice(index, 1)
    onChange?.(updatedValues)
  }

  return (
    <>
      <InputWrapper error={typeof error === 'string' ? error : ''}>
        {value?.map((el, i) => (
          <InputWrapper className="mb-3 last:mb-0" key={i} error={typeof error === 'object' ? error[i] : ''}>
            <div className="flex gap-1">
              <BaseSelect
                value={el}
                onChange={(value) => handleUpdateValue(i, value.toString())}
                className="w-full"
                placeholder="Please Select Aprover"
                error={typeof error === 'object' ? error[i] : ''}
                options={employees.filter((employee) => !value.includes(employee.value.toString()) || employee.value === el)}
              />
              <Button color="error" iconOnly type="button" disabled={value.length <= 1} onClick={() => handleRemove(i)}>
                <MinusCircleIcon size={16} />
              </Button>
            </div>
          </InputWrapper>
        ))}
      </InputWrapper>

      <Button block type="button" onClick={() => onChange?.([...(value || []), ''])} variant="light" color="primary">
        <PlusCircleIcon size={16} />
      </Button>
    </>
  )
}

export default InputApprovalProcess
