import type { ModalType, TableType } from '../types'

import MainTable from '@/components/Elements/MainTable'
import ProcessModal from '@/components/Modals/ProcessModal'
import { Avatar, Badge, Color, genStyles } from 'jobseeker-ui'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import ActionMenu from './ActionMenu'
import BlacklistModal from './BlacklistModal'
import MoveAnotherVacancyModal from './MoveAnotherVacancyModal'
import RejectModal from './RejectModal'
import UpdateResultModal from './UpdateResultModal'
import ViewProcessHistoryModal from '@/components/Modals/ViewProcessHistoryModal'
import { FileIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

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
  }
}

const generateBodyItems = (
  type: TableType,
  item: IDataTableApplicant,
  index: number,
  total: number,
  setSelected: (value: { item: IDataTableApplicant; type: ModalType }) => void,
) => {
  const getCandidateInfo = () => (
    <div className="flex items-center gap-3">
      <Avatar name={item.candidate?.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
      <div>
        <span className="block font-semibold">{item.candidate?.name || '-'}</span>
        <span className="block">{item.candidate?.email || '-'}</span>
      </div>
    </div>
  )

  const getStatusContent = () =>
    item.status ? (
      <Badge color={statusColors(item.status.name?.toLowerCase())} size="small" className="font-semibold capitalize">
        {item.status.name?.toLowerCase().replace(/_/g, ' ')}
      </Badge>
    ) : (
      '-'
    )

  const getDocuments = () => (
    <button className={item.documentLink ? 'hover:text-primary-600' : 'cursor-default'}>
      <FileIcon size={18} />
    </button>
  )

  switch (type) {
    case 'INTERVIEW':
    case 'ASSESSMENT':
      return {
        items: [
          { children: getCandidateInfo() },
          { children: item.vacancy?.name || '-', className: 'whitespace-normal' },
          { children: item.recruitmentStage || '-', className: 'whitespace-normal' },
          { children: getStatusContent() },
          { children: item.actionAt ? moment(item.actionAt).format('D/M/Y HH:MM') : '-' },
          { children: <ActionMenu item={item} index={index} total={total} upSpace={total > 8 ? 3 : 0} setSelected={setSelected} /> },
        ],
      }
    case 'OFFERING':
      return {
        items: [
          { children: getCandidateInfo() },
          { children: item.vacancy?.name || '-', className: 'whitespace-normal' },
          { children: getStatusContent() },
          { children: getDocuments(), className: 'text-center' },
          { children: <ActionMenu item={item} index={index} total={total} upSpace={total > 8 ? 3 : 0} setSelected={setSelected} /> },
        ],
      }
    default:
      throw new Error(`Unsupported table type: ${type}`)
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
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

const statusColors = genStyles<string, Color>({
  passed: 'success',
  failed: 'error',
  process: 'primary',
  waiting_documents: 'warning',
  waiting: 'default',
  default: 'default',
})

export default Table
