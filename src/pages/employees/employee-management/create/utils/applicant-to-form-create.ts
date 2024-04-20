export function applicantToFormCreate(applicant: ICandidateToCreateEmployee) {
  return {
    personalData: {
      name: applicant.name || '',
      email: applicant.email || '',
      residentalAddress: '',
      nationIdAddress: '',
      postalCode: '',
      nationalIdNumber: '',
      linkNationalId: '',
      numberOfChildren: 0,
      maritalStatusId: applicant.maritalStatus?.oid || '',
      birthDate: applicant.birthdate ? new Date(applicant.birthdate) : undefined,
      cityOfBirth: '',
      phoneNumber: applicant.phone || '',
      religionId: applicant?.religion?.oid || '',
      genderId: applicant.gender?.oid || '',
    },
    employment: {
      employeeCode: '',
      roleId: '',
      jobTypeId: '',
      branchId: '',
      departmentId: '',
      positionId: '',
      jobLevelId: '',
      scheduleId: '',
    },
    payroll: {},
    components: {},
  }
}
