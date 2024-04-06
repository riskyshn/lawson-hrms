import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required().label('Component Name'),
  amountType: yup.string().required().label('Amount Type'),
  amount: yup
    .string()
    .required()
    .when('amountType', {
      is: 'percentage',
      then: (s) => s.transform(parseFloat).min(0).transform(String),
    })
    .label('Amount'),
  maxCap: yup.string().required().label('Max Cap'),
  applicationType: yup.string().required().label('Application Type'),
  taxType: yup.string().required().label('Tax Type'),
})
