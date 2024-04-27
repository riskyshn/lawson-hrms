import { employeeService } from '@/services'
import emmbedToOption from '@/utils/emmbed-to-option'

export async function employeeToFormEdit(employee: IEmployee) {
  const isPicActive = employee.employment?.picApproval?.oid
    ? (await employeeService.isEmployeeActive(employee.employment.picApproval.oid)).active
    : false

  return {
    personalData: {
      name: employee.name || '',
      residentalAddress: employee.personalData?.residentalAddress || '',
      nationIdAddress: employee.personalData?.nationIdAddress || '',
      postalCode: employee.personalData?.postalCode || '',
      nationalIdNumber: employee.personalData?.nationalIdNumber || '',
      linkNationalId: employee.personalData?.linkNationalId || '',
      numberOfChildren: employee.personalData?.numberOfChildren || 0,
      maritalStatus: emmbedToOption(employee.personalData?.maritalStatus),
      birthDate: new Date(employee.personalData?.birthDate || new Date()),
      cityOfBirth: emmbedToOption(employee.personalData?.cityOfBirth),
      phoneNumber: employee.personalData?.phoneNumber || '',
      religion: emmbedToOption(employee.personalData?.religion),
      gender: emmbedToOption(employee.personalData?.gender),
      email: employee.email || '',
    },
    employment: {
      employeeCode: employee.employeeCode || '',
      role: emmbedToOption(employee.employment?.role),
      jobType: emmbedToOption(employee.employment?.jobType),
      branch: emmbedToOption(employee.employment?.branch),
      department: emmbedToOption(employee.employment?.department),
      position: emmbedToOption(employee.employment?.position),
      jobLevel: emmbedToOption(employee.employment?.jobLevel),
      picApproval: isPicActive ? emmbedToOption(employee.employment?.picApproval) : undefined,
      schedule: emmbedToOption(employee.employment?.schedule),
    },
    payroll: {
      jkk: employee.payroll?.bpjs?.paidByEmployer?.jkk?.rate || 0,
      notParticipateBpjs: !employee.payroll?.participateBpjs,
      ptkpStatus: employee.payroll?.taxConfig?.ptkpStatus || '',
      category: employee.payroll?.taxConfig?.category || '',
      npwpNumber: employee.payroll?.taxConfig?.npwpNumber || '',
      employmentTaxStatus: employee.payroll?.taxConfig?.taxStatus?.oid || '',
      accountHolderName: employee.payroll?.bank?.accountHolderName || '',
      accountNumber: employee.payroll?.bank?.accountNumber || '',
      bankName: employee.payroll?.bank?.bankName || '',
      allowOvertime: employee.payroll?.allowOvertime ? 1 : 0,
      baseSalaryType: employee.payroll?.baseSalaryType?.oid || '',
      baseSalary: employee.payroll?.baseSalary || 0,
      taxMethod: employee.payroll?.taxMethod?.oid || '',
    },
    components: {
      benefits: (employee.components?.benefits || []).map((benefit) => ({
        componentId: benefit.component?.oid || '',
        taxType: benefit.taxType?.oid || '',
        amountType: benefit.amountType?.oid || '',
        amount: benefit.amount,
        maxCap: benefit.maxCap,
        applicationType: benefit.applicationType?.oid || '',
      })),
      deductions: (employee.components?.deductions || []).map((deduction) => ({
        componentId: deduction.component?.oid || '',
        taxType: deduction.taxType?.oid || '',
        amountType: deduction.amountType?.oid || '',
        amount: deduction.amount,
        maxCap: deduction.maxCap,
        applicationType: deduction.applicationType?.oid || '',
      })),
    },
  }
}
