import { currencyToNumber } from '@jshrms/shared/utils'
import moment from 'moment'

export default function formCreateToPayload(data: any) {
  return {
    birthDate: moment(data.personalInformation.birthDate).format('YYYY-MM-DD'),
    cityId: data.personalInformation.city?.value,
    cvURL: data.personalInformation.cvURL,

    educations: [
      {
        educationId: data.educations.education?.value,
        endDate: moment(data.educations.endDate).format('YYYY-MM-DD'),
        gpa: Number(data.educations.gpa).toFixed(2),
        institutionId: data.educations.institutionId,
        majorId: data.educations.majorId,
        startDate: moment(data.educations.startDate).format('YYYY-MM-DD'),
      },
    ],
    email: data.personalInformation.email,
    emailConfirmation: data.personalInformation.email,
    expectedSalary: currencyToNumber(data.workingExperiences.expectedSalary),
    freshGraduate: data.workingExperiences.freshGraduate,
    fullName: data.personalInformation.fullName,
    genderId: data.personalInformation.gender?.value,
    nik: data.personalInformation.nik,
    password: data.personalInformation.password,
    passwordConfirmation: data.personalInformation.password,
    phoneNumber: data.personalInformation.phoneNumber,
    photoURL: data.personalInformation.photoURL,
    provinceId: data.personalInformation.province?.value,
    workingExperiences: data.workingExperiences.experiences.map((el: any) => ({
      ...el,
      endDate: moment(el.endDate).format('YYYY-MM-DD'),
      startDate: moment(el.startDate).format('YYYY-MM-DD'),
    })),
  }
}
