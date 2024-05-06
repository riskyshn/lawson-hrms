import React from 'react'
import { Avatar, Button } from 'jobseeker-ui'
import { CheckIcon, XIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  isCandidate?: boolean
  item: IDataTableEmployee
  onClick?: (item: IDataTableEmployee) => void
  onRemove?: (item: IDataTableEmployee) => void
  selected?: boolean
}

const EmployeeItem: React.FC<PropTypes> = ({ isCandidate, item, onClick, onRemove, selected }) => {
  return (
    <li className={twJoin('flex justify-center gap-3 py-2', onClick && 'cursor-pointer')} onClick={() => onClick?.(item)}>
      <Avatar className="bg-primary-100 text-xs text-primary-600" name={item.name || ''} size={32} />
      <div className="flex-1">
        <span className="block text-sm text-gray-700">{item.name}</span>
        <span className="block text-xs text-gray-500">{item.email}</span>
      </div>
      <div className="flex items-center justify-center">
        {isCandidate && <span className="block text-xs italic text-gray-500">Candidate</span>}
        {selected && <CheckIcon className="text-primary-600" size={20} />}
        {onRemove && (
          <Button color="error" iconOnly onClick={() => onRemove(item)} size="small" type="button" variant="light">
            <XIcon size={14} />
          </Button>
        )}
      </div>
    </li>
  )
}

export default EmployeeItem
