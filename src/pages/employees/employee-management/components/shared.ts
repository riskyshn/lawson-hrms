import * as yup from 'yup'

export const componentDataSchema = yup.object().shape({
  benefits: yup.array().of(
    yup.object().shape({
      componentId: yup.string().required().label('Component'),
      amountType: yup.string().required().label('Amount Type'),
      amount: yup.string().required().label('Amount'),
      maxCap: yup.string().required().label('Max Cap'),
      applicationType: yup.string().required().label('Application Type'),
      taxType: yup.string().required().label('Tax Type'),
    }),
  ),
  deductions: yup.array().of(
    yup.object().shape({
      componentId: yup.string().required().label('Component'),
      amountType: yup.string().required().label('Amount Type'),
      amount: yup.string().required().label('Amount'),
      maxCap: yup.string().required().label('Max Cap'),
      applicationType: yup.string().required().label('Application Type'),
      taxType: yup.string().required().label('Tax Type'),
    }),
  ),
})

export const defaultComponentValue = { componentId: '', amount: '', applicationType: '', maxCap: '', taxType: '', amountType: '' }
