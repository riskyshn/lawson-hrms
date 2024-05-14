import type { IDataTableEmployee } from '@/types'
import React from 'react'
import { Avatar } from '@jshrms/ui'

type PropType = {
  item: IDataTableEmployee
  onClick?: (oid: string) => void
}

const EmployeeItem: React.FC<PropType> = ({ item, onClick }) => {
  return (
    <li className="flex cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-primary-50" onClick={() => onClick?.(item.oid)}>
      <Avatar className="bg-gray-100 text-primary-600" name={item.name || ''} size={38} />
      <div className="flex-1">
        <span className="block text-sm font-semibold">{item.name}</span>
        <span className="block text-xs text-gray-500">
          {item.employeeCode || '-'} | {item.position?.name}
        </span>
      </div>
    </li>
  )
}

export default EmployeeItem
