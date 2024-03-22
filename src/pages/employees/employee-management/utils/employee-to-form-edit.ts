import numberToCurrency from '@/utils/number-to-currency'

// interface IEmployee {
//   oid: string
//   employeeId: string
//   name?: string
//   branch?: {
//     oid: string
//     name?: string | null
//   }
//   department?: {
//     oid: string
//     name?: string | null
//   }
//   position?: {
//     oid: string
//     name?: string | null
//   }
//   jobType?: {
//     oid: string
//     name?: string | null
//   }
//   jobLevel?: {
//     oid: string
//     name?: string | null
//   }
//   picApproval?: {
//     oid: string
//     name?: string | null
//     email?: string | null
//   }
// }

export function employeeToFormEdit(employee: IEmployee) {
  return {
    personalData: {
      name: employee.name || '',
      residentalAddress: 'asdsdasadasdsaddsas',
      nationIdAddress: 'asdsdsad',
      postalCode: 'adasdasd',
      nationalIdNumber: 'jasdklsajdlas',
      linkNationalId: 'https://i.ibb.co/MgCTT2k/Screenshot-from-2024-03-07-09-24-26.png',
      numberOfChildren: 4,
      maritalStatus: 'Single',
      birthDate: new Date('2024-03-04'),
      cityOfBirth: 'Makassar, Sulawesi Selatan',
      phoneNumber: '6281343912883',
      religionId: '65efe27862bcce96a57001aa',
      genderId: '65efe27862bcce96a57001aa',
      email: 'hafizha.krmmz@gmail.com',
    },
    employment: {
      employeeId: 'rererere',
      roleId: '65f7ffd31833735c0343c340',
      jobTypeId: '65ef54d227706934a820c33b',
      branchId: '65f54c4d2e49fa688b3d0f54',
      departmentId: '65f5a22adaeae841de29b9a4',
      positionId: '65f69d8e2c60e10d6564d640',
      jobLevelId: '65eb10ac05711e48de3f8be1',
      picApprovalId: '65effbb62b046273e0abd77e',
      scheduleId: '65f3a301f1ea469fad5364a4',
    },
    payroll: {
      jkk: 0.54,
      isParticipateBpjs: true,
      ptkpStatus: 'TK/0',
      npwpNumber: 'ggjgjhfjgyutyt76t67576r',
      employmentTaxStatus: 2,
      accountHolderName: 'sdfsdfsds',
      accountNumber: 'sdfsdfs',
      bankName: 'sdfsdfs',
      isAllowOvertime: 0,
      baseSalaryType: 1,
      baseSalary: numberToCurrency(1729381232),
      taxMethod: 'Gross Up',
    },
    components: {
      benefits: [
        {
          amount: 232323,
          applicationType: 1,
          componentId: 'communication_allowance',
        },
      ].map((el) => ({ ...el, amount: numberToCurrency(el.amount) })),
      deductions: [
        {
          amount: 234234234,
          applicationType: 2,
          componentId: 'travel_allowance',
        },
        {
          amount: 23423423,
          applicationType: 2,
          componentId: 'food_allowance',
        },
      ].map((el) => ({ ...el, amount: numberToCurrency(el.amount) })),
    },
  }
}
