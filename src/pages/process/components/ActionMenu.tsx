import type { IDataTableApplicant, IVacancy } from '@jshrms/shared/types'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Table from '@jshrms/shared/components/Elements/Tables/MainTable'
import { processService } from '@jshrms/shared/services'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { useConfirm, useToast } from '@jshrms/ui'
import {
  EditIcon,
  EyeIcon,
  FileEditIcon,
  FileIcon,
  HistoryIcon,
  LogOutIcon,
  LucideIcon,
  PenIcon,
  RefreshCcwIcon,
  RepeatIcon,
  SendIcon,
  SendToBackIcon,
  UploadIcon,
  UserIcon,
  UserPlusIcon,
  UserXIcon,
  XCircleIcon,
} from 'lucide-react'
import { ModalType } from '../types'

type ActionMenuProps = {
  index: number
  item: IDataTableApplicant
  onVacancyDeleted?: (id: string) => void
  onVacancyUpdated?: (item: IVacancy) => void
  setSelected: (selected: { item: IDataTableApplicant; type: ModalType }) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, setSelected, total, upSpace }) => {
  const [loading, setLoading] = useState(item.status?.oid === '1' || item.status?.oid === '2')
  const [triggered, setTriggered] = useState(false)
  const [haveProcess, setHaveProcess] = useState(true)
  const confirm = useConfirm()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!triggered) return

    if (item.status?.oid === '1' || item.status?.oid === '2') {
      setLoading(true)
    } else {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const stages = await processService.fetchDetailStages(item.oid)
        const haveProcess = stages.content.map((el) => el.isAvailable).includes(true)
        setHaveProcess(haveProcess)
      } catch (e) {
        toast(axiosErrorMessage(e))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [item.status?.oid, item.oid, triggered, toast])

  const createMenuItem = (
    text: string,
    icon: LucideIcon,
    type?: ModalType,
    iconClassName?: string,
    action?: () => void,
  ): Table.ActionMenuItemProps => ({
    action: () => (action ? action() : type && setSelected({ item, type })),
    icon,
    iconClassName,
    text,
  })

  const process = createMenuItem('Process', RepeatIcon, 'PROCESS')
  const updateResult = createMenuItem('Update Result', UserPlusIcon, 'UPDATE RESULT')
  const moveToAnotherVacancy = createMenuItem('Move to Another Vacancy', SendToBackIcon, 'MOVE TO ANOTHER VACANCY')
  const viewHistory = createMenuItem('View History', HistoryIcon, 'VIEW HISTORY')
  const blacklist = createMenuItem('Blacklist', UserXIcon, 'BLACKLIST')
  const hire = createMenuItem('Hire', UserPlusIcon, 'HIRE CANDIDATE')
  const editJoinDate = createMenuItem('Edit Join Date', PenIcon, 'EDIT JOIN DATE')
  const reject = createMenuItem('Reject', XCircleIcon, 'REJECT', 'text-error-600')
  const withdraw = createMenuItem('Withdraw', LogOutIcon, 'WITHDRAW')
  const reschedule = createMenuItem('Reschedule', RefreshCcwIcon, 'RESCHEDULE')

  const sendReminder = createMenuItem('Send Reminder', SendIcon, undefined, undefined, async () => {
    const confirmed = await confirm(`Are you sure you want to send a reminder to ${item.candidate?.email}?`)
    if (confirmed) {
      try {
        await processService.sendReminder(item.oid)
        toast('Reminder sent successfully.', { color: 'success' })
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      }
    }
  })

  const offeringLetter = createMenuItem('Offering Letter', RepeatIcon, undefined, undefined, async () => {
    const confirmed = await confirm('Are you sure you want to move this item to offering letter?')
    if (!confirmed) return

    try {
      await processService.moveToOfferingLetter(item.oid)
      toast('Success fully move item to offering letter.', { color: 'success' })
      navigate('/process/offering-letter')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  })
  const createOfferingLetter = createMenuItem('Create Offering Letter', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/create`),
  )
  const reviseOfferingLetter = createMenuItem('Revise Offering Letter', FileEditIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/revise`),
  )
  const uploadSignedOfferingLetter = createMenuItem('Upload Signed Offering Letter', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-signed`),
  )
  const uploadDocuments = createMenuItem('Upload Documents', UploadIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-documents`),
  )
  const editDocuments = createMenuItem('Edit Documents', EditIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-documents?edit=true`),
  )
  const viewSignedOfferingLetter = createMenuItem('View Signed Offering Letter', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/view-signed`),
  )
  const previewOfferingLetter = createMenuItem('Preview Offering Letter', EyeIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/preview`),
  )
  const addAsEmployee = createMenuItem('Add As Employee', UserPlusIcon, undefined, undefined, async () => {
    const confirmed = await confirm(`Are you sure you want to Hire this candidate "${item.candidate?.email}"?`)
    if (confirmed) {
      try {
        await processService.setAsHired(item.oid)
        navigate(`/employees/employee-management/create?applicantId=${item.oid}`)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      }
    }
  })
  const viewProfile = createMenuItem('View Profile', UserIcon, undefined, undefined, () =>
    navigate(`/candidates/profile/${item.candidate?.oid}`),
  )

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    // Action menu items for applications in the "Process" status (0).
    '0': [updateResult, reschedule, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Passed" status (1).
    '1': [haveProcess ? process : null, offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw].filter(
      (el) => !!el,
    ) as Table.ActionMenuItemProps[],
    // Action menu items for applications in the "Failed" status (2).
    '2': [haveProcess ? process : null, offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw].filter(
      (el) => !!el,
    ) as Table.ActionMenuItemProps[],
    // Action menu items for applications in the "Waiting for Documents" status (3).
    '3': [createOfferingLetter, sendReminder, uploadDocuments, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Ready to Offer" status (4).
    '4': [createOfferingLetter, editDocuments, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Offering Letter Sent" status (5).
    '5': [reviseOfferingLetter, uploadSignedOfferingLetter, previewOfferingLetter, sendReminder, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Offering Signed" status (6).
    '6': [viewSignedOfferingLetter, hire, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Waiting to Join" status (7).
    '7': [addAsEmployee, viewProfile, editJoinDate, viewHistory, blacklist, withdraw],
  }

  const menu = menuItems[item.status?.oid || '0']

  if (!menu) return null

  return (
    <Table.ActionMenu loading={loading} onClick={() => setTriggered(true)} up={index >= total - upSpace}>
      {menu.map((menuItem, i) => (
        <Table.ActionMenuItem key={i} {...menuItem} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
