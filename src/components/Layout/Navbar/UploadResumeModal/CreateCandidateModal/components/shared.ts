import * as yup from 'yup'

export const experiencesSchema = yup.object().shape({
  experiences: yup.array().of(
    yup.object().shape({
      companyName: yup.string().required().label('Company Name'),
      positionName: yup.string().required().label('Position'),
      startDate: yup.date().required().label('Start Date'),
      endDate: yup.date().required().label('End Date'),
    }),
  ),
  expectedSalary: yup.string().required().label('Expected Salary'),
  freshGraduate: yup.boolean(),
})
