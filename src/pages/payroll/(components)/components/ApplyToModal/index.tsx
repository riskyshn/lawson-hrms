import type { IBenefitComponent, IDeductionComponent } from '@/types'
import { useState } from 'react'
import { Button } from 'jobseeker-ui'
import { XIcon } from 'lucide-react'
import SideModal from '@/components/Modals/SideModal'
import EmployeeSelector from '../../../components/EmployeeSelector'
import SubmitModal from './SubmitModal'

type PropTypes = {
  item?: IBenefitComponent | IDeductionComponent | null
  onClose?: () => void
  type: 'BENEFIT' | 'DEDUCTION'
}

const ApplyToModal: React.FC<PropTypes> = ({ item, onClose, type }) => {
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
      <SubmitModal item={item} onClose={() => setSubmit(false)} payload={selected} show={submit} type={type} />

      <SideModal className="flex h-full flex-col" show={!!item && !submit}>
        <div className="flex items-center justify-between border-b bg-white p-3">
          <h3 className="block text-lg font-semibold">Select Employees</h3>
          <Button color="error" iconOnly onClick={handleClose} variant="light">
            <XIcon size={18} />
          </Button>
        </div>

        <EmployeeSelector selected={selected} setSelected={setSelected} />

        <div className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
          <Button className="min-w-24" color="error" onClick={handleClose} type="button" variant="light">
            Cancel
          </Button>
          <Button className="min-w-24" color="primary" disabled={!selected.length} onClick={() => setSubmit(true)} type="button">
            Submit
          </Button>
        </div>
      </SideModal>
    </>
  )
}

export default ApplyToModal
