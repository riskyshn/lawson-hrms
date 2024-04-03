import { Button, Card, CardBody } from 'jobseeker-ui'
import React from 'react'

const HistoryItem: React.FC<{
  title: React.ReactNode
  subTitle?: React.ReactNode
  status?: React.ReactNode
  showDetail?: boolean
  onDetailToggleClick?: () => void
  children?: React.ReactNode
}> = ({ title, subTitle, status, showDetail, onDetailToggleClick, children }) => {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="flex gap-3 font-semibold">{title}</h3>
          {subTitle && <p className="mb-2 text-xs text-gray-500">{subTitle}</p>}
          {onDetailToggleClick && (
            <Button type="button" size="small" color="default" variant="light" className="text-xs" onClick={onDetailToggleClick}>
              {showDetail ? 'Hide Details' : 'Show Details'}
            </Button>
          )}
        </div>
        {status}
      </div>

      {showDetail && (
        <Card className="mt-4 px-2 py-4">
          <CardBody>{children}</CardBody>
        </Card>
      )}
    </>
  )
}

export default HistoryItem
