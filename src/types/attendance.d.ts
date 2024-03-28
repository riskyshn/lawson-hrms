interface ITimezone {
  id?: string
  title?: string
  createdAt?: string
  updatedAt?: string
  oid?: string
}

interface ISchedule {
  id?: string
  name?: string
  createdAt?: string
  updatedAt?: string
  timezone?: ITimezone
  details?: Array<{
    day?: number
    start?: string
    end?: string
    isActive?: boolean
  }>
}

interface IAttendance {
  employeeId?: string
  records?: {
    oid?: string
    attendanceType?: string
    earlyClockoutMinutes?: number
    lateMinutes?: number
    workHours?: number
    inOffice?: boolean
    lat?: number
    lng?: number
    photo?: string
    status?: string
    timezoneTime?: string
    employee?: {
      name?: string
      employeeCode?: string
      employment?: {
        schedule?: {
          name?: string
          timezone?: {
            title?: string
            code?: string
          }
        }
        branch?: {
          name?: string
        }
        position?: string | null
      }
    }
  }[]
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
        name?: string
        timezone?: {
          title?: string
          code?: string
        }
      }
      branch?: {
        name?: string
      }
      position?: {
        department?: {
          name?: string
        }
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
