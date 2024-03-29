import MainModal from '@/components/Elements/MainModal'
import { Button, Input, Select } from 'jobseeker-ui'
import React from 'react'

type PropTypes = {
  component: IBenefitComponent | IDeductionComponent
  show: boolean
  onClose: () => void
}

const SubmitModal: React.FC<PropTypes> = ({ show, component, onClose }) => {
  return (
    <MainModal show={show} className="flex flex-col gap-5">
      <div className="text-center">
        <h4 className="mb-2 text-2xl font-semibold">Component Details</h4>
        <p className="text-xs">Apply {component.name} to Employee</p>
      </div>

      <div className="flex flex-col gap-3">
        <Input label="Component Title" labelRequired value={component.name} disabled />
        <Select label="Fixed/Percentage" placeholder="Fixed/Percentage" labelRequired options={[]} />
        <Input label="Amount" placeholder="Amount" labelRequired />
        <Input label="Max. Cap" placeholder="Rp." labelRequired />
        <Select label="Application Type" placeholder="Based on Working Days, Lump Sum" labelRequired options={[]} />
        <Select label="Taxable/Non-Taxable" placeholder="Taxable/Non-Taxable" labelRequired options={[]} />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" color="error" variant="light" className="w-24" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onClose}>
          Submit
        </Button>
      </div>
    </MainModal>
  )
}

export default SubmitModal
