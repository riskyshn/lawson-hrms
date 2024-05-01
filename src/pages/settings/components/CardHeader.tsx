import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

type PropType = {
  name: string
  onRefresh?: () => void
  total?: number
}

const CardHeader: React.FC<PropType> = ({ name, onRefresh, total }) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const loading = typeof total !== 'number'

  return (
    <MainCardHeader
      onRefresh={onRefresh}
      search={{
        setValue: (e) => {
          searchParams.set('search', e)
          searchParams.delete('page')
          setSearchParam(searchParams)
        },
        value: search || '',
      }}
      subtitle={
        <>
          <span className="text-primary-600">
            {total || 0} total {name}
          </span>{' '}
          in this list
        </>
      }
      subtitleLoading={loading}
      title={`${name} List`}
    />
  )
}

export default CardHeader
