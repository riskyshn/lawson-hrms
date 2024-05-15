import type { IRecruitmentFunnel } from '@/types'
import React, { memo, useEffect, useState } from 'react'
import { Skeleton } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { reportService } from '@/services'

const Card: React.FC<{
  className?: string
  label: string
  value: number | string
}> = ({ className = 'bg-white', label, value }) => (
  <div className={twJoin('flex flex-col items-center justify-center rounded-lg px-3 py-4 text-center', className)}>
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ filterDate: { endDate: string; startDate: string } }> = ({ filterDate }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IRecruitmentFunnel>()
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await reportService.fetchRecruitmentFunnel({
          end_date: filterDate.endDate,
          start_date: filterDate.startDate,
        })
        setData(data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [filterDate])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(5)).map((_, i: number) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const colors = ['green', 'amber', 'rose', 'red', 'gray']

    return data?.total ? (
      data.total.map((stage, index) => (
        <Card className={`text-white bg-${colors[index]}-600`} key={index} label={`${stage.label}`} value={stage.total} />
      ))
    ) : (
      <div></div>
    )
  }

  return (
    <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-5`)}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={5} />}
    </div>
  )
}

export default memo(StatisticCards)
