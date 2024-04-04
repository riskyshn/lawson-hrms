import useSearchItem from '@/hooks/use-search-item'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, Input, useToast } from 'jobseeker-ui'
import { SearchIcon, XIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EmployeeItem from './EmployeeItem'
import SideModal from './SideModal'
import SubmitModal from './SubmitModal'

type PropTypes = {
  type: 'BENEFIT' | 'DEDUCTION'
  item?: IBenefitComponent | IDeductionComponent | null
  onClose?: () => void
  onSubmited?: () => void
}

const ApplyToModal: React.FC<PropTypes> = ({ type, item, onClose, onSubmited }) => {
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState({ selected: '', unselected: '' })
  const [submit, setSubmit] = useState(false)

  const [size, setSize] = useState({ l: 0, r: 0 })

  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const searchLWrapperRef = useRef<HTMLDivElement>(null)
  const searchRWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!item) return

    const updateSizes = () => {
      const headerHeight = headerRef.current?.getBoundingClientRect().height || 0
      const searchLWrapperHeight = searchLWrapperRef.current?.getBoundingClientRect().height || 0
      const searchRWrapperHeight = searchRWrapperRef.current?.getBoundingClientRect().height || 0
      const footerHeight = footerRef.current?.getBoundingClientRect().height || 0

      const l = window.innerHeight - (headerHeight + searchLWrapperHeight + footerHeight)
      const r = window.innerHeight - (headerHeight + searchRWrapperHeight + footerHeight)
      setSize({ l, r })
    }

    let resizeTimeout = setTimeout(updateSizes, 200)
    const handleResize = () => {
      console.log('resize')
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateSizes, 200)
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [headerRef, searchLWrapperRef, searchRWrapperRef, footerRef, employees, item])

  const toast = useToast()
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
        onClose?.()
      }
    }

    if (!employees) loadEmployees()
  }, [employees, item, onClose, toast])

  const handleSelect = useCallback((oid: string) => setSelected((prevSelected) => [...prevSelected, oid]), [])

  const handleUnselect = useCallback((oid: string) => setSelected((prevSelected) => prevSelected.filter((el) => el !== oid)), [])

  const data = useMemo(() => {
    const selectedSet = new Set(selected)
    const selectedEmployees = employees?.filter((e) => selectedSet.has(e.oid)) || []
    const unselectedEmployees = employees?.filter((e) => !selectedSet.has(e.oid)) || []

    return { selected: selectedEmployees, unselected: unselectedEmployees }
  }, [employees, selected])

  const filteredSelected = useSearchItem<IDataTableEmployee>(search.selected, data.selected, 'name')
  const filteredUnselected = useSearchItem<IDataTableEmployee>(search.unselected, data.unselected, 'name')

  const handleClose = () => {
    setSubmit(false)
    onClose?.()
    setTimeout(() => {
      setSelected([])
      setSearch({ selected: '', unselected: '' })
    }, 200)
  }

  return (
    <>
      <SubmitModal
        type={type}
        item={item}
        show={submit}
        payload={selected}
        onClose={() => setSubmit(false)}
        onSubmited={() => {
          handleClose()
          onSubmited?.()
        }}
      />
      <SideModal show={!!item} className="max-h-full">
        <div ref={headerRef} className="flex items-center justify-between border-b bg-white p-3">
          <h3 className="block text-lg font-semibold">Select Employees</h3>
          <Button iconOnly color="error" variant="light" onClick={handleClose}>
            <XIcon size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-px">
          <div className="flex flex-col bg-white">
            <div ref={searchLWrapperRef}>
              <div className="flex items-center justify-between p-3">
                <span className="block text-sm font-semibold">
                  View {(employees?.length || 0) - selected.length} of {employees?.length} total employees
                </span>
                <button
                  className="block text-sm text-primary-600 disabled:text-gray-400"
                  disabled={!data.unselected.length}
                  onClick={() => setSelected(employees?.map((el) => el.oid) || [])}
                >
                  Select All
                </button>
              </div>
              <div className="px-3 pb-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="peer m-0"
                  inputClassName="peer pl-7"
                  rightChild={
                    <SearchIcon
                      className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                      size={16}
                    />
                  }
                  value={search.unselected}
                  onChange={(e) => setSearch(({ selected }) => ({ selected, unselected: e.target.value }))}
                />
              </div>
            </div>

            <ul className="chrome-scrollbar flex flex-col divide-y overflow-y-auto border-t" style={{ height: size.l }}>
              {filteredUnselected.map((el) => (
                <EmployeeItem key={el.oid} item={el} onClick={handleSelect} />
              ))}

              {!filteredUnselected.length && (
                <li className="flex flex-1 flex-col items-center justify-center py-6 text-center">
                  <span className="mb-2 block text-xl">No available employees</span>
                  <span className="block text-xs">Please refine your search criteria.</span>
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-col bg-white">
            <div ref={searchRWrapperRef}>
              <div className="flex items-center justify-between p-3">
                <span className="block text-sm font-semibold">{selected.length} employee(s) selected</span>
                <button
                  className="block text-sm text-error-600 disabled:text-gray-400"
                  disabled={!data.selected.length}
                  onClick={() => setSelected([])}
                >
                  Clear Selected
                </button>
              </div>
              <div className="px-3 pb-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="peer m-0"
                  inputClassName="peer pl-7"
                  rightChild={
                    <SearchIcon
                      className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                      size={16}
                    />
                  }
                  value={search.selected}
                  onChange={(e) => setSearch(({ unselected }) => ({ unselected, selected: e.target.value }))}
                />
              </div>
            </div>
            <ul className="chrome-scrollbar flex flex-col divide-y overflow-y-auto border-t" style={{ height: size.r }}>
              {filteredSelected.map((el) => (
                <EmployeeItem key={el.oid} item={el} onClick={handleUnselect} />
              ))}

              {!filteredSelected.length && (
                <li className="flex flex-1 flex-col items-center justify-center py-6 text-center">
                  <span className="mb-2 block text-xl">No selected employees</span>
                  <span className="block text-xs">You haven't selected any employees yet.</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div ref={footerRef} className="mt-auto flex justify-end gap-3 border-t bg-white p-3">
          <Button type="button" className="min-w-24" color="error" variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" className="min-w-24" color="primary" onClick={() => setSubmit(true)}>
            Submit
          </Button>
        </div>
      </SideModal>
    </>
  )
}

export default ApplyToModal
