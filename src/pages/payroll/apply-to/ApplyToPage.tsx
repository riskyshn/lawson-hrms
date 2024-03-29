import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { employeeService } from '@/services'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from 'jobseeker-ui'
import { SearchIcon } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import EmployeeItem from './components/EmployeeItem'

const ApplyToPage: React.FC = () => {
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const [selected, setSelected] = useState<string[]>([])
  const [pageError, setPageError] = useState<any>()

  const [search, setSearch] = useState({
    selected: '',
    unselected: '',
  })

  useEffect(() => {
    const load = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (error) {
        setPageError(error)
      }
    }

    load()
  }, [])

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

  const filteredSelected = useMemo(() => {
    const filter = (search: string, data: IDataTableEmployee) => {
      return (data.name?.toLowerCase() || '').replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, ''))
    }
    return search.selected ? data.selected.filter((data) => filter(search.selected, data)) : data.selected
  }, [data.selected, search.selected])

  const filteredUnselected = useMemo(() => {
    const filter = (search: string, data: IDataTableEmployee) => {
      return (data.name?.toLowerCase() || '').replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, ''))
    }
    return search.unselected ? data.unselected.filter((data) => filter(search.unselected, data)) : data.unselected
  }, [data.unselected, search.unselected])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Payroll' }, { text: 'Apply To' }]} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card>
          <CardHeader className="font-semibold">Select Employee(s)</CardHeader>
          <CardBody className="grid grid-cols-2 gap-px bg-gray-200 p-0">
            <div className="bg-white">
              {!employees && (
                <div className="flex items-center justify-center py-10">
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
            <div className="bg-white">
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
        </Card>
      </Container>
    </>
  )
}

export default ApplyToPage
