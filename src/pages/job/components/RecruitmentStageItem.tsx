import { useOrganizationStore } from '@/store'
import { IRecruitmentStage } from '@/types/oganizartion'
import { BaseInput, Button, useToast } from 'jobseeker-ui'
import { MinusCircleIcon } from 'lucide-react'
import { useState } from 'react'

const RecruitmentStageItem: React.FC<{
  type?: IRecruitmentStage['type']
  item?: IRecruitmentStage
  isNew?: boolean
  onRemove?: () => void
}> = ({ type, item, isNew, onRemove }) => {
  const { createRecruitmentStage, updateRecruitmentStage, deleteRecruitmentStage } = useOrganizationStore()
  const toast = useToast()

  const [value, setValue] = useState(item?.name || '')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleCreate = async () => {
    if (value.trim().length === 0) return
    setLoading(true)
    try {
      await createRecruitmentStage({ type, name: value.trim() })
      toast('Recruitment Stage created successfully', { color: 'success', position: 'top-right' })
      onRemove?.()
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error', position: 'top-right' })
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (value.trim().length === 0 || !item) return
    setLoading(true)
    try {
      await updateRecruitmentStage(item.oid, { type: item.type, name: value.trim() })
      toast('Recruitment Stage updated successfully', { color: 'success', position: 'top-right' })
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error', position: 'top-right' })
    }
    setLoading(false)
  }

  const handleRemove = async () => {
    if (isNew) {
      return onRemove?.()
    }
    if (!item) return

    setDeleteLoading(true)
    await deleteRecruitmentStage(item?.oid)
    setDeleteLoading(false)
  }

  return (
    <div className="flex gap-1">
      <BaseInput placeholder="Stage name" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      {isNew && value.trim().length !== 0 && (
        <Button color="primary" type="button" disabled={loading} loading={loading} onClick={handleCreate}>
          Save
        </Button>
      )}
      {!isNew && value.trim().length !== 0 && value !== item?.name && (
        <Button color="primary" type="button" disabled={loading} loading={loading} onClick={handleUpdate}>
          Save
        </Button>
      )}
      <Button color="error" iconOnly type="button" disabled={deleteLoading} loading={deleteLoading} onClick={handleRemove}>
        <MinusCircleIcon size={16} />
      </Button>
    </div>
  )
}

export default RecruitmentStageItem
