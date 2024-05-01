import * as yup from 'yup'

export const schema = yup.object().shape({
  amount: yup
    .string()
    .required()
    .when('amountType', {
      is: 'percentage',
      then: (s) => s.transform(parseFloat).min(0).transform(String),
    })
    .label('Amount'),
  amountType: yup.string().required().label('Amount Type'),
  applicationType: yup.string().required().label('Application Type'),
  maxCap: yup.string().required().label('Max Cap'),
  name: yup.string().required().label('Component Name'),
  taxType: yup.string().required().label('Tax Type'),
})
