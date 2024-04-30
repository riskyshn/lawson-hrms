import currencyToNumber from '@/utils/currency-to-number'
import moment from 'moment'

export default function formCreateToPayload(data: any) {
  return {
    workingExperiences: data.workingExperiences.experiences.map((el: any) => ({
      ...el,
      startDate: moment(el.startDate).format('YYYY-MM-DD'),
      endDate: moment(el.endDate).format('YYYY-MM-DD'),
    })),
    freshGraduate: data.workingExperiences.freshGraduate,
    expectedSalary: currencyToNumber(data.workingExperiences.expectedSalary),

    fullName: data.personalInformation.fullName,
    nik: data.personalInformation.nik,
    email: data.personalInformation.email,
    emailConfirmation: data.personalInformation.email,
    password: data.personalInformation.password,
    passwordConfirmation: data.personalInformation.password,
    phoneNumber: data.personalInformation.phoneNumber,
    photoURL: data.personalInformation.photoURL,
    birthDate: moment(data.personalInformation.birthDate).format('YYYY-MM-DD'),
    genderId: data.personalInformation.gender?.value,
    provinceId: data.personalInformation.province?.value,
    cityId: data.personalInformation.city?.value,
    cvURL: data.personalInformation.cvURL,
    educations: [
      {
        institutionId: data.educations.institutionId,
        majorId: data.educations.majorId,
        gpa: Number(data.educations.gpa).toFixed(2),
        educationId: data.educations.education?.value,
        startDate: moment(data.educations.startDate).format('YYYY-MM-DD'),
        endDate: moment(data.educations.endDate).format('YYYY-MM-DD'),
      },
    ],
  }
}
