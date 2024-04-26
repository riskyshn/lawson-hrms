import currencyToNumber from '@/utils/currency-to-number'
import moment from 'moment'

export default function formDataToPayload(data: any) {
  const { personalData, payroll, components, employment } = data

  const payload = {
    name: personalData.name,
    email: personalData.email,
    employment: {
      employeeCode: employment,
      roleId: employment.role.value,
      jobTypeId: employment.jobType.value,
      branchId: employment.branch.value,
      departmentId: employment.department.value,
      positionId: employment.position.value,
      jobLevelId: employment.jobLevel.value,
      picApprovalId: employment.picApproval.value,
      scheduleId: employment.schedule.value,
    },
    personalData: {
      name: personalData.name,
      email: personalData.email,
      genderid: personalData.gender.value,
      religionId: personalData.religion.value,
      cityOfBirth: personalData.cityOfBirth.value,
      maritalStatusId: personalData.maritalStatus.value,
      phoneNumber: personalData.phoneNumber,
      birthDate: moment(personalData.birthDate).format('YYYY-MM-DD'),
      numberOfChildren: personalData.numberOfChildren,
      linkNationalId: personalData.linkNationalId,
      nationalIdNumber: personalData.nationalIdNumber,
      postalCode: personalData.postalCode,
      nationIdAddress: personalData.nationIdAddress,
      residentalAddress: personalData.residentalAddress,
    },
    payroll: {
      ...payroll,
      allowOvertime: !!payroll.allowOvertime,
      baseSalary: currencyToNumber(payroll.baseSalary),
      participateBpjs: !payroll.notParticipateBpjs,
    },
    components: {
      ...components,
      benefits: components.benefits.map((el: any) => ({
        ...el,
        amount: currencyToNumber(el.amount),
        maxCap: currencyToNumber(el.maxCap),
      })),
      deductions: components.deductions.map((el: any) => ({
        ...el,
        amount: currencyToNumber(el.amount),
        maxCap: currencyToNumber(el.maxCap),
      })),
    },
  }

  delete payload.personalData.name
  delete payload.personalData.email
  delete payload.payroll.notParticipateBpjs

  return payload
}
