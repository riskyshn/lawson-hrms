interface INotification {
  vacancy: string
  candidate: {
    name: string
    photoProfile: string
  }
  message: string
  type: string
  module: string
  oid: string
  companyId: string
  isRead: boolean
  createdAt: string
}
