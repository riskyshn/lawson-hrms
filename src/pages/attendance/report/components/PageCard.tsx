import React from 'react'
import { Card } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { useNavigate, useParams } from 'react-router-dom'

const PageCard: React.FC<{
  label: string
  activeLabel: string
}> = ({ label, activeLabel }) => {
  const navigate = useNavigate()
  const { employeeId } = useParams<{ employeeId: string }>()

  const handleClick = () => {
    navigate(`/attendance/report/${employeeId}/${label.toLowerCase().replace(' ', '-')}`)
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
