import React from 'react'
import { Button, Card, CardBody } from '@jshrms/ui'

const HistoryItem: React.FC<{
  children?: React.ReactNode
  onDetailToggleClick?: () => void
  showDetail?: boolean
  status?: React.ReactNode
  subTitle?: React.ReactNode
  title: React.ReactNode
}> = ({ children, onDetailToggleClick, showDetail, status, subTitle, title }) => {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="flex gap-3 font-semibold">{title}</h3>
          {subTitle && <p className="mb-2 text-xs text-gray-500">{subTitle}</p>}
          {onDetailToggleClick && (
            <Button className="text-xs" color="default" onClick={onDetailToggleClick} size="small" type="button" variant="light">
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
