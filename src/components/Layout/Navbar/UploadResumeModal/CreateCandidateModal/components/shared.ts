import * as yup from 'yup'

export const experiencesSchema = yup.object().shape({
  expectedSalary: yup.string().required().label('Expected Salary'),
  experiences: yup.array().of(
    yup.object().shape({
      companyName: yup.string().required().label('Company Name'),
      endDate: yup.date().required().label('End Date'),
      positionName: yup.string().required().label('Position'),
      startDate: yup.date().required().label('Start Date'),
    }),
  ),
  freshGraduate: yup.boolean(),
})
