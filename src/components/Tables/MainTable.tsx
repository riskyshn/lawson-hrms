import React from 'react'
import { InputCheckbox, LoadingScreen } from 'jobseeker-ui'
import { InboxIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { MainTableProps } from './types'

export const MainTable: React.FC<MainTableProps> = ({
  bodyItems,
  className,
  headerItems,
  loading,

  areAllChecked,
  checkedItems,
  setCheckedItems,
  toggleCheckAll,
  ...props
}) => {
  const handleCheck = (checkItem: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked
    const updatedCheckItems = checked
      ? [...new Set([...(checkedItems || []), checkItem])]
      : [...(checkedItems || [])].filter((el) => el !== checkItem)
    setCheckedItems?.(updatedCheckItems)
  }

  return (
    <div className="flex min-h-[500px] w-full flex-col">
      {!loading && (
        <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
          <thead>
            <tr>
              {setCheckedItems && (
                <th className="w-10 border-b px-3">
                  <InputCheckbox id="check-all" checked={areAllChecked} onChange={(e) => toggleCheckAll?.(e.currentTarget.checked)} />
                </th>
              )}
              {headerItems.map(({ className, ...props }, i) => (
                <th className={twMerge('border-b p-3 text-center text-xs', className)} key={i} {...props} />
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bodyItems.map(({ children, className, items, checkItem, ...props }, i) => (
                <tr className={twMerge('odd:bg-gray-50', className)} key={i} {...props}>
                  {setCheckedItems && (
                    <td className="px-3">
                      <InputCheckbox
                        id={`checklist-${checkItem}`}
                        disabled={!checkItem}
                        checked={checkItem ? checkedItems?.includes(checkItem) : false}
                        onChange={(e) => checkItem && handleCheck(checkItem, e)}
                      />
                    </td>
                  )}
                  {items?.map(({ className, ...props }, i) => <td className={twMerge('p-3 text-sm', className)} key={i} {...props} />)}
                  {children}
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <LoadingScreen className="flex-1 p-0" show={loading} spinnerSize={80} strokeWidth={1} />

      {!loading && bodyItems.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-4 flex animate-pulse justify-center text-gray-900">
            <InboxIcon className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
          </div>
          <p className="font-ligh mx-auto max-w-lg text-center">
            This table is currently empty. You can also try adjusting or removing the filter to view data.
          </p>
        </div>
      )}
    </div>
  )
}

export default MainTable
