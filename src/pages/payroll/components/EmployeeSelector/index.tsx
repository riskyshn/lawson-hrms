import useSearchItem from '@/hooks/use-search-item'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Alert, Input } from 'jobseeker-ui'
import { SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ClearToggle from './ClearToggle'
import EmployeeItem from './EmployeeItem'
import LoadingScreen from '@/components/Elements/LoadingScreen'

type PropTypes = {
  selected: string[]
  setSelected: (selected: string[]) => void

  employees?: IDataTableEmployee[]
}

const EmployeeSelector: React.FC<PropTypes> = ({ selected, setSelected, employees: dataEmployees }) => {
  const [employees, setEmployees] = useState<IDataTableEmployee[] | undefined>(dataEmployees)
  const [search, setSearch] = useState({ selected: '', unselected: '' })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (e) {
        setErrorMessage(axiosErrorMessage(e))
      }
    }
    if (!employees) loadEmployees()
  }, [employees])

  const handleSelect = (oid: string) => setSelected([...selected, oid])
  const handleUnselect = (oid: string) => setSelected(selected.filter((el) => el !== oid))

  const data = useMemo(() => {
    const selectedSet = new Set(selected)
    const selectedEmployees = employees?.filter((e) => selectedSet.has(e.oid)) || []
    const unselectedEmployees = employees?.filter((e) => !selectedSet.has(e.oid)) || []

    return { selected: selectedEmployees, unselected: unselectedEmployees }
  }, [employees, selected])

  const filteredSelected = useSearchItem<IDataTableEmployee>(search.selected, data.selected, 'name')
  const filteredUnselected = useSearchItem<IDataTableEmployee>(search.unselected, data.unselected, 'name')

  if (errorMessage) {
    return (
      <Alert color="error" className="text-center">
        {errorMessage}
      </Alert>
    )
  }

  if (!employees) return <LoadingScreen show className="h-full" />

  return (
    <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden">
      <div className="flex h-full flex-col overflow-hidden bg-white">
        <div>
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

        <ul className="flex flex-col divide-y overflow-y-auto border-t">
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
      <div className="flex h-full flex-col overflow-hidden bg-white">
        <div>
          <div className="flex items-center justify-between p-3">
            <span className="block text-sm font-semibold">{selected.length} employee(s) selected</span>
            <ClearToggle disabled={!data.selected.length} onClear={() => setSelected([])}>
              Clear Selected
            </ClearToggle>
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
        <ul className="flex flex-col divide-y overflow-y-auto border-t">
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
  )
}

export default EmployeeSelector
