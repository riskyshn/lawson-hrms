export function vacancyToFormEdit(vacancy: IVacancy, withApprovals?: boolean) {
  return {
    vacancyInformation: {
      vacancyName: vacancy.vacancyName || '',
      rrNumber: vacancy.rrNumber || '',
      departmentId: vacancy.department?.oid || '',
      branchId: vacancy.branch?.oid || '',
      jobLevelId: vacancy.jobLevel?.oid || '',
      jobTypeId: vacancy.jobType?.oid || '',
      workplacementTypeId: vacancy.workplacementType?.oid || '',
      cityId: vacancy.city?.oid || '',
      numberOfEmployeeNeeded: vacancy.numberOfEmployeeNeeded || 0,
      minimumSalary: vacancy.minimumSalary,
      maximumSalary: vacancy.maximumSalary,
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
      minimalEducationRequirementId: vacancy.minimalEducationRequirement?.oid || '',
      isRequiredMinimalEducationRequirement: !!vacancy.minimalEducationRequirement?.mustMeetCriteria,
      minimumExperienceRequirement: vacancy.minimumExperienceRequirement?.minimumExperience || 0,
      isRequiredMinimumExperienceRequirement: !!vacancy.minimumExperienceRequirement?.mustMeetCriteria,
      gpaRequirement: vacancy.gpaRequirement?.minimumGpa || 0,
      isRequiredGpaRequirement: !!vacancy.gpaRequirement?.mustMeetCriteria,
      cityRequirementId: vacancy.cityRequirement?.oid || '',
      isRequiredCityRequirement: !!vacancy.cityRequirement?.mustMeetCriteria,
      provinceRequirementId: vacancy.provinceRequirement?.oid || '',
      isRequiredProvinceRequirement: !!vacancy.provinceRequirement?.mustMeetCriteria,
      maximumSalaryRequirement: vacancy.maximumSalaryRequirement?.maximumSalary,
      isRequiredMaximumSalaryRequirement: !!vacancy.maximumSalaryRequirement?.mustMeetCriteria,
    },
  }
}
