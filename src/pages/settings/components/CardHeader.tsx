import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import React from 'react'

type PropType = {
  name: string
  total?: number
}

const CardHeader: React.FC<PropType> = ({ name, total }) => {
  const loading = typeof total !== 'number'

  return (
    <MainCardHeader
      title={`${name} List`}
      subtitleLoading={loading}
      subtitle={
        <>
          <span className="text-primary-600">
            {total || 0} total {name}
          </span>{' '}
          in this list
        </>
      }
    />
  )
}

export default CardHeader
