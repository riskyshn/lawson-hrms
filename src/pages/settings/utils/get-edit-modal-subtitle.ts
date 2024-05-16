import moment from 'moment'

export default function getEditModalSubtitle(item?: { createdAt?: string; updatedAt?: string } | null) {
  const { createdAt, updatedAt } = item || {}
  if (!createdAt && !updatedAt) return ''
  const timestamp = updatedAt ? updatedAt : createdAt
  const action = updatedAt ? 'Last updated' : 'Created'
  return `${action} ${moment(timestamp).fromNow()}`
}
