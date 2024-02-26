import React from 'react'
import { twMerge } from 'tailwind-merge'

type PropTypes = Omit<JSX.IntrinsicElements['table'], 'children'> & {
  headerItems: Array<JSX.IntrinsicElements['th']>
  bodyItems: Array<
    Omit<JSX.IntrinsicElements['tr'], 'children'> & {
      items: Array<JSX.IntrinsicElements['td']>
    }
  >
}

const MainTable: React.FC<PropTypes> = ({ className, headerItems, bodyItems, ...props }) => {
  return (
    <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
      <thead>
        <tr>
          {headerItems.map(({ className, ...props }, i) => (
            <th key={i} className={twMerge('border-b p-3 text-center text-xs', className)} {...props} />
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyItems.map(({ className, items, ...props }, i) => (
          <tr key={i} className={twMerge(className, 'odd:bg-gray-50')} {...props}>
            {items.map(({ className, ...props }, i) => (
              <td key={i} className={twMerge('p-3 text-sm', className)} {...props} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MainTable
