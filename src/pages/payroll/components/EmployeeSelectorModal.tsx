import type { IDataTableEmployee } from '@/types'
import { useEffect, useState } from 'react'
import { Button } from 'jobseeker-ui'
import { XIcon } from 'lucide-react'
import SideModal from '@/components/Elements/Modals/SideModal'
import EmployeeSelector from './EmployeeSelector'

type PropTypes = {
  employees?: IDataTableEmployee[]
  onClose?: () => void

  selected: string[]
  setSelected: (selected: string[]) => void
  show?: boolean
}

const EmployeeSelectorModal: React.FC<PropTypes> = ({ employees, onClose, selected, setSelected, show }) => {
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
    <SideModal className="flex h-full flex-col" show={show}>
      <div className="flex items-center justify-between border-b bg-white p-3">
        <h3 className="block text-lg font-semibold">Select Employees</h3>
        <Button color="error" iconOnly onClick={handleClose} variant="light">
          <XIcon size={18} />
        </Button>
      </div>

      <EmployeeSelector employees={employees} selected={value} setSelected={setValue} />

      <div className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
        <Button className="min-w-24" color="error" onClick={handleClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" onClick={handleSubmit} type="button">
          Submit
        </Button>
      </div>
    </SideModal>
  )
}

export default EmployeeSelectorModal
