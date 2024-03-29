import { vacancyService } from '@/services'
import { Skeleton } from 'jobseeker-ui'
import React, { memo, useEffect, useState } from 'react'
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

const StatisticCards: React.FC<{ light?: boolean; switchData?: boolean }> = ({ switchData, light }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const fetchedData = await vacancyService.fetchVacancyStratistic()
        setData(fetchedData)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [switchData])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(6)).map((_, i) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    let cardData = [
      { label: 'Total Employee', value: data.total, className: 'text-white bg-green-600' },
      { label: 'Check In', value: data.checkin, className: 'text-white bg-amber-600' },
      { label: 'On Time', value: data.ontime, className: 'text-white bg-rose-600' },
      { label: 'Late', value: data.late, className: 'text-white bg-red-600' },
      { label: 'Absent', value: data.absent, className: 'text-white bg-gray-600' },
      { label: 'Leave', value: data.leave, className: 'text-white bg-red-600' },
      { label: 'Client Visit', value: data.client, className: 'text-white bg-sky-600' },
      { label: 'Overtime', value: data.overtime, className: 'text-white bg-yellow-600' },
    ]

    if (light) {
      cardData = [
        { label: 'Total Employee', value: data.total, className: 'text-white bg-green-600' },
        { label: 'Check In', value: data.checkin, className: 'text-white bg-amber-600' },
        { label: 'On Time', value: data.ontime, className: 'text-white bg-rose-600' },
        { label: 'Late', value: data.late, className: 'text-white bg-red-600' },
        { label: 'Absent', value: data.absent, className: 'text-white bg-gray-600' },
        { label: 'Leave', value: data.leave, className: 'text-white bg-gray-600' },
        { label: 'Client Visit', value: data.client, className: 'text-white bg-gray-600' },
        { label: 'Overtime', value: data.overtime, className: 'text-white bg-gray-600' },
      ]
    }

    return cardData.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8`)}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={8} />}
    </div>
  )
}

export default memo(StatisticCards)
