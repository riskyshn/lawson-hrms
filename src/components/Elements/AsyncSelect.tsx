/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { AsyncSelect as BaseAsyncSelect, AsyncSelectProps, OptionProps } from 'jobseeker-ui'

interface PropTypes extends Omit<AsyncSelectProps, 'options' | 'message' | 'search'> {
  fetcher: (...data: any[]) => Promise<any>
  converter: (response: any) => OptionProps[]
  fetcherParams?: Record<string, string>
  searchMinCharacter?: number
  hideSearch?: boolean
  initialOptions?: OptionProps[]
}

const AsyncSelect: React.FC<PropTypes> = ({
  fetcher,
  converter,
  fetcherParams,
  searchMinCharacter = 3,
  hideSearch,
  initialOptions,
  ...props
}) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<OptionProps[]>([])
  const [loading, setLoading] = useState(false)

  const stringParams = new URLSearchParams(fetcherParams).toString()
  const rFetcherParams = useMemo(() => fetcherParams, [stringParams])

  useEffect(() => {
    if (hideSearch) return

    const fetchData = async (search: string, signal: AbortSignal) => {
      setLoading(true)
      try {
        const { content } = await fetcher({ limit: 20, ...rFetcherParams, q: search || undefined }, signal)
        setResults(converter(content))
      } catch (error) {
        // console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    const controller = new AbortController()
    const signal = controller.signal

    if (search.trim().length >= searchMinCharacter) {
      fetchData(search, signal)
    } else if (results.length == 0 && initialOptions) {
      setResults(initialOptions)
    }

    return () => {
      controller.abort()
    }
  }, [hideSearch, search, searchMinCharacter, rFetcherParams])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const { content } = await fetcher({ limit: 20, ...rFetcherParams })
        setResults(converter(content))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    if (hideSearch) fetchData()
  }, [hideSearch, rFetcherParams])

  useEffect(() => {
    if (initialOptions) setResults(initialOptions)
  }, [initialOptions])

  const getMessage = () => {
    const trimmedSearch = search.trim()
    const isSearchValid = trimmedSearch.length > 0
    const isSearchTooShort = trimmedSearch.length <= searchMinCharacter
    const hasNoResults = isSearchValid && results.length === 0

    if (loading) return 'Loading...'
    if (isSearchTooShort && !hideSearch) return `Please enter at least ${searchMinCharacter} characters to start searching.`
    if (hasNoResults) return `No results found for "${trimmedSearch}"`
    return 'No results'
  }

  return (
    <BaseAsyncSelect
      {...props}
      search={hideSearch ? undefined : { value: search, onValueChange: (value) => setSearch(value) }}
      message={getMessage()}
      options={results}
    />
  )
}

export default AsyncSelect
