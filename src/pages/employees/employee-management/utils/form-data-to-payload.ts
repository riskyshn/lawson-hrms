import currencyToNumber from '@/utils/currency-to-number'
import moment from 'moment'

export default function formDataToPayload(data: any) {
  const { personalData, payroll, components, employment } = data

  const payload = {
    name: personalData.name,
    email: personalData.email,
    employment,
    personalData: {
      ...personalData,
      birthDate: moment(personalData.birthDate).format('YYYY-MM-DD'),
    },
    payroll: {
      ...payroll,
      allowOvertime: !!payroll.allowOvertime,
      baseSalary: currencyToNumber(payroll.baseSalary),
      participateBpjs: !payroll.notParticipateBpjs,
    },
    components: {
      ...components,
      benefits: components.benefits.map((el: any) => ({ ...el, amount: currencyToNumber(el.amount) })),
      deductions: components.deductions.map((el: any) => ({ ...el, amount: currencyToNumber(el.amount) })),
    },
  }

  delete payload.personalData.name
  delete payload.personalData.email
  delete payload.payroll.notParticipateBpjs

  return payload
}
