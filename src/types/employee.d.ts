interface IEmployee {
  oid: string
  employeeId: string
  name?: string
  branch?: {
    oid: string
    name?: string | null
  }
  department?: {
    oid: string
    name?: string | null
  }
  position?: {
    oid: string
    name?: string | null
  }
  jobType?: {
    oid: string
    name?: string | null
  }
  jobLevel?: {
    oid: string
    name?: string | null
  }
  picApproval?: {
    oid: string
    name?: string | null
    email?: string | null
  }
}
