import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { attendanceService } from '@/services'

const Card: React.FC<{
  className?: string
  label?: string
  onClick?: () => void
  value?: number | string
}> = ({ className = 'bg-white', label, onClick, value }) => {
  const isClickable = label !== 'Check In' && label !== 'Absent'

  return (
    <div
      className={twJoin(
        'flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center',
        className,
        isClickable ? 'cursor-pointer' : 'cursor-default',
      )}
      onClick={onClick}
    >
      <span className="mb-2 block text-2xl font-semibold">{value}</span>
      <span className="block text-xs">{label}</span>
    </div>
  )
}

const StatisticCards: React.FC<{ filterDate?: IFilterDate }> = ({ filterDate }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IStatistic[]>()
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await attendanceService.fetchStatistic({
          end_date: filterDate?.endDate,
          start_date: filterDate?.startDate,
        })
        setData(data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [filterDate])

  const handleCardClick = (title: string) => {
    if (title === 'Leave') {
      navigate(`/attendance/request-management?startDate=${filterDate?.startDate || ''}&endDate=${filterDate?.endDate || ''}`)
    }
    if (title === 'Overtime') {
      navigate(`/attendance/attendance-management/overtime?startDate=${filterDate?.startDate || ''}&endDate=${filterDate?.endDate || ''}`)
    }
    if (title === 'Client Visit') {
      navigate(
        `/attendance/attendance-management/client-visit?startDate=${filterDate?.startDate || ''}&endDate=${filterDate?.endDate || ''}`,
      )
    }
    if (title === 'Late') {
      navigate(`/attendance/attendance-management/attendance?is_late=1`)
    }
    if (title === 'On Time') {
      navigate(`/attendance/attendance-management/attendance?is_late=0`)
    }
    if (title === 'All Employee') {
      navigate(`/attendance/attendance-management/attendance`)
    }
  }

  const renderCards = () => {
    if (error) {
      return Array.from(Array(8)).map((_, i: number) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const colorClasses = [
      'bg-green-600',
      'bg-amber-600',
      'bg-rose-600',
      'bg-red-600',
      'bg-gray-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-teal-600',
    ]

    const cardData = data.map((item, index) => {
      const colorClass = colorClasses[index % colorClasses.length]
      return {
        className: `text-white ${colorClass}`,
        label: item.title,
        value: item.count,
      }
    })

    return cardData.map((rest, index) => <Card key={index} {...rest} onClick={() => handleCardClick(rest.label || '')} />)
  }

  return (
    <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-8`)}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={8} />}
    </div>
  )
}

export default memo(StatisticCards)
