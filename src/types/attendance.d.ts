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
  inOffice?: boolean
  coordinate?: ICoordinate
  photo?: string
  status?: string
  rejectedReason?: string
  timezoneTime?: string
  employee?: IEmployeeInfo
}

interface IEmployeeInfo {
  name?: string
  employeeCode?: string
  employment?: EmploymentInfo
}

interface EmploymentInfo {
  schedule?: IScheduleInfo
  branch?: IBranchInfo
  department?: IDepartment
  position?: IPosition
}

interface IScheduleInfo {
  oid?: string
  name?: string
  timezone?: ITimezone
}

interface IBranchInfo {
  oid?: string
  name?: string
  coordinate?: ICoordinate
  range?: number
}

interface ILeave {
  leaveType?: ILeaveType
  employee?: IEmployeeInfo
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

interface ILeaveType {
  oid?: string
  title?: string
  isBalance?: boolean
  isRequiredAttachment?: boolean
  isSalaryDeduction?: boolean
}

interface IEmployeeHistory {
  date?: string
  records?: IAttendanceRecord[]
}

interface IEmployeeLeave {
  oid: string
  createdAt?: string
  updatedAt?: string
  leaveType?: ILeaveType
  employee?: IEmployeeInfo
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

interface IBranch {
  oid: string
  name: string
  coordinate: ICoordinate
  range: number
}

interface IPosition {
  oid: string
  name: string
}

interface IDepartment {
  oid: string
  name: string
}

interface IEmployeeHistoryAttendance {
  oid: string
  date: string
  employee: IEmployeeInfo
  attendanceData: IAttendanceData[]
  leaveData: ILeaveData
  logType: string
}

interface IAttendanceData {
  oid: string
  attendanceType: string
  earlyClockoutMinutes: number
  lateMinutes: number
  workHours: number
  inOffice: boolean
  photo: string
  status: string
  rejectedReason: string | null
  timezoneTime: string
  coordinate: ICoordinate
}

interface ILeaveData {
  oid: string
  leaveType: ILeaveType
  startDate: string
  endDate: string
  attachment: string
  note: string
  status: string
  duration: number
  rejectedReason: string | null
}
