import type { IDataTableEmployee } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Input, useSearchItem } from 'jobseeker-ui'
import { SearchIcon } from 'lucide-react'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import ClearToggle from './ClearToggle'
import EmployeeItem from './EmployeeItem'

type PropTypes = {
  employees?: IDataTableEmployee[]
  selected: string[]

  setSelected: (selected: string[]) => void
}

const EmployeeSelector: React.FC<PropTypes> = ({ employees: dataEmployees, selected, setSelected }) => {
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
      <Alert className="text-center" color="error">
        {errorMessage}
      </Alert>
    )
  }

  if (!employees) return <LoadingScreen className="h-full" show />

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
              className="peer m-0"
              inputClassName="peer pl-7"
              onChange={(e) => setSearch(({ selected }) => ({ selected, unselected: e.target.value }))}
              placeholder="Search..."
              rightChild={
                <SearchIcon
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                  size={16}
                />
              }
              type="text"
              value={search.unselected}
            />
          </div>
        </div>

        <ul className="flex flex-col divide-y overflow-y-auto border-t">
          {filteredUnselected.map((el) => (
            <EmployeeItem item={el} key={el.oid} onClick={handleSelect} />
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
              className="peer m-0"
              inputClassName="peer pl-7"
              onChange={(e) => setSearch(({ unselected }) => ({ selected: e.target.value, unselected }))}
              placeholder="Search..."
              rightChild={
                <SearchIcon
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                  size={16}
                />
              }
              type="text"
              value={search.selected}
            />
          </div>
        </div>
        <ul className="flex flex-col divide-y overflow-y-auto border-t">
          {filteredSelected.map((el) => (
            <EmployeeItem item={el} key={el.oid} onClick={handleUnselect} />
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
