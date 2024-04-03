import { employeeService } from '@/services'
import { BaseInput, Spinner, useInfiniteScroll } from 'jobseeker-ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import EmployeeItem from './EmployeeItem'

type PropTypes = {
  onValueChange?: (value: string[]) => void
  className?: string
  candidate?: IDataTableEmployee
}

const SelectEmployees: React.FC<PropTypes> = ({ onValueChange, className, candidate }) => {
  const [selected, setSelected] = useState<IDataTableEmployee[]>([])
  const [items, setItems] = useState<IDataTableEmployee[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [error, setError] = useState<any>()
  const [search, setSearch] = useState('')

  const [show, setShow] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const loadMore = async (signal?: AbortSignal, overridePage?: number) => {
    setLoading(true)
    try {
      const { content } = await employeeService.fetchEmployees({ page: overridePage || page, limit: 15, q: search || undefined }, signal)
      setItems((prev) => [...prev, ...content])
      setPage((prevPage) => prevPage + 1)
      setHasNextPage(content.length > 0)
    } catch (error: any) {
      if (error.message !== 'canceled') setError(error)
    } finally {
      setLoading(false)
    }
  }

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 20px 0px',
  })

  const selectedEmails = useMemo(() => selected.map(({ email }) => email), [selected])

  const handleItemClick = (item: IDataTableEmployee) => {
    if (selectedEmails.includes(item.email)) {
      setSelected((prevSelected) => prevSelected.filter((selectedItem) => selectedItem.email !== item.email))
    } else {
      setSelected((prevSelected) => [...prevSelected, item])
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setPage(1)
    setHasNextPage(true)
    setItems([])
    loadMore(controller.signal, 1)
    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    onValueChange?.(selectedEmails.filter((el) => el) as string[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmails])

  return (
    <>
      <div className={twJoin('relative', className)} ref={dropdownRef} onClick={() => setShow(true)}>
        <BaseInput placeholder="Search employee here..." value={search} onChange={(v) => setSearch(v.target.value)} />
        {loading && <Spinner className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-600" />}

        {show && (
          <div
            className="absolute left-0 right-0  top-full z-10 mt-px overflow-hidden rounded-lg border bg-white shadow-lg"
            onBlur={() => setShow(false)}
          >
            <ul ref={rootRef} className="chrome-scrollbar flex h-64 flex-col divide-y  overflow-y-auto p-3">
              {items.map((item, i) => (
                <EmployeeItem key={i} item={item} selected={selectedEmails.includes(item.email)} onClick={handleItemClick} />
              ))}
              <li className="flex flex-1 items-center justify-center py-8">
                {loading && <Spinner className="block h-10 w-10 text-primary-600" />}
                {!hasNextPage && page > 1 && <p>No more employees to load</p>}
                {!hasNextPage && page == 1 && <p>No employees to show</p>}
                {hasNextPage && <div ref={infiniteRef} className="block h-px" />}
              </li>
            </ul>
          </div>
        )}
      </div>

      <ul className="flex flex-col divide-y">
        {candidate && <EmployeeItem item={candidate} isCandidate />}
        {selected.map((item, i) => (
          <EmployeeItem key={i} item={item} onRemove={handleItemClick} />
        ))}
      </ul>
    </>
  )
}

export default SelectEmployees
