import MainModal from '@/components/Elements/MainModal'
import { Button, Card, CardBody, CardFooter, Input, Select } from 'jobseeker-ui'
import React from 'react'

type PropType = {
  item?: IDeductionComponent | null
  onClose?: () => void
}

const EditModal: React.FC<PropType> = ({ item, onClose }) => {
  return (
    <MainModal show={!!item} onClose={onClose} className="p-0">
      <Card as="form" className="border-0">
        <CardBody className="py-6 text-center">
          <h3 className="text-2xl font-semibold">Edit Deduction Component</h3>
          <p className="text-xs text-gray-500">Edit Your Company Payroll Component</p>
        </CardBody>

        <CardBody className="grid grid-cols-1 gap-2">
          <Input label="Component Title" placeholder="Component Title" labelRequired />
          <Select label="Fixed/Percentage" placeholder="Fixed/Percentage" labelRequired options={[]} />
          <Input label="Amount" placeholder="Amount" labelRequired />
          <Input label="Max. Cap" placeholder="Max. Cap" labelRequired />
          <Select label="Application Type" placeholder="Application Type" labelRequired options={[]} />
          <Select label="Taxable/Non-Taxable" placeholder="Taxable/Non-Taxable" labelRequired options={[]} />
        </CardBody>

        <CardFooter>
          <Button type="button" color="primary">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </MainModal>
  )
}

export default EditModal
