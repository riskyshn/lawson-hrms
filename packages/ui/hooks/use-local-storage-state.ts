import { useEffect, useState } from 'react'

export const useLocalStorageState = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // Retrieve the value from localStorage if it exists
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage: `, error)
      return initialValue
    }
  })

  // Update the localStorage value whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting ${key} to localStorage: `, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
