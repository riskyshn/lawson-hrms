interface ITimezone {
  oid: string
  title: string
  code: string
}
interface ISchedule {
  oid: string
  name: string
  createdAt?: string
  updatedAt?: string
  timezone?: ITimezone
  details?: IScheduleDetail[]
  count: string
}

interface IScheduleDetail {
  day?: number
  start?: string
  end?: string
  isActive?: boolean
}

interface IAttendance {
  employeeId?: string
  records?: IAttendanceRecord[]
}

interface IAttendanceRecord {
  oid?: string
  attendanceType?: string
  earlyClockoutMinutes?: number
  lateMinutes?: number
  workHours?: number
  isInOffice?: boolean
  coordinate?: ICoordinate
  photo?: string
  status?: string
  rejectedReason?: string
  timezoneTime?: string
  employee?: {
    name?: string
    employeeCode?: string
    employment?: {
      schedule?: {
        oid?: string
        name?: string
        timezone?: {
          oid: string
          title: string
          code: string
        }
      }
      branch?: {
        oid?: string
        name?: string
        coordinate?: {
          type?: string
          coordinates?: [number, number]
        }
        range?: number
      }
      department?: {
        oid: string
        name: string
      }
      position?: {
        oid: string
        name: string
      }
    }
  }
}

interface ILeave {
  leaveType?: {
    oid?: string
    title?: string
    isBalance?: boolean
    isRequiredAttachment?: boolean
    isSalaryDeduction?: boolean
  }
  employee?: {
    name?: string
    employeeCode?: string
    employment?: {
      schedule?: {
        oid?: string
        name?: string
        timezone?: {
          oid: string
          title: string
          code: string
        }
      }
      branch?: {
        oid?: string
        name?: string
        coordinate?: {
          type?: string
          coordinates?: [number, number]
        }
        range?: number
      }
      department?: {
        oid: string
        name: string
      }
      position?: {
        oid: string
        name: string
      }
    }
  }
  startDate?: string
  endDate?: string
  attachment?: string
  note?: string
  status?: string
  duration?: number
  createdAt?: string
  oid?: string
  updatedAt?: string
}

interface IEmployeeHistory {
  date?: string
  records?: {
    oid?: string
    attendanceType?: string
    earlyClockoutMinutes?: number
    lateMinutes?: number
    workHours?: number
    isInOffice?: boolean
    coordinate?: {
      type?: string
      coordinates?: [number, number]
    }
    photo?: string
    status?: string
    rejectedReason?: string
    timezoneTime?: string
    employee?: {
      name?: string
      employeeCode?: string
      employment?: {
        schedule?: {
          oid?: string
          name?: string
          timezone?: {
            oid: string
            title: string
            code: string
          }
        }
        branch?: {
          oid?: string
          name?: string
          coordinate?: {
            type?: string
            coordinates?: [number, number]
          }
          range?: number
        }
        department?: {
          oid: string
          name: string
        }
        position?: {
          oid: string
          name: string
        }
      }
    }
  }[]
}

interface IEmployeeLeave {
  oid: string
  createdAt?: string
  updatedAt?: string
  leaveType?: {
    oid?: string
    title?: string
    isBalance?: boolean
    isRequiredAttachment?: boolean
    isSalaryDeduction?: boolean
  }
  employee?: {
    name?: string
    employeeCode?: string
    employment?: {
      schedule?: {
        oid?: string
        name?: string
        timezone?: {
          oid: string
          title: string
          code: string
        }
      }
      branch?: {
        oid?: string
        name?: string
        coordinate?: {
          type?: string
          coordinates?: [number, number]
        }
        range?: number
      }
      department?: {
        oid: string
        name: string
      }
      position?: {
        oid: string
        name: string
      }
    }
  }
  startDate?: string
  endDate?: string
  attachment?: string
  note?: string
  status?: string
  duration?: number
  rejectedReason?: string
}

interface IFilterDate {
  startDate?: string
  endDate?: string
}

interface IStatistic {
  title?: string
  count?: number
}

interface IBranch {
  oid: string
  name: string
  coordinate: {
    type?: string
    coordinates?: [number, number]
  }
  range: number
}

interface IEmployeeHistoryAttendance {
  oid: string
  date: string
  employee: {
    name?: string
    employeeCode?: string
    employment?: {
      schedule?: {
        oid?: string
        name?: string
        timezone?: {
          oid: string
          title: string
          code: string
        }
      }
      branch?: {
        oid?: string
        name?: string
        coordinate?: {
          type?: string
          coordinates?: [number, number]
        }
        range?: number
      }
      department?: {
        oid: string
        name: string
      }
      position?: {
        oid: string
        name: string
      }
    }
  }
  attendanceData: {
    oid: string
    attendanceType: string
    earlyClockoutMinutes: number
    lateMinutes: number
    workHours: number
    isInOffice: boolean
    photo: string
    status: string
    rejectedReason: string | null
    timezoneTime: string
    coordinate: {
      type?: string
      coordinates?: [number, number]
    }
  }[]
  leaveData: {
    oid: string
    leaveType: {
      oid?: string
      title?: string
      isBalance?: boolean
      isRequiredAttachment?: boolean
      isSalaryDeduction?: boolean
    }
    startDate: string
    endDate: string
    attachment: string
    note: string
    status: string
    duration: number
    rejectedReason: string | null
  }
  logType: string
}
