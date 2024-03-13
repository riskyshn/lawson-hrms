import MainTable from '@/components/Elements/MainTable'
import { IVacancy } from '@/types/vacancy'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import ActionMenu from './ActionMenu'

const getStatus = (flag?: number, approved?: number): { text: string; color: string } => {
  const statusMap: Record<number, { text: string; color: string }> = {
    1: { text: 'Posted', color: 'bg-green-100 text-green-600' },
    6: { text: approved ? 'Approved' : 'Approval', color: 'bg-purple-100 text-purple-600' },
    9: { text: 'Draft', color: 'bg-pink-100 text-pink-600' },
    13: { text: 'Fulfilled', color: 'bg-yellow-400 text-white' },
  }

  return flag !== undefined && statusMap[flag] ? statusMap[flag] : { text: 'Unknown', color: 'bg-gray-400 text-white' }
}

const getApprovalCounter = (vacancy: IVacancy) => {
  if (vacancy.flag !== 6) return ''
  const total = vacancy.approvals?.users?.length || 0
  const approved = vacancy.approvals?.users?.filter((el) => el.flag == 1).length || 0
  return ` ${approved}/${total}`
}

const Table: React.FC<{
  items: IVacancy[]
  loading?: boolean
  setHistoryMadalData?: (vacancy: IVacancy) => void
  onVacancyUpdated?: (vacancy: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
}> = ({ items, loading, setHistoryMadalData, onVacancyDeleted, onVacancyUpdated }) => {
  const headerItems = [
    { children: 'Vacancy', className: 'text-left' },
    { children: 'Department' },
    { children: 'Posted Date' },
    { children: 'Status' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((vacancy, index) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{vacancy.vacancyName}</span>
            <span className="text-xs text-gray-500">{vacancy.rrNumber ? `#${vacancy.rrNumber}` : '-'}</span>
          </>
        ),
      },
      { children: vacancy.department?.name || '-', className: 'text-center' },
      { children: vacancy.publishDate ? moment(vacancy.publishDate).format('D/M/Y') : '-', className: 'text-center' },
      {
        children: (
          <span className={twJoin('rounded-lg px-2 py-1 text-sm font-semibold', getStatus(vacancy.flag).color)}>
            {getStatus(vacancy.flag, vacancy.approvals?.flag).text}
            {vacancy.approvals?.flag == 0 && getApprovalCounter(vacancy)}
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (
          <ActionMenu
            vacancy={vacancy}
            index={index}
            total={items.length}
            setHistoryMadalData={setHistoryMadalData}
            upSpace={items.length > 8 ? 3 : 0}
            onVacancyDeleted={onVacancyDeleted}
            onVacancyUpdated={onVacancyUpdated}
          />
        ),
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
