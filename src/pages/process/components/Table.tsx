import type { ModalType, TableType } from '../types'

import MainTable from '@/components/Elements/Tables/MainTable'
import ProcessModal from '@/components/Modules/Process/ProcessModal'
import ViewProcessHistoryModal from '@/components/Modules/Process/ViewProcessHistoryModal'
import WithdrawModal from '@/components/Modules/Process/WithdrawModal'
import { Avatar, Badge, Color, genStyles } from 'jobseeker-ui'
import { FileIcon } from 'lucide-react'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
        <Avatar name={item.candidate?.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
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
      <Badge color={statusColors(item.status.name?.toLowerCase())} size="small" className="font-semibold capitalize">
        {item.status.name?.toLowerCase().replace(/_/g, ' ')}
      </Badge>
    ) : (
      '-'
    ),
  })

  const getActionMenu = () => ({
    children: <ActionMenu item={item} index={index} total={total} upSpace={total > 8 ? 3 : 0} setSelected={setSelected} />,
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
          { children: item.actionAt ? moment(item.actionAt).format('DD-MM-YYYY HH:MM') : '-' },
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
            className: 'text-center',
            children: (
              <span className="inline-block">
                {parseInt(item.status?.oid || '4') >= 4 ? (
                  <Link
                    to={`/process/offering-letter/${item.oid}/upload-documents?edit=true`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <FileIcon size={18} />
                  </Link>
                ) : (
                  <FileIcon size={18} />
                )}
              </span>
            ),
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

const Table: React.FC<PropTypes> = ({ items, loading, type, onRefresh }) => {
  const [selected, setSelected] = useState<{ item: IDataTableApplicant; type: ModalType } | null>(null)

  const headerItems = useMemo(() => generateHeaderItems(type), [type])
  const bodyItems = items.map((item, index) => generateBodyItems(type, item, index, items.length, setSelected))

  return (
    <>
      <MoveAnotherVacancyModal
        show={!!selected && selected.type === 'MOVE TO ANOTHER VACANCY'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onApplied={onRefresh}
      />
      <BlacklistModal
        show={!!selected && selected.type === 'BLACKLIST'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onBlacklisted={onRefresh}
      />
      <RejectModal
        show={!!selected && selected.type === 'REJECT'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onRejected={onRefresh}
      />
      <WithdrawModal
        show={!!selected && selected.type === 'WITHDRAW'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onUpdated={onRefresh}
      />
      <UpdateResultModal
        show={!!selected && selected.type === 'UPDATE RESULT'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
      />
      <ViewProcessHistoryModal
        show={!!selected && selected.type === 'VIEW HISTORY'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
      />
      <ProcessModal
        show={!!selected && selected.type === 'PROCESS'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onSubmited={onRefresh}
      />
      <HireModal show={!!selected && selected.type === 'HIRE CANDIDATE'} applicant={selected?.item} onClose={() => setSelected(null)} />
      <EditJoinDateModal
        show={!!selected && selected.type === 'EDIT JOIN DATE'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
        onUpdated={onRefresh}
      />

      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

const statusColors = genStyles<string, Color>({
  passed: 'success',
  failed: 'error',
  process: 'primary',
  ready_to_offer: 'error',
  waiting_documents: 'warning',
  offering_sent: 'primary',
  offering_sign: 'success',
  waiting_to_join: 'warning',
  waiting: 'default',
  default: 'default',
})

export default Table
