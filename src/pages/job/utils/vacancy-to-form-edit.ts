import type { IVacancy } from '@/types'
import emmbedToOption from '@/utils/emmbed-to-option'

export function vacancyToFormEdit(vacancy: IVacancy, isRequisition?: boolean) {
  return {
    process: {
      recruitmentProcess: vacancy.recruitmentProcess?.map((el) => el.oid) || [],
    },

    requirements: {
      cityRequirement: emmbedToOption(vacancy.cityRequirement),
      flag: vacancy.flag,
      genderRequirement: emmbedToOption(vacancy.genderRequirement),
      gpaRequirement: vacancy.gpaRequirement?.minimumGpa || 0,
      isRequiredAge: !!vacancy.ageRequirement?.mustMeetCriteria,
      isRequiredCityRequirement: !!vacancy.cityRequirement?.mustMeetCriteria,
      isRequiredGenderRequirement: !!vacancy.genderRequirement?.mustMeetCriteria,
      isRequiredGpaRequirement: !!vacancy.gpaRequirement?.mustMeetCriteria,
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
      isRequiredMinimalEducationRequirement: !!vacancy.minimalEducationRequirement?.mustMeetCriteria,
      isRequiredMinimumExperienceRequirement: !!vacancy.minimumExperienceRequirement?.mustMeetCriteria,
      isRequiredProvinceRequirement: !!vacancy.provinceRequirement?.mustMeetCriteria,
      maximumAgeRequirement: vacancy.ageRequirement?.maximumAgeRequirement || 0,
      maximumSalaryRequirement: vacancy.maximumSalaryRequirement?.maximumSalary,
      minimalEducationRequirement: emmbedToOption(vacancy.minimalEducationRequirement),
      minimumAgeRequirement: vacancy.ageRequirement?.minimumAgeRequirement || 0,
      minimumExperienceRequirement: vacancy.minimumExperienceRequirement?.minimumExperience || 0,
      provinceRequirement: emmbedToOption(vacancy.provinceRequirement),
    },

    vacancyInformation: {
      branch: emmbedToOption(vacancy.branch),
      city: emmbedToOption(vacancy.city),
      department: emmbedToOption(vacancy.department),
      expiredDate: vacancy.expiredDate ? new Date(vacancy.expiredDate) : undefined,
      hideRangeSalary: !!vacancy.hideRangeSalary,
      jobLevel: emmbedToOption(vacancy.jobLevel),
      jobType: emmbedToOption(vacancy.jobType),
      maximumSalary: vacancy.maximumSalary,
      minimumSalary: vacancy.minimumSalary,
      negotiableSalary: !!vacancy.negotiableSalary,
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      other: vacancy.other || '',
      rrNumber: isRequisition ? vacancy.rrNumber : undefined,
      vacancyName: vacancy.vacancyName || '',
      workplacementType: emmbedToOption(vacancy.workplacementType),
      ...(isRequisition ? { approvals: vacancy.approvals?.users?.map((el) => ({ label: el.name, value: el.oid })) || [] } : {}),
    },
  }
}
