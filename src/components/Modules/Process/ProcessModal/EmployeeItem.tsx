import { Avatar, Button } from 'jobseeker-ui'
import { CheckIcon, XIcon } from 'lucide-react'
import React from 'react'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  item: IDataTableEmployee
  selected?: boolean
  isCandidate?: boolean
  onClick?: (item: IDataTableEmployee) => void
  onRemove?: (item: IDataTableEmployee) => void
}

const EmployeeItem: React.FC<PropTypes> = ({ item, selected, isCandidate, onClick, onRemove }) => {
  return (
    <li className={twJoin('flex justify-center gap-3 py-2', onClick && 'cursor-pointer')} onClick={() => onClick?.(item)}>
      <Avatar name={item.name || ''} size={32} className="bg-primary-100 text-xs text-primary-600" />
      <div className="flex-1">
        <span className="block text-sm text-gray-700">{item.name}</span>
        <span className="block text-xs text-gray-500">{item.email}</span>
      </div>
      <div className="flex items-center justify-center">
        {isCandidate && <span className="block text-xs italic text-gray-500">Candidate</span>}
        {selected && <CheckIcon size={20} className="text-primary-600" />}
        {onRemove && (
          <Button type="button" iconOnly color="error" size="small" variant="light" onClick={() => onRemove(item)}>
            <XIcon size={14} />
          </Button>
        )}
      </div>
    </li>
  )
}

export default EmployeeItem
