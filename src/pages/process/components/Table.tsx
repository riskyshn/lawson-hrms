import type { IDataTableApplicant } from '@/types'
import type { ModalType, TableType } from '../types'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge, Color, variants } from 'jobseeker-ui'
import { FileIcon } from 'lucide-react'
import moment from 'moment'
import { MainTable } from '@/components'
import {
  BlacklistModal,
  MoveAnotherVacancyModal,
  ProcessModal,
  RejectModal,
  RescheduleModal,
  ViewProcessHistoryModal,
  WithdrawModal,
} from '@/modules/process'
import ActionMenu from './ActionMenu'
import EditJoinDateModal from './EditJoinDateModal'
import HireModal from './HireModal'
import UpdateResultModal from './UpdateResultModal'

type PropTypes = {
  items: IDataTableApplicant[]
  loading?: boolean
  onRefresh?: () => void
  type: TableType
}

const generateHeaderItems = (type: TableType) => {
  switch (type) {
    case 'ADMINISTRATION':
    case 'SELECTION':
      return [
        { children: 'Candidate', className: 'text-left' },
        { children: 'Vacancy', className: 'text-left' },
        { children: 'Stage', className: 'text-left' },
        { children: 'Status', className: 'text-left' },
        { children: 'Administration Date', className: 'text-left' },
        { children: 'Action', className: 'w-24' },
      ]
    case 'OFFERING':
      return [
        { children: 'Candidate', className: 'text-left' },
        { children: 'Vacancy', className: 'text-left' },
        { children: 'Status', className: 'text-left' },
        { children: 'Documents' },
        { children: 'Action', className: 'w-24' },
      ]
    case 'ONBOARDING':
      return [
        { children: 'Candidate', className: 'text-left' },
        { children: 'Vacancy', className: 'text-left' },
        { children: 'Status', className: 'text-left' },
        { children: 'Join Date', className: 'text-left' },
        { children: 'Action', className: 'w-24' },
      ]
  }
}

const generateBodyItems = (
  type: TableType,
  item: IDataTableApplicant,
  index: number,
  total: number,
  setSelected: (value: { item: IDataTableApplicant; type: ModalType }) => void,
) => {
  const getCandidateInfo = () => ({
    children: (
      <div className="flex items-center gap-3">
        <Avatar
          className="rounded-lg bg-primary-100 text-primary-700"
          name={item.candidate?.name || ''}
          src={item.photoProfile}
          size={38}
        />
        <div>
          <Link className="block font-semibold text-primary-600 hover:text-primary-700" to={`/candidates/profile/${item.candidate?.oid}`}>
            {item.candidate?.name}
          </Link>
          <span className="block">{item.candidate?.email || '-'}</span>
        </div>
      </div>
    ),
  })

  const getVacancyInfo = () => ({
    children: item.vacancy ? (
      <>
        <span className="block">{item.vacancy.name}</span>
        <span className="block text-xs text-gray-500">{item.vacancy.rrNumber || '-'}</span>
      </>
    ) : (
      '-'
    ),
    className: 'whitespace-normal',
  })

  const getStatusContent = () => ({
    children: item.status ? (
      <Badge className="font-semibold capitalize" color={statusColors(item.status.name?.toLowerCase())} size="small">
        {item.status.name?.toLowerCase().replace(/_/g, ' ')}
      </Badge>
    ) : (
      '-'
    ),
  })

  const getActionMenu = () => ({
    children: <ActionMenu index={index} item={item} setSelected={setSelected} total={total} />,
  })

  switch (type) {
    case 'ADMINISTRATION':
    case 'SELECTION':
      return {
        items: [
          getCandidateInfo(),
          getVacancyInfo(),
          { children: item.recruitmentStage || '-', className: 'whitespace-normal' },
          getStatusContent(),
          { children: item.actionAt ? moment(item.actionAt).format('DD-MM-YYYY HH:mm') : '-' },
          getActionMenu(),
        ],
      }
    case 'OFFERING':
      return {
        items: [
          getCandidateInfo(),
          getVacancyInfo(),
          getStatusContent(),
          {
            children: (
              <span className="inline-block">
                {parseInt(item.status?.oid || '4') >= 4 ? (
                  <Link
                    className="text-primary-600 hover:text-primary-700"
                    to={`/process/offering-letter/${item.oid}/upload-documents?edit=true`}
                  >
                    <FileIcon size={18} />
                  </Link>
                ) : (
                  <FileIcon size={18} />
                )}
              </span>
            ),
            className: 'text-center',
          },
          getActionMenu(),
        ],
      }
    case 'ONBOARDING':
      return {
        items: [
          getCandidateInfo(),
          getVacancyInfo(),
          getStatusContent(),
          { children: item.actionAt ? moment(item.actionAt).format('DD-MM-YYYY') : '-' },
          getActionMenu(),
        ],
      }
  }
}

const Table: React.FC<PropTypes> = ({ items, loading, onRefresh, type }) => {
  const [selected, setSelected] = useState<{ item: IDataTableApplicant; type: ModalType } | null>(null)

  const headerItems = useMemo(() => generateHeaderItems(type), [type])
  const bodyItems = items.map((item, index) => generateBodyItems(type, item, index, items.length, setSelected))

  return (
    <>
      <MoveAnotherVacancyModal
        applicantId={selected?.item.oid}
        onRefresh={onRefresh}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'MOVE TO ANOTHER VACANCY'}
      />
      <BlacklistModal
        applicantId={selected?.item.oid}
        onRefresh={onRefresh}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'BLACKLIST'}
      />
      <RejectModal
        applicantId={selected?.item.oid}
        onRefresh={onRefresh}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'REJECT'}
      />
      <WithdrawModal
        applicantId={selected?.item.oid}
        onClose={() => setSelected(null)}
        onRefresh={onRefresh}
        show={!!selected && selected.type === 'WITHDRAW'}
      />
      <UpdateResultModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
        show={!!selected && selected.type === 'UPDATE RESULT'}
      />
      <ViewProcessHistoryModal
        applicantId={selected?.item.oid}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'VIEW HISTORY'}
      />
      <ProcessModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
        show={!!selected && selected.type === 'PROCESS'}
      />
      <RescheduleModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
        show={!!selected && selected.type === 'RESCHEDULE'}
      />
      <HireModal
        applicantId={selected?.item.oid}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'HIRE CANDIDATE'}
      />
      <EditJoinDateModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onRefresh={onRefresh}
        show={!!selected && selected.type === 'EDIT JOIN DATE'}
      />

      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

const statusColors = variants<string, Color>({
  default: 'default',
  failed: 'error',
  offering_sent: 'primary',
  offering_sign: 'success',
  passed: 'success',
  process: 'primary',
  ready_to_offer: 'error',
  waiting: 'default',
  waiting_documents: 'warning',
  waiting_to_join: 'warning',
  hired: 'success',
})

export default Table
