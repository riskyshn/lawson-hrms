import { employeeService } from '@/services'

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
      maritalStatusId: employee.personalData?.maritalStatus?.oid || '',
      birthDate: new Date(employee.personalData?.birthDate || new Date()),
      cityOfBirth: employee.personalData?.cityOfBirth?.name || '',
      phoneNumber: employee.personalData?.phoneNumber || '',
      religionId: employee.personalData?.religion?.oid || '',
      genderId: employee.personalData?.gender?.oid || '',
      email: employee.email || '',
    },
    employment: {
      employeeCode: employee.employeeCode || '',
      roleId: employee.employment?.role?.oid || '',
      jobTypeId: employee.employment?.jobType?.oid || '',
      branchId: employee.employment?.branch?.oid || '',
      departmentId: employee.employment?.department?.oid || '',
      positionId: employee.employment?.position?.oid || '',
      jobLevelId: employee.employment?.jobLevel?.oid || '',
      picApprovalId: isPicActive ? employee.employment?.picApproval?.oid || '' : '',
      scheduleId: employee.employment?.schedule?.oid || '',
    },
    payroll: {
      jkk: employee.payroll?.bpjs?.paidByCompany?.jkk || 0,
      notParticipateBpjs: !employee.payroll?.participateBpjs,
      ptkpStatus: employee.payroll?.taxConfig?.ptkpStatus || '',
      npwpNumber: employee.payroll?.taxConfig?.npwpNumber || '',
      employmentTaxStatus: employee.payroll?.taxConfig?.taxStatus || 0,
      accountHolderName: employee.payroll?.bank?.accountHolderName || '',
      accountNumber: employee.payroll?.bank?.accountNumber || '',
      bankName: employee.payroll?.bank?.bankName || '',
      allowOvertime: employee.payroll?.allowOvertime ? 1 : 0,
      baseSalaryType: employee.payroll?.baseSalaryType || 0,
      baseSalary: employee.payroll?.baseSalary,
      taxMethod: employee.payroll?.taxMethod || '',
    },
    components: {
      benefits: (employee.components?.benefits || []).map((benefit) => ({
        componentId: benefit.component?.oid || '',
        taxType: benefit.taxType || 0,
        amountType: benefit.amountType || 0,
        amount: benefit.amount,
        applicationType: benefit.applicationType || 0,
      })),
      deductions: (employee.components?.deductions || []).map((deduction) => ({
        componentId: deduction.component?.oid || '',
        taxType: deduction.taxType || 0,
        amountType: deduction.amountType || 0,
        amount: deduction.amount,
        applicationType: deduction.applicationType || 0,
      })),
    },
  }
}
