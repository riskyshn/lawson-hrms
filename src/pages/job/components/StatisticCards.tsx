import { vacancyService } from '@/services'
import { Skeleton } from 'jobseeker-ui'
import React, { memo, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const Card: React.FC<{ label: string; value: number | string }> = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border bg-white px-3 py-4 text-center">
    <span className="mb-2 block text-2xl font-semibold">{value}</span>
    <span className="block text-xs">{label}</span>
  </div>
)

const StatisticCards: React.FC<{ isRequisition?: boolean }> = ({ isRequisition }) => {
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
  }, [isRequisition])

  const renderCards = () => {
    if (error) {
      return Array.from(Array(isRequisition ? 5 : 6)).map((_, i) => <Card key={i} label="Failed to load Data" value="Error" />)
    }
    if (!data) return null

    const cardData = isRequisition
      ? [
          { label: 'Total Requisition Posted', value: data.published },
          { label: 'Approved Requisition', value: data.approved },
          { label: 'Waiting for Approval', value: data.progress },
          { label: 'Requisition Rejected', value: data.rejected },
          { label: 'Draft', value: data.draft },
        ]
      : [
          { label: 'Total Job Posted', value: data.all },
          { label: 'Active Jobs', value: data.active },
          { label: 'Inactive Jobs', value: data.inactive },
          { label: 'Fulfilled Jobs', value: data.fulfilled },
          { label: 'Draft Jobs', value: data.draft },
          { label: 'Expired Jobs', value: data.expired },
        ]

    return cardData.map((rest, index) => <Card key={index} {...rest} />)
  }

  return (
    <div className={twJoin('grid gap-3', isRequisition ? 'grid-cols-1 md:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6')}>
      {renderCards()}
      {loading && <Skeleton className="h-[90px]" count={isRequisition ? 5 : 6} />}
    </div>
  )
}

export default memo(StatisticCards)
