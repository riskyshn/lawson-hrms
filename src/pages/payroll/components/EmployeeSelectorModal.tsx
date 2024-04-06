import SideModal from '@/components/Elements/SideModal'
import EmployeeSelector from '@/components/Modules/Payroll/EmployeeSelector'
import { Button } from 'jobseeker-ui'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type PropTypes = {
  show?: boolean
  onClose?: () => void

  selected: string[]
  setSelected: (selected: string[]) => void
  employees?: IDataTableEmployee[]
}

const EmployeeSelectorModal: React.FC<PropTypes> = ({ selected, setSelected, employees, show, onClose }) => {
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    setValue(selected)
  }, [selected])

  const handleSubmit = () => {
    setSelected(value)
    handleClose()
  }

  const handleClose = () => {
    onClose?.()
  }

  return (
    <SideModal show={show} className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b bg-white p-3">
        <h3 className="block text-lg font-semibold">Select Employees</h3>
        <Button iconOnly color="error" variant="light" onClick={handleClose}>
          <XIcon size={18} />
        </Button>
      </div>

      <EmployeeSelector employees={employees} selected={value} setSelected={setValue} />

      <div className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
        <Button type="button" className="min-w-24" color="error" variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="button" className="min-w-24" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </SideModal>
  )
}

export default EmployeeSelectorModal
