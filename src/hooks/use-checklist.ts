import { useState } from 'react'

export const useChecklist = (itemIds: string[]) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const toggleCheckAll = (shouldCheckAll: boolean) => {
    if (shouldCheckAll) {
      setCheckedItems((prevCheckedItems) => [...new Set([...prevCheckedItems, ...itemIds])])
    } else {
      setCheckedItems((prevCheckedItems) => prevCheckedItems.filter((id) => !itemIds.includes(id)))
    }
  }

  const areAllChecked = itemIds.every((itemId) => checkedItems.includes(itemId))

  return { areAllChecked, checkedItems, setCheckedItems, toggleCheckAll }
}
