import { useEffect, useState } from 'react'
import { AsyncSelect as BaseAsyncSelect, AsyncSelectProps, OptionProps } from 'jobseeker-ui'

interface PropTypes extends Omit<AsyncSelectProps, 'options' | 'message' | 'search'> {
  fetcher: (...data: any[]) => Promise<any>
  converter: (response: any) => OptionProps[]
  fetcherParams?: Record<string, string>
  searchMinCharacter?: number
  hideSearch?: boolean
}

const AsyncSelect: React.FC<PropTypes> = ({ fetcher, converter, fetcherParams, searchMinCharacter = 3, hideSearch = false, ...props }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<OptionProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hideSearch) return

    const fetchData = async (search: string, signal: AbortSignal) => {
      setLoading(true)
      try {
        const { content } = await fetcher({ size: 20, page: 0, ...fetcherParams, q: search }, signal)
        setResults(converter(content))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    const controller = new AbortController()
    const signal = controller.signal

    if (search.trim().length >= searchMinCharacter) {
      fetchData(search, signal)
    }

    return () => {
      controller.abort()
    }
  }, [hideSearch, search, searchMinCharacter, fetcher, converter, fetcherParams])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const { content } = await fetcher({ size: 20, page: 0, ...fetcherParams })
        setResults(converter(content))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    if (hideSearch) {
      fetchData()
    }
  }, [hideSearch, fetcher, converter, fetcherParams])

  const getMessage = () => {
    if (loading) {
      return 'Loading...'
    }

    if (search.trim().length > searchMinCharacter && results.length === 0) {
      return `No results found for "${search.trim()}"`
    }

    if (search.trim().length <= searchMinCharacter) {
      return `Please enter at least ${searchMinCharacter} characters to start searching.`
    }

    return ''
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
