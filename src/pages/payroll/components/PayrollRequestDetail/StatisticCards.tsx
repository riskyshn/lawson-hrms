import type { IPayrollRequest } from '@/types'
import React from 'react'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import numberToCurrency from '@/utils/number-to-currency'

const Card: React.FC<{ className?: string; label: string; value: number | string }> = ({ className = 'bg-white', label, value }) => (
  <div className={twJoin('flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center', className)}>
    <span className="mb-2 block text-xs">{label}</span>
    <span className="block font-semibold">{value}</span>
  </div>
)

const StatisticCards: React.FC<{ item: IPayrollRequest }> = ({ item }) => {
  const renderCards = () => {
    const cardData = [
      { className: 'text-white bg-indigo-600', label: 'Payroll Title', value: item.name || '' },
      {
        className: 'text-white bg-green-600',
        label: 'Payment Schedule',
        value: moment.utc(item.paymentedAt).local().format('DD MMM YYYY'),
      },
      {
        className: 'text-white bg-amber-600',
        label: 'Payroll Cutoff Period',
        value: `${moment.utc(item.startPeriod).local().format('DD MMM')} - ${moment.utc(item.endPeriod).local().format('DD MMM YYYY')}`,
      },
      { className: 'text-white bg-rose-600', label: 'Employee', value: `${item.totalEmployee} Employees` },
      { className: 'text-white bg-red-600', label: 'Total Amount', value: `${numberToCurrency(parseFloat(item.totalAmount || ''))}` },
    ]

    return cardData.map((rest, index) => <Card key={index} {...rest} />)
  }

  return <div className={twJoin('grid grid-cols-1 gap-3 md:grid-cols-5')}>{renderCards()}</div>
}

export default StatisticCards
