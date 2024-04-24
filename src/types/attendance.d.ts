interface ITimezone {
  oid: string
  title: string
  createdAt?: string
  updatedAt?: string
}

interface ISchedule {
  oid: string
  name: string
  createdAt?: string
  updatedAt?: string
  timezone?: ITimezone
  details?: ScheduleDetail[]
  count: string
}

interface ScheduleDetail {
  day?: number
  start?: string
  end?: string
  isActive?: boolean
}

interface IAttendance {
  employeeId?: string
  records?: AttendanceRecord[]
}

interface AttendanceRecord {
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
  rejectedReason?: string
  timezoneTime?: string
  employee?: EmployeeInfo
}

interface EmployeeInfo {
  name?: string
  employeeCode?: string
  employment?: EmploymentInfo
}

interface EmploymentInfo {
  schedule?: ScheduleInfo
  branch?: BranchInfo
  department?: {
    oid: string
    name?: string
  }
  position?: string | null
}

interface ScheduleInfo {
  name?: string
  timezone?: ITimezone
}

interface BranchInfo {
  name?: string
  coordinate?: ICoordinate
}

interface PositionInfo {
  name?: string
}

interface ILeave {
  leaveType?: LeaveType
  employee?: EmployeeInfo
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

interface LeaveType {
  oid?: string
  title?: string
  isBalance?: boolean
  isRequiredAttachment?: boolean
  isSalaryDeduction?: boolean
}

interface IEmployeeHistoryAttendance {
  date?: string
  records?: AttendanceRecord[]
}

interface IEmployeeLeave {
  oid: string
  createdAt?: string
  updatedAt?: string
  leaveType?: LeaveType
  employee?: EmployeeInfo
  startDate?: string
  endDate?: string
  attachment?: string
  note?: string
  status?: string
  duration?: number
  rejectedReason?: string
}

interface ICoordinate {
  type?: string
  coordinates?: [number, number]
}

interface IFilterDate {
  startDate?: string
  endDate?: string
}

interface IStatistic {
  title?: string
  count?: number
}
