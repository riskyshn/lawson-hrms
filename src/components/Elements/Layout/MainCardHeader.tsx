import { Button, Input, Skeleton } from 'jobseeker-ui'
import { FilterIcon, RefreshCcwIcon, SearchIcon } from 'lucide-react'
import React from 'react'

type PropTypes = {
  actions?: React.ReactNode
  filter?: React.ReactNode
  filterToogle?: () => void
  onRefresh?: () => void
  search?: {
    setValue: (value: string) => void
    value: string
  }
  subtitle?: React.ReactNode
  subtitleLoading?: boolean
  title: React.ReactNode
}

const MainCardHeader: React.FC<PropTypes> = ({ actions, filter, filterToogle, onRefresh, search, subtitle, subtitleLoading, title }) => {
  return (
    <>
      <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="block text-lg font-semibold">{title}</span>
          {subtitle && subtitleLoading && <Skeleton className="h-5 w-36" />}
          {subtitle && !subtitleLoading && <span className="block text-sm">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {onRefresh && (
            <Button className="border-gray-300" iconOnly onClick={onRefresh} title="Refresh Data Table" type="button" variant="outline">
              <RefreshCcwIcon size={16} />
            </Button>
          )}
          {search && (
            <Input
              className="m-0 mt-1 w-full lg:w-64"
              inputClassName="peer pl-7"
              onChange={(e) => search.setValue(e.currentTarget.value)}
              placeholder="Search..."
              rightChild={
                <SearchIcon
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                  size={16}
                />
              }
              type="text"
              value={search.value}
            />
          )}
          {filterToogle && (
            <Button color="primary" iconOnly onClick={filterToogle} type="button">
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
