import type { ModalType } from '../types'

import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import moment from 'moment'
import React, { useState } from 'react'
import ActionMenu from './ActionMenu'
import BlacklistModal from './BlacklistModal'
import MoveAnotherVacancyModal from './MoveAnotherVacancyModal'
import RejectModal from './RejectModal'
import UpdateResultModal from './UpdateResultModal'
import ViewHistoryModal from './ViewHistoryModal'

type PropTypes = {
  items: IDataTableApplicant[]
  loading?: boolean
  onRefresh?: () => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onRefresh }) => {
  const [selected, setSelected] = useState<{
    item: IDataTableApplicant
    type: ModalType
  } | null>(null)

  const headerItems = [
    { children: 'Candidate', className: 'text-left' },
    { children: 'Vacancy', className: 'text-left' },
    { children: 'Stage', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
    { children: 'Interview Date', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: (
          <div className="flex items-center gap-3">
            <Avatar name={item.candidate?.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
            <div>
              <span className="block font-semibold">{item.candidate?.name}</span>
              <span className="block">{item.candidate?.email}</span>
            </div>
          </div>
        ),
      },
      { children: item.vacancy?.name || '-' },
      { children: item.recruitmentStage || '-' },
      { children: item.status?.name?.toLocaleLowerCase() || '-', className: 'capitalize' },
      { children: item.interviewDate ? moment(item.interviewDate).format('D/M/Y HH:MM') : '-' },
      {
        children: (
          <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} setSelected={setSelected} />
        ),
      },
    ],
  }))

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
        // onRejected={onRefresh}
      />
      <ViewHistoryModal
        show={!!selected && selected.type === 'VIEW HISTORY'}
        applicant={selected?.item}
        onClose={() => setSelected(null)}
      />
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
