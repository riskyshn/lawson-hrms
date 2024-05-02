import MainTable from '@/components/Elements/Tables/MainTable'
import ProcessModal from '@/components/Modules/Process/ProcessModal'
import RescheduleModal from '@/components/Modules/Process/RescheduleModal'
import ViewProcessHistoryModal from '@/components/Modules/Process/ViewProcessHistoryModal'
import WithdrawModal from '@/components/Modules/Process/WithdrawModal'
import { Avatar, Badge, Color, genStyles } from 'jobseeker-ui'
import { FileIcon } from 'lucide-react'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import type { ModalType, TableType } from '../types'

import ActionMenu from './ActionMenu'
import BlacklistModal from './BlacklistModal'
import EditJoinDateModal from './EditJoinDateModal'
import HireModal from './HireModal'
import MoveAnotherVacancyModal from './MoveAnotherVacancyModal'
import RejectModal from './RejectModal'
import UpdateResultModal from './UpdateResultModal'

type PropTypes = {
  items: IDataTableApplicant[]
  loading?: boolean
  onRefresh?: () => void
  type: TableType
}

const generateHeaderItems = (type: TableType) => {
  switch (type) {
    case 'INTERVIEW':
    case 'ASSESSMENT':
      return [
        { children: 'Candidate', className: 'text-left' },
        { children: 'Vacancy', className: 'text-left' },
        { children: 'Stage', className: 'text-left' },
        { children: 'Status', className: 'text-left' },
        { children: 'Interview Date', className: 'text-left' },
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
          <span className="block font-semibold">{item.candidate?.name || '-'}</span>
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
    children: <ActionMenu index={index} item={item} setSelected={setSelected} total={total} upSpace={total > 8 ? 3 : 0} />,
  })

  switch (type) {
    case 'INTERVIEW':
    case 'ASSESSMENT':
      return {
        items: [
          getCandidateInfo(),
          getVacancyInfo(),
          { children: item.recruitmentStage || '-', className: 'whitespace-normal' },
          getStatusContent(),
          { children: item.actionAt ? moment.utc(item.actionAt).local().format('DD-MM-YYYY HH:mm') : '-' },
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
          { children: item.actionAt ? moment.utc(item.actionAt).local().format('DD-MM-YYYY') : '-' },
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
        applicant={selected?.item}
        onApplied={onRefresh}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'MOVE TO ANOTHER VACANCY'}
      />
      <BlacklistModal
        applicant={selected?.item}
        onBlacklisted={onRefresh}
        onClose={() => setSelected(null)}
        show={!!selected && selected.type === 'BLACKLIST'}
      />
      <RejectModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onRejected={onRefresh}
        show={!!selected && selected.type === 'REJECT'}
      />
      <WithdrawModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onUpdated={onRefresh}
        show={!!selected && selected.type === 'WITHDRAW'}
      />
      <UpdateResultModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
        show={!!selected && selected.type === 'UPDATE RESULT'}
      />
      <ViewProcessHistoryModal
        applicant={selected?.item}
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
      <HireModal applicant={selected?.item} onClose={() => setSelected(null)} show={!!selected && selected.type === 'HIRE CANDIDATE'} />
      <EditJoinDateModal
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onUpdated={onRefresh}
        show={!!selected && selected.type === 'EDIT JOIN DATE'}
      />

      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

const statusColors = genStyles<string, Color>({
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
})

export default Table
