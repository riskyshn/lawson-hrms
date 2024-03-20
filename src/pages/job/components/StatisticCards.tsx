import { vacancyService } from '@/services'
import { Skeleton } from 'jobseeker-ui'
import React, { memo, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const Card: React.FC<{ label: string; value: number | string; background?: string; color?: string; border?: string }> = ({
  value,
  label,
  background,
  color,
  border,
}) => (
  <div
    className={twJoin(
      'flex flex-col items-center justify-center rounded-lg  px-3 py-4 text-center',
      color,
      border ? border : 'border',
      background ? background : 'bg-white',
    )}
  >
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ isRequisition?: boolean; switchData?: boolean }> = ({ isRequisition, switchData }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const fetchedData = await vacancyService.fetchVacancyStratistic({ isRequisition: !!isRequisition })
        setData(fetchedData)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [isRequisition, switchData])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(isRequisition ? 5 : 6)).map((_, i) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const cardData = isRequisition
      ? [
          {
            label: 'Total Requisition Posted',
            value: data.published,
            background: 'bg-jsc-secondary',
            color: 'text-white',
            border: 'border border-gray-100',
          },
          {
            label: 'Approved Requisition',
            value: data.approved,
            background: 'bg-green-700',
            color: 'text-green-50',
            border: 'border border-green-100',
          },
          {
            label: 'Waiting for Approval',
            value: data.progress,
            background: 'bg-amber-600',
            color: 'text-amber-50',
            border: 'border border-amber-100',
          },
          {
            label: 'Requisition Rejected',
            value: data.rejected,
            background: 'bg-rose-700',
            color: 'text-rose-50',
            border: 'border border-rose-100',
          },
          { label: 'Draft', value: data.draft, background: 'bg-gray-200', color: 'text-gray-700', border: 'border border-gray-100' },
        ]
      : [
          {
            label: 'Total Job Posted',
            value: data.all,
            background: 'bg-jsc-secondary',
            color: 'text-white',
            border: 'border border-jsc-secondary/5',
          },
          {
            label: 'Active Jobs',
            value: data.active,
            background: 'bg-green-700',
            color: 'text-green-50',
            border: 'border border-green-100',
          },
          {
            label: 'Inactive Jobs',
            value: data.inactive,
            background: 'bg-rose-700',
            color: 'text-rose-50',
            border: 'border border-rose-100',
          },
          {
            label: 'Fulfilled Jobs',
            value: data.fulfilled,
            background: 'bg-purple-700',
            color: 'text-purple-50',
            border: 'border border-purple-100',
          },
          {
            label: 'Draft Jobs',
            value: data.draft,
            background: 'bg-indigo-700',
            color: 'text-indigo-50',
            border: 'border border-indigo-100',
          },
          {
            label: 'Expired Jobs',
            value: data.expired,
            background: 'bg-gray-200',
            color: 'text-gray-700',
            border: 'border border-gray-100',
          },
        ]

    return cardData.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin('grid gap-3', isRequisition ? 'grid-cols-1 md:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6')}>
      {!loading && renderCards()}
      {loading && <Skeleton className="h-[90px]" count={isRequisition ? 5 : 6} />}
    </div>
  )
}

export default memo(StatisticCards)
