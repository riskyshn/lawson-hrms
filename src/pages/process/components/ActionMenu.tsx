import React from 'react'
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
      toast('Success fully move item to offering letter.', { color: 'success' })
      navigate('/process/offering-letter')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  })
  const createOfferingLetter = createMenuItem('Create Offering Letter', FileIcon, undefined, undefined, () =>
    navigate(`/process/offering-letter/${item.oid}/create`),
  )
  const reviseOfferingLetter = createMenuItem(
    'Revise Offering Letter',
    FileEditIcon,
    undefined,
    undefined,
    () => toast('Endpoint api belum ada! segera hubungi mas akbar.'),
    // navigate(`/process/offering-letter/${item.oid}/revise`),
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

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    // Action menu items for applications in the "Process" status (0).
    '0': [updateResult, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Passed" status (1).
    '1': [process, offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Failed" status (2).
    '2': [process, offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Waiting for Documents" status (3).
    '3': [createOfferingLetter, sendReminder, uploadDocuments, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Ready to Offer" status (4).
    '4': [createOfferingLetter, editDocuments, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Offering Letter Sent" status (5).
    '5': [reviseOfferingLetter, uploadSignedOfferingLetter, sendReminder, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Offering Signed" status (6).
    '6': [viewSignedOfferingLetter, hire, viewHistory, blacklist, reject, withdraw],
    // Action menu items for applications in the "Waiting to Join" status (7).
    '7': [addAsEmployee, editJoinDate, viewHistory, blacklist, withdraw],
  }

  const menu = menuItems[item.status?.oid || '0']

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
