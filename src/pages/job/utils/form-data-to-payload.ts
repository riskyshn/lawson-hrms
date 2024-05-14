import { currencyToNumber } from '@jshrms/shared/utils'
import moment from 'moment'

export default function formDataToPayload(data: Record<string, Record<string, any>>, isRequisition?: boolean) {
  const obj: Record<string, any> = {}
  Object.values(data).forEach((item) => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        obj[key] = item[key]
      }
    }
  })

  const payload: Record<string, any> = {
    ...obj,
    expiredDate: !isRequisition ? moment(obj.expiredDate).format('YYYY-MM-DDTHH:mm:ss.SSS') : undefined,
    maximumSalary: currencyToNumber(obj.maximumSalary),
    maximumSalaryRequirement: currencyToNumber(obj.maximumSalaryRequirement),
    minimumSalary: currencyToNumber(obj.minimumSalary),
    rrNumber: isRequisition ? obj.rrNumber : undefined,
    ...(isRequisition ? { approvals: obj.approvals?.map?.((el: any) => el?.value) || [] } : {}),
  }

  payload.jobLevelId = obj.jobLevel?.value
  delete payload.jobLevel

  payload.branchId = obj.branch?.value
  delete payload.branch

  payload.jobTypeId = obj.jobType?.value
  delete payload.jobType

  payload.cityId = obj.city?.value
  delete payload.city

  payload.departmentId = obj.department?.value
  delete payload.department

  payload.workplacementTypeId = obj.workplacementType?.value
  delete payload.workplacementType

  payload.genderRequirementId = obj.genderRequirement?.value
  delete payload.genderRequirement

  payload.minimalEducationRequirementId = obj.minimalEducationRequirement?.value
  delete payload.minimalEducationRequirement

  payload.provinceRequirementId = obj.provinceRequirement?.value
  delete payload.provinceRequirement

  payload.cityRequirementId = obj.cityRequirement?.value
  delete payload.cityRequirement

  return payload
}
