import moment from 'moment'

export default function getEditModalSubtitle(item?: { updatedAt?: string; createdAt?: string } | null) {
  const { updatedAt, createdAt } = item || {}
  if (!createdAt && !updatedAt) return ''
  const timestamp = updatedAt ? updatedAt : createdAt
  const action = updatedAt ? 'Last updated' : 'Created'
  return `${action} ${moment.utc(timestamp).local().fromNow()}`
}
