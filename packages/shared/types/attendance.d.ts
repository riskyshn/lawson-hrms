interface ITimezone {
  code: string
  oid: string
  title: string
}

interface ISchedule {
  count: string
  createdAt?: string
  details?: IScheduleDetail[]
  name: string
  oid: string
  timezone?: ITimezone
  updatedAt?: string
}

interface IScheduleDetail {
  day?: number
  end?: string
  isActive?: boolean
  start?: string
}

interface IAttendance {
  employeeId?: string
  records?: IAttendanceRecord[]
}

interface IAttendanceRecord {
  attendanceType?: string
  coordinate?: ICoordinate
  earlyClockoutMinutes?: number
  employee?: {
    employeeCode?: string
    employment?: {
      branch?: {
        coordinate?: {
          coordinates?: [number, number]
          type?: string
        }
        name?: string
        oid?: string
        range?: number
      }
      department?: {
        name: string
        oid: string
      }
      position?: {
        name: string
        oid: string
      }
      schedule?: {
        name?: string
        oid?: string
        timezone?: {
          code: string
          oid: string
          title: string
        }
      }
    }
    name?: string
  }
  isInOffice?: boolean
  lateMinutes?: number
  oid?: string
  photo?: string
  rejectedReason?: string
  status?: string
  timezoneTime?: string
  workHours?: number
}

interface ILeave {
  attachment?: string
  createdAt?: string
  duration?: number
  employee?: {
    employeeCode?: string
    employment?: {
      branch?: {
        coordinate?: {
          coordinates?: [number, number]
          type?: string
        }
        name?: string
        oid?: string
        range?: number
      }
      department?: {
        name: string
        oid: string
      }
      position?: {
        name: string
        oid: string
      }
      schedule?: {
        name?: string
        oid?: string
        timezone?: {
          code: string
          oid: string
          title: string
        }
      }
    }
    name?: string
  }
  endDate?: string
  leaveType?: {
    isBalance?: boolean
    isRequiredAttachment?: boolean
    isSalaryDeduction?: boolean
    oid?: string
    title?: string
  }
  note?: string
  oid?: string
  startDate?: string
  status?: string
  updatedAt?: string
}

interface IEmployeeHistory {
  date?: string
  records?: {
    attendanceType?: string
    coordinate?: {
      coordinates?: [number, number]
      type?: string
    }
    earlyClockoutMinutes?: number
    employee?: {
      employeeCode?: string
      employment?: {
        branch?: {
          coordinate?: {
            coordinates?: [number, number]
            type?: string
          }
          name?: string
          oid?: string
          range?: number
        }
        department?: {
          name: string
          oid: string
        }
        position?: {
          name: string
          oid: string
        }
        schedule?: {
          name?: string
          oid?: string
          timezone?: {
            code: string
            oid: string
            title: string
          }
        }
      }
      name?: string
    }
    isInOffice?: boolean
    lateMinutes?: number
    oid?: string
    photo?: string
    rejectedReason?: string
    status?: string
    timezoneTime?: string
    workHours?: number
  }[]
}

interface IEmployeeLeave {
  attachment?: string
  createdAt?: string
  duration?: number
  employee?: {
    employeeCode?: string
    employment?: {
      branch?: {
        coordinate?: {
          coordinates?: [number, number]
          type?: string
        }
        name?: string
        oid?: string
        range?: number
      }
      department?: {
        name: string
        oid: string
      }
      position?: {
        name: string
        oid: string
      }
      schedule?: {
        name?: string
        oid?: string
        timezone?: {
          code: string
          oid: string
          title: string
        }
      }
    }
    name?: string
  }
  endDate?: string
  leaveType?: {
    isBalance?: boolean
    isRequiredAttachment?: boolean
    isSalaryDeduction?: boolean
    oid?: string
    title?: string
  }
  note?: string
  oid: string
  rejectedReason?: string
  startDate?: string
  status?: string
  updatedAt?: string
}

interface IFilterDate {
  endDate?: string
  startDate?: string
}

interface IStatistic {
  count?: number
  title?: string
}

interface IBranch {
  coordinate: {
    coordinates?: [number, number]
    type?: string
  }
  name: string
  oid: string
  range: number
}

interface IEmployeeHistoryAttendance {
  attendanceData: {
    attendanceType: string
    coordinate: {
      coordinates?: [number, number]
      type?: string
    }
    earlyClockoutMinutes: number
    isInOffice: boolean
    lateMinutes: number
    oid: string
    photo: string
    rejectedReason: null | string
    status: string
    timezoneTime: string
    workHours: number
  }[]
  date: string
  employee: {
    employeeCode?: string
    employment?: {
      branch?: {
        coordinate?: {
          coordinates?: [number, number]
          type?: string
        }
        name?: string
        oid?: string
        range?: number
      }
      department?: {
        name: string
        oid: string
      }
      position?: {
        name: string
        oid: string
      }
      schedule?: {
        name?: string
        oid?: string
        timezone?: {
          code: string
          oid: string
          title: string
        }
      }
    }
    name?: string
  }
  leaveData: {
    attachment: string
    createdAt: string
    duration: number
    endDate: string
    leaveType: {
      isBalance?: boolean
      isRequiredAttachment?: boolean
      isSalaryDeduction?: boolean
      oid?: string
      title?: string
    }
    note: string
    oid: string
    rejectedReason: null | string
    startDate: string
    status: string
  }
  logType: string
  oid: string
  status: string
}
