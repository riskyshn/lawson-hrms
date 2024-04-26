import type { OptionProps } from 'jobseeker-ui'

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useOptionSearchParam(key: string) {
  const [searchParams, setSearchParam] = useSearchParams()

  const rawValue = searchParams.get(key) || ''

  let parsedValue: OptionProps | undefined

  if (rawValue) {
    parsedValue = {
      value: rawValue.split('|')[0],
      label: rawValue.split('|')[1],
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

  const setValue = (value?: OptionProps) => {
    if (value?.value) {
      const newValue = value.label ? `${value.value}|${value.label}` : value.value
      searchParams.set(key, newValue)
    } else {
      searchParams.delete(key)
    }
    setSearchParam(searchParams)
  }

  return [parsedValue, setValue, rawValue] as const
}
