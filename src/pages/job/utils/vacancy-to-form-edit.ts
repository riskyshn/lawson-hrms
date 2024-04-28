import emmbedToOption from '@/utils/emmbed-to-option'

export function vacancyToFormEdit(vacancy: IVacancy, isRequisition?: boolean) {
  return {
    vacancyInformation: {
      vacancyName: vacancy.vacancyName || '',
      rrNumber: isRequisition ? vacancy.rrNumber : undefined,
      department: emmbedToOption(vacancy.department),
      branch: emmbedToOption(vacancy.branch),
      jobLevel: emmbedToOption(vacancy.jobLevel),
      jobType: emmbedToOption(vacancy.jobType),
      workplacementType: emmbedToOption(vacancy.workplacementType),
      city: emmbedToOption(vacancy.city),
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      minimumSalary: vacancy.minimumSalary,
      maximumSalary: vacancy.maximumSalary,
      expiredDate: vacancy.expiredDate ? new Date(vacancy.expiredDate) : undefined,
      hideRangeSalary: !!vacancy.hideRangeSalary,
      negotiableSalary: !!vacancy.negotiableSalary,
      other: vacancy.other || '',
      ...(isRequisition ? { approvals: vacancy.approvals?.users?.map((el) => ({ label: el.name, value: el.oid })) || [] } : {}),
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
      minimalEducationRequirement: emmbedToOption(vacancy.minimalEducationRequirement),
      isRequiredMinimalEducationRequirement: !!vacancy.minimalEducationRequirement?.mustMeetCriteria,
      minimumExperienceRequirement: vacancy.minimumExperienceRequirement?.minimumExperience || 0,
      isRequiredMinimumExperienceRequirement: !!vacancy.minimumExperienceRequirement?.mustMeetCriteria,
      gpaRequirement: vacancy.gpaRequirement?.minimumGpa || 0,
      isRequiredGpaRequirement: !!vacancy.gpaRequirement?.mustMeetCriteria,
      cityRequirement: emmbedToOption(vacancy.cityRequirement),
      isRequiredCityRequirement: !!vacancy.cityRequirement?.mustMeetCriteria,
      provinceRequirement: emmbedToOption(vacancy.provinceRequirement),
      isRequiredProvinceRequirement: !!vacancy.provinceRequirement?.mustMeetCriteria,
      maximumSalaryRequirement: vacancy.maximumSalaryRequirement?.maximumSalary,
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
      flag: vacancy.flag,
    },
  }
}
