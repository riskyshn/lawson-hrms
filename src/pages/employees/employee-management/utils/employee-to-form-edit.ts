import type { IEmployee } from '@/types'
import { employeeService } from '@/services'
import { emmbedToOption } from '@/utils'

export async function employeeToFormEdit(employee: IEmployee) {
  const isPicActive = employee.employment?.picApproval?.oid
    ? (await employeeService.isEmployeeActive(employee.employment.picApproval.oid)).active
    : false

  return {
    components: {
      benefits: (employee.components?.benefits || []).map((benefit) => ({
        amount: benefit.amount,
        amountType: benefit.amountType?.oid || '',
        applicationType: benefit.applicationType?.oid || '',
        componentId: benefit.component?.oid || '',
        maxCap: benefit.maxCap,
        taxType: benefit.taxType?.oid || '',
      })),
      deductions: (employee.components?.deductions || []).map((deduction) => ({
        amount: deduction.amount,
        amountType: deduction.amountType?.oid || '',
        applicationType: deduction.applicationType?.oid || '',
        componentId: deduction.component?.oid || '',
        maxCap: deduction.maxCap,
        taxType: deduction.taxType?.oid || '',
      })),
    },
    employment: {
      branch: emmbedToOption(employee.employment?.branch),
      department: emmbedToOption(employee.employment?.department),
      employeeCode: employee.employeeCode || '',
      jobLevel: emmbedToOption(employee.employment?.jobLevel),
      jobType: emmbedToOption(employee.employment?.jobType),
      picApproval: isPicActive ? emmbedToOption(employee.employment?.picApproval) : undefined,
      position: emmbedToOption(employee.employment?.position),
      role: emmbedToOption(employee.employment?.role),
      schedule: emmbedToOption(employee.employment?.schedule),
    },
    payroll: {
      accountHolderName: employee.payroll?.bank?.accountHolderName || '',
      accountNumber: employee.payroll?.bank?.accountNumber || '',
      allowOvertime: employee.payroll?.allowOvertime ? 1 : 0,
      bankName: employee.payroll?.bank?.bankName || '',
      baseSalary: employee.payroll?.baseSalary || 0,
      baseSalaryType: employee.payroll?.baseSalaryType?.oid || '',
      category: employee.payroll?.taxConfig?.category || '',
      employmentTaxStatus: employee.payroll?.taxConfig?.taxStatus?.oid || '',
      jkk: employee.payroll?.bpjs?.paidByEmployer?.jkk?.rate || 0,
      notParticipateBpjs: !employee.payroll?.participateBpjs,
      npwpNumber: employee.payroll?.taxConfig?.npwpNumber || '',
      ptkpStatus: employee.payroll?.taxConfig?.ptkpStatus || '',
      taxMethod: employee.payroll?.taxMethod?.oid || '',
    },
    personalData: {
      birthDate: new Date(employee.personalData?.birthDate || new Date()),
      cityOfBirth: emmbedToOption(employee.personalData?.cityOfBirth),
      email: employee.email || '',
      gender: emmbedToOption(employee.personalData?.gender),
      linkNationalId: employee.personalData?.linkNationalId || '',
      maritalStatus: emmbedToOption(employee.personalData?.maritalStatus),
      name: employee.name || '',
      nationIdAddress: employee.personalData?.nationIdAddress || '',
      nationalIdNumber: employee.personalData?.nationalIdNumber || '',
      numberOfChildren: employee.personalData?.numberOfChildren || 0,
      phoneNumber: employee.personalData?.phoneNumber || '',
      postalCode: employee.personalData?.postalCode || '',
      religion: emmbedToOption(employee.personalData?.religion),
      residentalAddress: employee.personalData?.residentalAddress || '',
    },
  }
}
