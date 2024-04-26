import { Card } from 'jobseeker-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

const PageCard: React.FC<{
  label: string
  activeLabel: string
  startDate?: string
  endDate?: string
}> = ({ label, activeLabel, startDate, endDate }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(
      `/attendance/attendance-management/${label.toLowerCase().replace(' ', '-')}?startDate=${startDate || ''}&endDate=${endDate || ''}`,
    )
  }

  return (
    <Card
      as="button"
      onClick={handleClick}
      className={twJoin(
        'flex items-center justify-center gap-2 divide-y-0 rounded-lg border p-3',
        label === activeLabel ? 'border-primary-600 bg-primary-600 text-white' : 'hover:border-gray-300 hover:bg-gray-100',
      )}
    >
      <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">{label}</span>
    </Card>
  )
}

export default PageCard
