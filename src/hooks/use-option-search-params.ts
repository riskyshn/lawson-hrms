import type { OptionProps } from 'jobseeker-ui'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useOptionSearchParam(key: string) {
  const [searchParams, setSearchParam] = useSearchParams()

  const rawValue = searchParams.get(key) || ''

  let parsedValue: OptionProps | undefined

  if (rawValue) {
    parsedValue = {
      label: rawValue.split('|')[1],
      value: rawValue.split('|')[0],
    }
  }

  useEffect(() => {
    if (parsedValue) {
      const newValue = parsedValue.label ? `${parsedValue.value}|${parsedValue.label}` : parsedValue.value
      searchParams.set(key, newValue)
    } else {
      searchParams.delete(key)
    }
    setSearchParam(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setValue = (value?: OptionProps | string) => {
    if (typeof value === 'string') {
      if (value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    } else if (value?.value) {
      searchParams.set(key, value.label ? `${value.value}|${value.label}` : value.value)
    } else {
      searchParams.delete(key)
    }
    setSearchParam(searchParams)
  }

  return [parsedValue, setValue, rawValue] as const
}
