import { useEffect, useState } from 'react'
import { BaseInput, Button, useToast } from 'jobseeker-ui'
import { MinusCircleIcon } from 'lucide-react'
import { organizationService } from '@/services'

const RecruitmentStageItem: React.FC<{
  isNew?: boolean
  item?: IRecruitmentStage
  onRefresh?: () => void
  onRemove?: () => void
  type?: IRecruitmentStage['type']
}> = ({ isNew, item, onRefresh, onRemove, type }) => {
  const toast = useToast()

  const [value, setValue] = useState(item?.name || '')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    console.log(item)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(item)])

  const handleCreate = async () => {
    if (value.trim().length === 0) return
    setLoading(true)
    try {
      await organizationService.createRecruitmentStage({ name: value.trim(), type })
      toast('Recruitment Stage created successfully', { color: 'success' })
      onRefresh?.()
      onRemove?.()
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error' })
    }
    setLoading(false)
  }

  const handleUpdate = async () => {
    if (value.trim().length === 0 || !item) return
    setLoading(true)
    try {
      await organizationService.updateRecruitmentStage(item.oid, { name: value.trim(), type: item.type })
      toast('Recruitment Stage updated successfully', { color: 'success' })
      onRefresh?.()
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error' })
    }
    setLoading(false)
  }

  const handleRemove = async () => {
    if (isNew) {
      return onRemove?.()
    }
    if (!item) return

    setDeleteLoading(true)
    await organizationService.deleteRecruitmentStage(item.oid)
    onRefresh?.()
  }

  return (
    <div className="flex gap-1">
      <BaseInput onChange={(e) => setValue(e.currentTarget.value)} placeholder="Stage name" value={value} />
      {isNew && value.trim().length !== 0 && (
        <Button color="primary" disabled={loading} loading={loading} onClick={handleCreate} type="button">
          Save
        </Button>
      )}
      {!isNew && value.trim().length !== 0 && value !== item?.name && (
        <Button color="primary" disabled={loading} loading={loading} onClick={handleUpdate} type="button">
          Save
        </Button>
      )}
      <Button color="error" disabled={deleteLoading} iconOnly loading={deleteLoading} onClick={handleRemove} type="button">
        <MinusCircleIcon size={16} />
      </Button>
    </div>
  )
}

export default RecruitmentStageItem
