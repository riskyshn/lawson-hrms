import { reportService } from '@/services'
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

const StatisticCards: React.FC<{ light?: boolean; switchData?: boolean }> = ({ switchData }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await reportService.fetchRecruitmentFunnel()
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
      return Array.from(Array(5)).map((_, i: number) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const stages = [
      { label: 'Interview', dataKey: 'interview' },
      { label: 'Applicant', dataKey: 'applicant' },
      { label: 'Assessment', dataKey: 'assessment' },
      { label: 'Offering', dataKey: 'offering' },
      { label: 'Onboarding', dataKey: 'onboarding' },
    ]

    const colors = ['green', 'amber', 'rose', 'red', 'gray']

    return stages.map((stage, index) => {
      const stageData = data[stage.dataKey]
      return <Card key={index} label={`${stage.label}`} value={stageData.total} className={`text-white bg-${colors[index]}-600`} />
    })
  }

  return (
    <div className={twJoin(`grid grid-cols-2 gap-3 md:grid-cols-5`)}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={5} />}
    </div>
  )
}

export default memo(StatisticCards)
