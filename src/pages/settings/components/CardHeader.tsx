import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

type PropType = {
  name: string
  total?: number
}

const CardHeader: React.FC<PropType> = ({ name, total }) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
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
      search={{
        value: search || '',
        setValue: (e) => {
          searchParams.set('search', e)
          searchParams.delete('page')
          setSearchParam(searchParams)
        },
      }}
    />
  )
}

export default CardHeader
