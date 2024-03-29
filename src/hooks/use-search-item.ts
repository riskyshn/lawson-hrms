import { useMemo } from 'react'

export default function useSearchItem<T = Record<string, any>>(search: string, items: T[], key: keyof T) {
  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase().replace(/\s+/g, '')

    const filter = (data: T) => {
      const itemValue = (data[key]?.toString() || '').toLowerCase().replace(/\s+/g, '')
      return itemValue.includes(normalizedSearch)
    }

    return search ? items.filter(filter) : items
  }, [items, search, key])

  return filtered
}
