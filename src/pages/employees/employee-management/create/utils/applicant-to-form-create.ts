import emmbedToOption from '@/utils/emmbed-to-option'

export function applicantToFormCreate(applicant: ICandidateToCreateEmployee) {
  return {
    personalData: {
      name: applicant.name || '',
      email: applicant.email || '',
      residentalAddress: '',
      nationIdAddress: '',
      postalCode: '',
      nationalIdNumber: applicant.nik,
      linkNationalId: '',
      numberOfChildren: 0,
      maritalStatus: emmbedToOption(applicant.maritalStatus),
      birthDate: applicant.birthdate ? new Date(applicant.birthdate) : undefined,
      cityOfBirth: emmbedToOption(),
      phoneNumber: applicant.phone || '',
      religion: emmbedToOption(applicant.religion),
      gender: emmbedToOption(applicant.gender),
    },
    employment: {
      employeeCode: '',
      role: emmbedToOption(),
      jobType: emmbedToOption(),
      branch: emmbedToOption(),
      department: emmbedToOption(),
      position: emmbedToOption(),
      jobLevel: emmbedToOption(),
      schedule: emmbedToOption(),
    },
    payroll: {},
    components: {},
  }
}
