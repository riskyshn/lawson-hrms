import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '@jshrms/ui'
import { twJoin } from 'tailwind-merge'

const PageCard: React.FC<{
  activeLabel: string
  label: string
}> = ({ activeLabel, label }) => {
  const navigate = useNavigate()
  const { employeeId } = useParams<{ employeeId: string }>()

  const handleClick = () => {
    navigate(`/attendance/report/${employeeId}/${label.toLowerCase().replace(' ', '-')}`)
  }

  return (
    <Card
      as="button"
      className={twJoin(
        'flex items-center justify-center gap-2 divide-y-0 rounded-lg border p-3',
        label === activeLabel ? 'border-primary-600 bg-primary-600 text-white' : 'hover:border-gray-300 hover:bg-gray-100',
      )}
      onClick={handleClick}
    >
      <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">{label}</span>
    </Card>
  )
}

export default PageCard
