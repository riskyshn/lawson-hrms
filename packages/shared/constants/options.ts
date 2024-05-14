import genOptions from '@/utils/gen-options'

export const AMOUNT_TYPE_OPTIONS = genOptions(['PERCENTAGE', 'FIXED'])
export const APPLICATION_TYPE_OPTIONS = genOptions(['LUMP_SUM', 'WORKING_DAYS'])
export const TAX_TYPE_OPTIONS = genOptions(['TAXABLE', 'NON_TAXABLE'])
export const TAX_METHOD_OPTIONS = genOptions(['GROSS', 'GROSS_UP' /*, ['NET', 'Netto']*/])

export const BASE_SALARY_TYPE_OPTIONS = genOptions(['LUMP_SUM', 'WORKING_DAYS'])
export const EMPLOYEE_TAX_STATUS_OPTIONS = genOptions(['PERMANENT', 'NON_PERMANENT'])
