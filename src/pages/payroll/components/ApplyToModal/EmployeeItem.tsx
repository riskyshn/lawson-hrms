import { Avatar, Skeleton } from 'jobseeker-ui'
import React from 'react'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  item: IDataTableEmployee
  selected?: boolean
  onClick?: (item: IDataTableEmployee) => void
}

const EmployeeItem: React.FC<PropTypes> = ({ item, selected, onClick }) => {
  return (
    <li
      className={twJoin('flex justify-center gap-3 p-3', onClick && 'cursor-pointer', selected ? 'bg-primary-50' : 'bg-white')}
      onClick={() => onClick?.(item)}
    >
      <Avatar name={item.name || ''} size={32} className="bg-primary-100 text-xs text-primary-600" />
      <div className="flex-1">
        <span className="block text-sm text-gray-700">{item.name}</span>
        <span className="block text-xs text-gray-500">
          {item.employeeCode} - {item.position?.name}
        </span>
      </div>
    </li>
  )
}

export const EmployeeItemSkeleton: React.FC = () => {
  return (
    <div className="flex justify-center gap-3 bg-white p-3">
      <Skeleton className="h-8 w-8" />
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}

export default EmployeeItem
