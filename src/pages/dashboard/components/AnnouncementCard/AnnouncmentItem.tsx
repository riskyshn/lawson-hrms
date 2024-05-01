import { dashboardService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, useConfirm, useToast } from 'jobseeker-ui'
import { PinIcon, Trash2Icon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'

const AnnouncementItem: React.FC<{
  item: IDashboardAnnouncement
  onClick?: (item: IDashboardAnnouncement) => void
  onRefresh?: () => void
}> = ({ item, onClick, onRefresh }) => {
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const confirm = useConfirm()

  const handlePin = async () => {
    setLoading(true)
    try {
      await dashboardService.pinToggleAnnouncement(item.oid)
      onRefresh?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    const confirmed = await confirm('Are you sure want to delete this Announcement?')
    if (!confirmed) return

    setLoading(true)
    try {
      await dashboardService.deleteAnnouncement(item.oid)
      onRefresh?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return (
    <li className="mb-3 flex overflow-hidden rounded-lg last:mb-0">
      <button
        className="flex flex-1 flex-col gap-2 bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
        onClick={() => onClick?.(item)}
        type="button"
      >
        <h4 className="text-sm">{item.title}</h4>
        <span className="block text-xs text-gray-500">{moment.utc(item.createdAt).local().fromNow()}</span>
      </button>
      <div className="flex flex-col">
        <Button
          className="h-1/2 min-h-8 rounded-none"
          color={item.isPinned ? 'primary' : 'default'}
          disabled={loading}
          iconOnly
          onClick={handlePin}
          size="small"
          type="button"
          variant={item.isPinned ? 'default' : 'light'}
        >
          <PinIcon size={14} />
        </Button>
        <Button className="h-1/2 min-h-8 rounded-none" color="error" disabled={loading} iconOnly onClick={handleDelete} size="small">
          <Trash2Icon size={14} />
        </Button>
      </div>
    </li>
  )
}

export default AnnouncementItem
