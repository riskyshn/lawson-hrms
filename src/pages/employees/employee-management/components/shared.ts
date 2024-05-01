import * as yup from 'yup'

export const componentDataSchema = yup.object().shape({
  benefits: yup.array().of(
    yup.object().shape({
      amount: yup.string().required().label('Amount'),
      amountType: yup.string().required().label('Amount Type'),
      applicationType: yup.string().required().label('Application Type'),
      componentId: yup.string().required().label('Component'),
      maxCap: yup.string().required().label('Max Cap'),
      taxType: yup.string().required().label('Tax Type'),
    }),
  ),
  deductions: yup.array().of(
    yup.object().shape({
      amount: yup.string().required().label('Amount'),
      amountType: yup.string().required().label('Amount Type'),
      applicationType: yup.string().required().label('Application Type'),
      componentId: yup.string().required().label('Component'),
      maxCap: yup.string().required().label('Max Cap'),
      taxType: yup.string().required().label('Tax Type'),
    }),
  ),
})

export const defaultComponentValue = { amount: '', amountType: '', applicationType: '', componentId: '', maxCap: '', taxType: '' }
