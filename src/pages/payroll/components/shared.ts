import * as yup from 'yup'

const generateOptions = (items: string[]) => items.map((item) => ({ label: item, value: item }))

export const schema = yup.object().shape({
  name: yup.string().required().label('Component Name'),
  amountType: yup.string().required().label('Amount Type'),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Amount'),
  maxCap: yup.string().required().label('Max Cap'),
  applicationType: yup.string().required().label('Application Type'),
  taxType: yup.string().required().label('Tax Type'),
})

export const options = {
  amountType: generateOptions(['percentage', 'fixed']),
  applicationType: generateOptions(['lump-sum', 'working-days']),
  taxType: generateOptions(['taxable', 'non-taxable']),
}
