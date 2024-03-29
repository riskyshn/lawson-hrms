import { attendanceService } from '@/services'
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
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await attendanceService.fetchStatistic()
        setData(data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [switchData])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(6)).map((_, i: number) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const colors = ['green', 'amber', 'rose', 'red', 'gray', 'red', 'sky']

    const cardData = data.map((item: { title: string; count: number }, index: number) => ({
      label: item.title,
      value: item.count,
      className: `text-white bg-${light ? colors[index] : colors[index]}-600`,
    }))

    return cardData.map((rest: any, index: number) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-${data ? data.length : 7}`)}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={data ? data.length : 7} />}
    </div>
  )
}

export default memo(StatisticCards)
