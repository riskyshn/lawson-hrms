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

// import React, { useState } from 'react';
// import { twMerge } from 'tailwind-merge';
// import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react'; // Import icons for ascending and descending

// type PropTypes = Omit<JSX.IntrinsicElements['table'], 'children'> & {
//     headerItems: Array<JSX.IntrinsicElements['th']>;
//     bodyItems: Array<
//         Omit<JSX.IntrinsicElements['tr'], 'children'> & {
//             items: Array<JSX.IntrinsicElements['td']>;
//         }
//     >;
// };

// const MainTable: React.FC<PropTypes> = ({ className, headerItems, bodyItems, ...props }) => {
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//     const [sortedField, setSortedField] = useState<string | null>(null);

//     const handleSort = (field: string) => {
//         setSortedField(field);
//         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     };

//     const sortDate = (dateA: Date, dateB: Date) => {
//         if (sortOrder === 'asc') {
//             return dateA.getTime() - dateB.getTime();
//         } else {
//             return dateB.getTime() - dateA.getTime();
//         }
//     };

//     const sortedBodyItems = sortedField === 'Apply Date'
//         ? [...bodyItems].sort((a, b) => {
//             const dateA = new Date(a.items[2].children?.toString() ?? '');
//             const dateB = new Date(b.items[2].children?.toString() ?? '');
//             return sortDate(dateA, dateB);
//         })
//         : bodyItems;

//     return (
//         <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
//             <thead>
//                 <tr>
//                     {headerItems.map(({ children, className }, i) => (
//                         <th key={i} className={twMerge('border-b p-3 text-center text-xs', children === 'Apply Date' ? 'cursor-pointer' : '', className)} onClick={() => handleSort(children?.toString() ?? '')}>
//                             {children}
//                             {children === 'Apply Date' && (
//                                 <button onClick={() => handleSort('Apply Date')}>
//                                     {sortedField === 'Apply Date' ? (sortOrder === 'asc' ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />) : <ChevronUpIcon size={16} />}
//                                 </button>
//                             )}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {sortedBodyItems.map(({ className, items, ...props }, i) => (
//                     <tr key={i} className={twMerge(className, 'odd:bg-gray-50')} {...props}>
//                         {items.map(({ children, className }, j) => (
//                             <td key={j} className={twMerge('p-3 text-sm', className)}>{children}</td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default MainTable;
