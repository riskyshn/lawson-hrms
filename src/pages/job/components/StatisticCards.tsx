import { vacancyService } from '@/services'
import { Skeleton } from 'jobseeker-ui'
import React, { memo, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

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

const StatisticCards: React.FC<{ isRequisition?: boolean; light?: boolean; refresh?: boolean }> = ({ isRequisition, light, refresh }) => {
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
  }, [isRequisition, refresh])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(isRequisition ? 5 : 6)).map((_, i) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    let cardData = isRequisition
      ? [
          { className: 'text-white bg-indigo-600', label: 'Total Requisition Posted', value: data.published },
          { className: 'text-white bg-green-600', label: 'Approved Requisition', value: data.approved },
          { className: 'text-white bg-amber-600', label: 'Waiting for Approval', value: data.progress },
          { className: 'text-white bg-rose-600', label: 'Requisition Rejected', value: data.rejected },
          { className: 'text-white bg-red-600', label: 'Requisition Canceled', value: data.canceled },
          { className: 'text-white bg-gray-600', label: 'Draft', value: data.draft },
        ]
      : [
          { className: 'text-white bg-indigo-600', label: 'Total Job Posted', value: data.all },
          { className: 'text-white bg-green-600', label: 'Active Jobs', value: data.active },
          { className: 'text-white bg-rose-600', label: 'Inactive Jobs', value: data.inactive },
          { className: 'text-white bg-purple-600', label: 'Fulfilled Jobs', value: data.fulfilled },
          { className: 'text-white bg-indigo-600', label: 'Draft Jobs', value: data.draft },
          { className: 'text-white bg-gray-600', label: 'Expired Jobs', value: data.expired },
        ]

    if (light) {
      cardData = isRequisition
        ? [
            { className: 'bg-indigo-100 text-indigo-700', label: 'Total Requisition Posted', value: data.published },
            { className: 'bg-green-100 text-green-700', label: 'Approved Requisition', value: data.approved },
            { className: 'bg-amber-100 text-amber-700', label: 'Waiting for Approval', value: data.progress },
            { className: 'bg-rose-100 text-rose-700', label: 'Requisition Rejected', value: data.rejected },
            { className: 'bg-red-100 text-red-700', label: 'Requisition Canceled', value: data.canceled },
            { className: 'bg-gray-200 text-gray-700', label: 'Draft', value: data.draft },
          ]
        : [
            { className: 'bg-indigo-100 text-indigo-700', label: 'Total Job Posted', value: data.all },
            { className: 'bg-green-100 text-green-700', label: 'Active Jobs', value: data.active },
            { className: 'bg-rose-100 text-rose-700', label: 'Inactive Jobs', value: data.inactive },
            { className: 'bg-purple-100 text-purple-700', label: 'Fulfilled Jobs', value: data.fulfilled },
            { className: 'bg-indigo-100 text-indigo-700', label: 'Draft Jobs', value: data.draft },
            { className: 'bg-gray-200 text-gray-700', label: 'Expired Jobs', value: data.expired },
          ]
    }

    return cardData.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6')}>
      {!loading ? renderCards() : <Skeleton className="h-[88px]" count={6} />}
    </div>
  )
}

export default memo(StatisticCards)
