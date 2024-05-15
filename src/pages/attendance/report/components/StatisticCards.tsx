import type { IEmployee, IFilterDate, IStatistic } from '@/types'
import React, { memo, useEffect, useState } from 'react'
import { Skeleton } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { attendanceService } from '@/services'

const Card: React.FC<{
  className?: string
  label?: string
  value?: number | string
}> = ({ className = 'bg-white', label, value }) => (
  <div className={twJoin('flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center', className)}>
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ filterDate?: IFilterDate; items?: IEmployee }> = ({ filterDate, items }) => {
  const [pageData, setPageData] = useState<IStatistic[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)
    const load = async () => {
      try {
        if (items?.oid) {
          const response = await attendanceService.fetchReportStatistic(items?.oid, {
            end_date: filterDate?.endDate,
            start_date: filterDate?.startDate,
          })
          setPageData(response)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      }
    }

    load()
  }, [items?.oid, filterDate])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(5)).map((_, i) => <Card key={i} label="Failed to load Data" value="Error" />)
    }

    if (!pageData) return null

    const colors = ['green', 'amber', 'rose', 'red', 'gray', 'red', 'purple']
    const cardData = pageData?.map((item, index) => ({
      className: `text-white bg-${colors[index]}-600`,
      label: item.title,
      value: item.count,
    }))

    return cardData?.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6')}>
      {!isLoading ? renderCards() : <Skeleton className="h-[88px]" count={6} />}
    </div>
  )
}

export default memo(StatisticCards)
