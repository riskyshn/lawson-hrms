import { IVacancy } from '@/types/vacancy'

export function numberToCurrency(number?: number) {
  const { format } = new Intl.NumberFormat()
  if (typeof number == 'number') {
    return `Rp ${format(number)}`
  }
  return ''
}

export function convertVacancyToFormValues(vacancy: IVacancy) {
  return {
    vacancyInformation: {
      vacancyName: vacancy.vacancyName || '',
      departmentId: vacancy.department?.id || '',
      branchId: '', // No Response Data
      jobLevelId: vacancy.jobLevel?.id || '',
      jobTypeId: vacancy.jobType?.id || '',
      workplacementTypeId: vacancy.workplacementType || '',
      cityId: vacancy.city?.id || '',
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      minimumSalary: numberToCurrency(vacancy.minimumSalary),
      maximumSalary: numberToCurrency(vacancy.maximumSalary),
      hideRangeSalary: !!vacancy.hideRangeSalary,
      negotiableSalary: !!vacancy.negotiableSalary,
      other: vacancy.other || '',
    },

    process: {},

    requirements: {
      genderRequirement: vacancy.genderRequirement?.type || '',
      isRequiredGenderRequirement: !!vacancy.genderRequirement?.mustMeetCriteria,
      minimumAgeRequirement: vacancy.ageRequirement?.minimumAgeRequirement || 0,
      maximumAgeRequirement: vacancy.ageRequirement?.maximumAgeRequirement || 0,
      isRequiredAge: !!vacancy.ageRequirement?.mustMeetCriteria,
      minimalEducationRequirementId: vacancy.minimalEducationRequirement?.minimalEducation?.id || '',
      isRequiredMinimalEducationRequirement: !!vacancy.minimalEducationRequirement?.mustMeetCriteria,
      minimumExperienceRequirement: vacancy.minimumExperienceRequirement?.minimumExperience || 0,
      isRequiredMinimumExperienceRequirement: !!vacancy.minimumExperienceRequirement?.mustMeetCriteria,
      gpaRequirement: vacancy.gpaRequirement?.minimumGpa || 0,
      isRequiredGpaRequirement: !!vacancy.gpaRequirement?.mustMeetCriteria,
      cityRequirementId: vacancy.cityRequirement?.id || '',
      isRequiredCityRequirement: false, // No Response Data
      provinceRequirementId: vacancy.provinceRequirement?.id || '',
      isRequiredProvinceRequirement: false, // No Response Data
      maximumSalaryRequirement: numberToCurrency(vacancy.maximumSalaryRequirement?.maximumSalary),
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
    },
  }
}
