import React from 'react'
import { Avatar } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'

type PropType = {
  item: IDataTableEmployee
  disabled?: boolean
  onClick?: (oid: string) => void
}

const EmployeeItem: React.FC<PropType> = ({ item, disabled = false, onClick }) => {
  return (
    <li
      className={twJoin('flex items-center gap-3 p-3 transition-colors', disabled ? 'bg-gray-50' : 'cursor-pointer hover:bg-primary-50')}
      onClick={() => !disabled && onClick?.(item.oid)}
    >
      <Avatar name={item.name || ''} className="bg-gray-100 text-primary-600" size={40} />
      <div className="flex-1">
        <span className="block text-sm font-semibold">{item.name}</span>
        <span className="block text-xs text-gray-500">
          {item.employeeCode} | {item.position?.name}
        </span>
      </div>
    </li>
  )
}

export default EmployeeItem
