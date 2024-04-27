import emmbedToOption from '@/utils/emmbed-to-option'

export function vacancyToFormEdit(vacancy: IVacancy, withApprovals?: boolean) {
  return {
    vacancyInformation: {
      vacancyName: vacancy.vacancyName || '',
      rrNumber: vacancy.rrNumber || '',
      departmentId: emmbedToOption(vacancy.department),
      branchId: emmbedToOption(vacancy.branch),
      jobLevelId: emmbedToOption(vacancy.jobLevel),
      jobTypeId: emmbedToOption(vacancy.jobType),
      workplacementTypeId: emmbedToOption(vacancy.workplacementType),
      cityId: emmbedToOption(vacancy.city),
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      minimumSalary: vacancy.minimumSalary,
      maximumSalary: vacancy.maximumSalary,
      expiredDate: vacancy.expiredDate ? new Date(vacancy.expiredDate) : undefined,
      hideRangeSalary: !!vacancy.hideRangeSalary,
      negotiableSalary: !!vacancy.negotiableSalary,
      other: vacancy.other || '',
      ...(withApprovals ? { approvals: vacancy.approvals?.users?.map((el) => el.oid) || [] } : {}),
    },

    process: {
      recruitmentProcess: vacancy.recruitmentProcess?.map((el) => el.oid) || [],
    },

    requirements: {
      genderRequirement: vacancy.genderRequirement?.type || '',
      isRequiredGenderRequirement: !!vacancy.genderRequirement?.mustMeetCriteria,
      minimumAgeRequirement: vacancy.ageRequirement?.minimumAgeRequirement || 0,
      maximumAgeRequirement: vacancy.ageRequirement?.maximumAgeRequirement || 0,
      isRequiredAge: !!vacancy.ageRequirement?.mustMeetCriteria,
      minimalEducationRequirementId: emmbedToOption(vacancy.minimalEducationRequirement),
      isRequiredMinimalEducationRequirement: !!vacancy.minimalEducationRequirement?.mustMeetCriteria,
      minimumExperienceRequirement: vacancy.minimumExperienceRequirement?.minimumExperience || 0,
      isRequiredMinimumExperienceRequirement: !!vacancy.minimumExperienceRequirement?.mustMeetCriteria,
      gpaRequirement: vacancy.gpaRequirement?.minimumGpa || 0,
      isRequiredGpaRequirement: !!vacancy.gpaRequirement?.mustMeetCriteria,
      cityRequirementId: emmbedToOption(vacancy.cityRequirement),
      isRequiredCityRequirement: !!vacancy.cityRequirement?.mustMeetCriteria,
      provinceRequirementId: emmbedToOption(vacancy.provinceRequirement),
      isRequiredProvinceRequirement: !!vacancy.provinceRequirement?.mustMeetCriteria,
      maximumSalaryRequirement: vacancy.maximumSalaryRequirement?.maximumSalary,
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
      flag: vacancy.flag,
    },
  }
}
