import moment from 'moment'
import { currencyToNumber } from '@/utils'

export default function formDataToPayload(data: any) {
  const { components, employment, payroll, personalData } = data

  const payload = {
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
    email: personalData.email,
    employment: {
      branchId: employment.branch.value,
      departmentId: employment.department.value,
      employeeCode: employment.employeeCode,
      jobLevelId: employment.jobLevel.value,
      jobTypeId: employment.jobType.value,
      picApprovalId: employment.picApproval.value,
      positionId: employment.position.value,
      roleId: employment.role.value,
      scheduleId: employment.schedule.value,
    },
    name: personalData.name,
    payroll: {
      ...payroll,
      allowOvertime: !!payroll.allowOvertime,
      baseSalary: currencyToNumber(payroll.baseSalary),
      participateBpjs: !payroll.notParticipateBpjs,
    },
    personalData: {
      birthDate: moment(personalData.birthDate).format('YYYY-MM-DD'),
      cityOfBirth: personalData.cityOfBirth.value,
      email: personalData.email,
      genderId: personalData.gender.value,
      linkNationalId: personalData.linkNationalId,
      maritalStatusId: personalData.maritalStatus.value,
      name: personalData.name,
      nationIdAddress: personalData.nationIdAddress,
      nationalIdNumber: personalData.nationalIdNumber,
      numberOfChildren: personalData.numberOfChildren,
      phoneNumber: personalData.phoneNumber,
      postalCode: personalData.postalCode,
      religionId: personalData.religion.value,
      residentalAddress: personalData.residentalAddress,
    },
  }

  delete payload.personalData.name
  delete payload.personalData.email
  delete payload.payroll.notParticipateBpjs

  return payload
}
