import { attendanceService } from '@/services'
import { Skeleton } from 'jobseeker-ui'
import React, { memo, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const Card: React.FC<{
  label?: string
  value?: number | string
  className?: string
}> = ({ value, label, className = 'bg-white' }) => (
  <div className={twJoin('flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center', className)}>
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ items?: IEmployee; filterDate?: IFilterDate }> = ({ items, filterDate }) => {
  const [pageData, setPageData] = useState<IStatistic[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)
    const load = async () => {
      try {
        if (items?.oid) {
          const response = await attendanceService.fetchReportStatistic(items?.oid, {
            start_date: filterDate?.startDate,
            end_date: filterDate?.endDate,
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
      label: item.title,
      value: item.count,
      className: `text-white bg-${colors[index]}-600`,
    }))

    return cardData?.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5')}>
      {!isLoading ? renderCards() : <Skeleton className="h-[88px]" count={5} />}
    </div>
  )
}

export default memo(StatisticCards)
