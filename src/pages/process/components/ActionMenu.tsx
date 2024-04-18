import React, { useEffect, useState } from 'react'
import * as Table from '@/components/Elements/Tables/MainTable'
import {
  EditIcon,
  FileEditIcon,
  FileIcon,
  HistoryIcon,
  LogOutIcon,
  LucideIcon,
  PenIcon,
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
import { useConfirm, useToast } from 'jobseeker-ui'
import { processService } from '@/services'
import { useNavigate } from 'react-router-dom'
import { axiosErrorMessage } from '@/utils/axios'

type ActionMenuProps = {
  item: IDataTableApplicant
  index: number
  total: number
  upSpace: number
  onVacancyUpdated?: (item: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
  setSelected: (selected: { item: IDataTableApplicant; type: ModalType }) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelected }) => {
  const confirm = useConfirm()
  const toast = useToast()
  const navigate = useNavigate()
  const [stageComplete, setStageComplete] = useState(false)

  useEffect(() => {
    const load = async (applicantId: string) => {
      try {
        const response = await processService.fetchDetailStages(applicantId)
        const stages = response.content
        const allStagesUnavailable = stages.every((stage) => stage.isAvailable === false)
        setStageComplete(allStagesUnavailable)
      } catch (error) {
        console.error('Error fetching stages data:', error)
      }
    }

    load(item.oid)
  }, [item.oid])

  const createMenuItem = (
    text: string,
    icon: LucideIcon,
    type?: ModalType,
    iconClassName?: string,
    action?: () => void,
  ): Table.ActionMenuItemProps => ({
    text,
    icon,
    iconClassName,
    action: () => (action ? action() : type && setSelected({ item, type })),
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

  const sendReminder: Table.ActionMenuItemProps = {
    text: 'Send Reminder',
    icon: SendIcon,
    action: async () => {
      const confirmed = await confirm(`Are you sure you want to send a reminder to ${item.candidate?.email}?`)
      if (confirmed) {
        try {
          await processService.sendReminder(item.oid)
          toast('Reminder sent successfully.', { color: 'success' })
        } catch (e) {
          toast(axiosErrorMessage(e), { color: 'error' })
        }
      }
    },
  }

  const offeringLetter = createMenuItem('Offering Letter', RepeatIcon, undefined, undefined, async () => {
    const confirmed = await confirm('Are you sure you want to move this item to offering letter?')
    if (!confirmed) return

    try {
      await processService.moveToOfferingLetter({ applicantId: item.oid })
      toast('Successfully moved item to offering letter.', { color: 'success' })
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
  const uploadSignedOfferingLetter = createMenuItem('Upload Signed Of... Le...', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-signed`),
  )
  const uploadDocuments = createMenuItem('Upload Documents', UploadIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-documents`),
  )
  const editDocuments = createMenuItem('Edit Documents', EditIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/upload-documents?edit=true`),
  )
  const viewSignedOfferingLetter = createMenuItem('View Signed Offerig Le...', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/view-signed`),
  )
  const addAsEmployee = createMenuItem('Add As Employee', UserIcon, undefined, undefined, () =>
    navigate(`/employees/employee-management/create?applicantId=${item.oid}`),
  )

  const generateMenuItems = (status: string): Table.ActionMenuItemProps[] => {
    const menu = []

    // Action menu items for applications in the "Process" status (0).
    if (status === '0') {
      if (!stageComplete) {
        menu.push(process)
      }
      menu.push(updateResult, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw)
    }

    // Action menu items for applications in the "Passed" status (1).
    // Action menu items for applications in the "Failed" status (2).
    if (status === '1' || status === '2') {
      if (!stageComplete) {
        menu.push(process)
      }
      menu.push(offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw)
    }

    // Action menu items for applications in the "Waiting for Documents" status (3).
    if (status === '3') {
      menu.push(createOfferingLetter, sendReminder, uploadDocuments, viewHistory, blacklist, reject, withdraw)
    } else if (status === '4') {
      // Action menu items for applications in the "Ready to Offer" status (4).
      menu.push(createOfferingLetter, editDocuments, viewHistory, blacklist, reject, withdraw)
    } else if (status === '5') {
      // Action menu items for applications in the "Offering Letter Sent" status (5).
      menu.push(reviseOfferingLetter, uploadSignedOfferingLetter, sendReminder, viewHistory, blacklist, reject, withdraw)
    } else if (status === '6') {
      // Action menu items for applications in the "Offering Signed" status (6).
      menu.push(viewSignedOfferingLetter, hire, viewHistory, blacklist, reject, withdraw)
    } else if (status === '7') {
      // Action menu items for applications in the "Waiting to Join" status (7).
      menu.push(addAsEmployee, editJoinDate, viewHistory, blacklist, withdraw)
    }

    return menu
  }

  // Use the function to get menu items based on status and stageComplete
  const menu = generateMenuItems(item.status?.oid || '0')

  if (!menu) return null

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menu.map((menuItem, i) => (
        <Table.ActionMenuItem key={i} {...menuItem} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
