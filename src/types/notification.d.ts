interface INotification {
  company: ICompany
  candidate: ICandidate
  vacancy: IVacancy
  activity: IActivity
  message: string
  flag: string
  oid: string
}

interface IActivity {
  applyProcess: string
  status: string
  type: string
  from: string
  actionAt: string
  notes: string
  file: null
  createdAt: string
  updatedAt: string
  oid: string
}
