import React, { memo } from 'react'
import { twJoin } from 'tailwind-merge'

const Card: React.FC<{
  label: string
  value: number | string
  className?: string
}> = ({ value, label, className = 'bg-white' }) => (
  <div className={twJoin('flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center', className)}>
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ light?: boolean; switchData?: boolean }> = () => {
  const attendanceStatistics = [
    {
      title: 'Total Attend',
      count: 200,
    },
    {
      title: 'Total Late',
      count: 15,
    },
    {
      title: 'Total Client Visit',
      count: 30,
    },
    {
      title: 'Total Overtime',
      count: 50,
    },
    {
      title: 'Total Absent',
      count: 10,
    },
    {
      title: 'Total Leave',
      count: 25,
    },
  ]

  const renderCards = () => {
    const colors = ['green', 'amber', 'rose', 'red', 'gray', 'red', 'purple']

    const cardData = attendanceStatistics.map((item: { title: string; count: number }, index: number) => ({
      label: item.title,
      value: item.count,
      className: `text-white bg-${colors[index]}-600`,
    }))

    return cardData.map((rest: any, index: number) => <Card key={index} {...rest} />)
  }

  return <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-6`)}>{renderCards()}</div>
}

export default memo(StatisticCards)
