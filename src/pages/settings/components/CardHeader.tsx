import { Skeleton } from 'jobseeker-ui'
import React from 'react'

type PropType = {
  name: string
  total?: number
}

const CardHeader: React.FC<PropType> = ({ name, total }) => {
  const loading = typeof total !== 'number'

  return (
    <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <span className="block text-lg font-semibold">{name} List</span>
        {loading && <Skeleton className="h-5 w-36" />}
        {!loading && (
          <span className="block text-sm">
            <span className="text-primary-600">
              {total} total {name}
            </span>{' '}
            in this list
          </span>
        )}
      </div>
    </div>
  )
}

export default CardHeader
