import { Button, Input, Skeleton } from 'jobseeker-ui'
import { FilterIcon, SearchIcon } from 'lucide-react'
import React from 'react'

type PropTypes = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  subtitleLoading?: boolean
  search?: {
    value: string
    setValue: (value: string) => void
  }
  filter?: React.ReactNode
  filterToogle?: () => void
}

const MainCardHeader: React.FC<PropTypes> = ({ title, subtitle, subtitleLoading, search, filter, filterToogle }) => {
  return (
    <>
      <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="block text-lg font-semibold">{title}</span>
          {subtitle && subtitleLoading && <Skeleton className="h-5 w-36" />}
          {subtitle && !subtitleLoading && <span className="block text-sm">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-2">
          {search && (
            <Input
              type="text"
              placeholder="Search..."
              className="m-0 mt-1 w-full lg:w-64"
              inputClassName="peer pl-7"
              rightChild={
                <SearchIcon
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                  size={16}
                />
              }
              value={search.value}
              onChange={(e) => search.setValue(e.currentTarget.value)}
            />
          )}
          {filter && filterToogle && (
            <Button iconOnly type="button" color="primary" onClick={filterToogle}>
              <FilterIcon size={16} />
            </Button>
          )}
        </div>
      </div>

      {filter}
    </>
  )
}

export default MainCardHeader
