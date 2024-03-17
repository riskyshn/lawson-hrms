import numberToCurrency from '@/utils/number-to-currency'

export function vacancyToFormEdit(vacancy: IVacancy, withApprovals?: boolean) {
  return {
    vacancyInformation: {
      vacancyName: vacancy.vacancyName || '',
      departmentId: vacancy.department?.id || '',
      branchId: vacancy.branch?.id || '',
      expiredDate: vacancy.expiredDate ? new Date(vacancy.expiredDate) : '',
      jobLevelId: vacancy.jobLevel?.id || '',
      jobTypeId: vacancy.jobType?.id || '',
      workplacementTypeId: vacancy.workplacementType?.id || '',
      cityId: vacancy.city?.id || '',
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      minimumSalary: numberToCurrency(vacancy.minimumSalary),
      maximumSalary: numberToCurrency(vacancy.maximumSalary),
      hideRangeSalary: !!vacancy.hideRangeSalary,
      negotiableSalary: !!vacancy.negotiableSalary,
      other: vacancy.other || '',
      ...(withApprovals ? { approvals: vacancy.approvals?.users?.map((el) => el.id) || [] } : {}),
    },

    process: {
      recruitmentProcess: vacancy.recruitmentProcess?.map((el) => el.id) || [],
    },

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
      isRequiredCityRequirement: !!vacancy.cityRequirement?.mustMeetCriteria,
      provinceRequirementId: vacancy.provinceRequirement?.id || '',
      isRequiredProvinceRequirement: !!vacancy.provinceRequirement?.mustMeetCriteria,
      maximumSalaryRequirement: numberToCurrency(vacancy.maximumSalaryRequirement?.maximumSalary),
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
    },
  }
}
