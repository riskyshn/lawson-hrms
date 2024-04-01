import { Button, CardBody, CardFooter, Input, Modal, ModalHeader, Spinner } from 'jobseeker-ui'
import { SearchIcon } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import EmployeeItem from './EmployeeItem'
import useSearchItem from '@/hooks/use-search-item'

type PropTypes = {
  show: boolean
  onClose: () => void
  employees: IDataTableEmployee[] | undefined
}

const SelectEmployeeModal: React.FC<PropTypes> = ({ show, onClose, employees }) => {
  const [selected, setSelected] = useState<string[]>([])

  const [search, setSearch] = useState({
    selected: '',
    unselected: '',
  })

  const handleSelect = useCallback((oid: string) => {
    setSelected((prevSelected) => [...prevSelected, oid])
  }, [])

  const handleUnselect = useCallback((oid: string) => {
    setSelected((prevSelected) => prevSelected.filter((id) => id !== oid))
  }, [])

  const data = useMemo(
    () => ({
      selected: (selected.map((oid) => employees?.find((e) => e.oid === oid)) as IDataTableEmployee[]) || [],
      unselected: employees?.filter(({ oid }) => !selected.includes(oid)) || [],
    }),
    [employees, selected],
  )

  const filteredSelected = useSearchItem<IDataTableEmployee>(search.selected, data.selected, 'name')
  const filteredUnselected = useSearchItem<IDataTableEmployee>(search.unselected, data.unselected, 'name')

  return (
    <Modal show={!!show}>
      <ModalHeader className="font-semibold" onClose={() => onClose()}>
        Select Employee(s)
      </ModalHeader>
      <CardBody className="grid grid-cols-2 gap-px bg-gray-200 p-0">
        <div className="flex max-h-[400px] flex-col overflow-y-auto bg-white">
          {!employees && (
            <div className="flex flex-1 items-center justify-center py-10">
              <Spinner className="h-10 w-10 text-primary-600" />
            </div>
          )}
          {employees && (
            <>
              <div className="flex items-center justify-between p-3">
                <span className="block text-sm font-semibold">View {employees.length} total employees</span>
                <button
                  className="block text-sm text-primary-600 disabled:text-gray-400"
                  disabled={!data.unselected.length}
                  onClick={() => setSelected(employees.map((el) => el.oid))}
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

              <ul className="flex flex-col divide-y border-t">
                {filteredUnselected.map((el) => (
                  <EmployeeItem key={el.oid} item={el} onClick={handleSelect} />
                ))}
              </ul>

              {!data.unselected.length && (
                <div className="py-6 text-center">
                  <span className="mb-2 block text-xl">No available employees</span>
                  <span className="block text-xs">Please select an employee from the list below.</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex max-h-[400px] flex-col overflow-y-auto bg-white">
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

          <ul className="flex flex-col divide-y border-t">
            {filteredSelected.map((el) => (
              <EmployeeItem key={el.oid} item={el} onClick={handleUnselect} />
            ))}
          </ul>

          {!data.selected.length && (
            <div className="py-6 text-center">
              <span className="mb-2 block text-xl">No selected employees</span>
              <span className="block text-xs">You haven't selected any employees yet.</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <Button type="button" color="primary">
          Submit
        </Button>
      </CardFooter>
    </Modal>
  )
}

export default SelectEmployeeModal
