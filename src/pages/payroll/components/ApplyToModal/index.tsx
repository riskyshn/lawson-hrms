import { employeeService } from '@/services'
import { BaseInput, Button, useInfiniteScroll } from 'jobseeker-ui'
import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import ClearToggle from './ClearToggle'
import EmployeeItem, { EmployeeItemSkeleton } from './EmployeeItem'
import SideModal from './SideModal'
import SubmitModal from './SubmitModal'

type PropTypes = {
  type: 'BENEFIT' | 'DEDUCTION'
  item?: IBenefitComponent | IDeductionComponent | null
  onClose?: () => void
  onSubmited?: () => void
}

const ApplyToModal: React.FC<PropTypes> = ({ type, item, onClose, onSubmited }) => {
  const [selected, setSelected] = useState<string[]>([])
  const [selectall, setSelectall] = useState(false)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState<IDataTableEmployee[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [error, setError] = useState<any>()
  const [search, setSearch] = useState('')

  const [submit, setSubmit] = useState(false)

  const loadMore = async (signal?: AbortSignal, overridePage?: number) => {
    setLoading(true)
    try {
      const { content, totalElements } = await employeeService.fetchEmployees(
        { page: overridePage || page, limit: 30, q: search || undefined },
        signal,
      )
      setTotal(totalElements)
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

  useEffect(() => {
    const controller = new AbortController()
    setPage(1)
    setHasNextPage(true)
    setItems([])
    setSelectall(false)
    loadMore(controller.signal, 1)
    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleItemClick = (item: IDataTableEmployee) => {
    if (selected.includes(item.oid)) {
      setSelected((prev) => prev.filter((oid) => oid !== item.oid))
    } else {
      setSelected((prev) => [...prev, item.oid])
    }
  }

  const payload = selectall
    ? { ex: { ids: selected } }
    : { in: { all: selected.length === 0, ids: selected.length > 0 ? selected : undefined } }

  return (
    <SideModal show={!!item}>
      <div className="flex items-center justify-between border-b bg-white p-3">
        <h3 className="block text-lg font-semibold">Select Employees</h3>
        <Button iconOnly color="error" variant="light" onClick={onClose}>
          <XIcon size={18} />
        </Button>
      </div>
      <div className="border-b bg-white p-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <BaseInput
              type="text"
              placeholder="Search..."
              className="peer pl-7"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
              size={16}
            />
          </div>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              setSelected([])
              setSelectall(true)
            }}
          >
            Select All
          </Button>
        </div>
        {(!!selected.length || selectall) && (
          <div className="pt-3 text-sm">
            Total Selected <span className=" font-semibold text-primary-600">{selectall ? total - selected.length : selected.length}</span>
            <ClearToggle
              onClear={() => {
                setSelected([])
                setSelectall(false)
              }}
            />
          </div>
        )}
      </div>
      <ul ref={rootRef} className="grid select-none grid-cols-2 gap-px overflow-y-scroll">
        {items.map((item, index) => (
          <EmployeeItem
            key={index}
            item={item}
            selected={selectall ? !selected.includes(item.oid) : selected.includes(item.oid)}
            onClick={handleItemClick}
          />
        ))}
        <li className="col-span-2 flex flex-col">
          {loading && (
            <div className="grid flex-1 grid-cols-2 gap-px">
              {Array.from(Array(10)).map((_, index) => (
                <EmployeeItemSkeleton key={index} />
              ))}
            </div>
          )}
          <p className="flex-1 py-8 text-center text-xl empty:hidden">
            {!!error && <span className="text-error-600">{error.message}</span>}
            {!error && (
              <>
                {!hasNextPage && !loading && 'No more employees to show'}
                {!loading && !!search.length && total == 0 && (
                  <>
                    No result for "<span className="text-primary-600">{search}</span>"
                  </>
                )}
              </>
            )}
          </p>
          {!!hasNextPage && <div ref={infiniteRef} className="h-px w-full" />}
        </li>
      </ul>
      <div className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
        <SubmitModal
          type={type}
          item={submit ? item : undefined}
          payload={payload}
          onClose={() => setSubmit(false)}
          onSubmited={() => {
            setSelectall(false)
            setSearch('')
            setSelected([])
            onSubmited?.()
            onClose?.()
          }}
        />
        <Button type="button" className="min-w-24" color="error" variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" className="min-w-24" color="primary" onClick={() => setSubmit(true)}>
          Submit
        </Button>
      </div>
    </SideModal>
  )
}

export default ApplyToModal
