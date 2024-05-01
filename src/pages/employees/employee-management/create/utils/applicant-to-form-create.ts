import emmbedToOption from '@/utils/emmbed-to-option'

export function applicantToFormCreate(applicant: ICandidateToCreateEmployee) {
  return {
    components: {},
    employment: {
      branch: emmbedToOption(),
      department: emmbedToOption(),
      employeeCode: '',
      jobLevel: emmbedToOption(),
      jobType: emmbedToOption(),
      position: emmbedToOption(),
      role: emmbedToOption(),
      schedule: emmbedToOption(),
    },
    payroll: {},
    personalData: {
      birthDate: applicant.birthdate ? new Date(applicant.birthdate) : undefined,
      cityOfBirth: emmbedToOption(),
      email: applicant.email || '',
      gender: emmbedToOption(applicant.gender),
      linkNationalId: '',
      maritalStatus: emmbedToOption(applicant.maritalStatus),
      name: applicant.name || '',
      nationIdAddress: '',
      nationalIdNumber: applicant.nik,
      numberOfChildren: 0,
      phoneNumber: applicant.phone || '',
      postalCode: '',
      religion: emmbedToOption(applicant.religion),
      residentalAddress: '',
    },
  }
}
