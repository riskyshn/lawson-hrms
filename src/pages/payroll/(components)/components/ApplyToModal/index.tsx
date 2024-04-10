import SideModal from '@/components/Elements/Modals/SideModal'
import { Button } from 'jobseeker-ui'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import EmployeeSelector from '../../../components/EmployeeSelector'
import SubmitModal from './SubmitModal'

type PropTypes = {
  type: 'BENEFIT' | 'DEDUCTION'
  item?: IBenefitComponent | IDeductionComponent | null
  onClose?: () => void
}

const ApplyToModal: React.FC<PropTypes> = ({ type, item, onClose }) => {
  const [selected, setSelected] = useState<string[]>([])
  const [submit, setSubmit] = useState(false)

  const handleClose = () => {
    setSubmit(false)
    onClose?.()
    setTimeout(() => {
      setSelected([])
    }, 200)
  }

  return (
    <>
      <SubmitModal type={type} item={item} show={submit} payload={selected} onClose={() => setSubmit(false)} />

      <SideModal show={!!item && !submit} className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b bg-white p-3">
          <h3 className="block text-lg font-semibold">Select Employees</h3>
          <Button iconOnly color="error" variant="light" onClick={handleClose}>
            <XIcon size={18} />
          </Button>
        </div>

        <EmployeeSelector selected={selected} setSelected={setSelected} />

        <div className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
          <Button type="button" className="min-w-24" color="error" variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" className="min-w-24" color="primary" disabled={!selected.length} onClick={() => setSubmit(true)}>
            Submit
          </Button>
        </div>
      </SideModal>
    </>
  )
}

export default ApplyToModal
