import { employeeService } from '@/services'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function useEmployeePage() {
  const { employeeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState<any>()
  const [employee, setEmployee] = useState<IEmployee>()

  const navigate = useNavigate()

  useEffect(() => {
    const load = async (employeeId: string) => {
      setPageError(undefined)
      setIsLoading(true)
      try {
        const employee = await employeeService.fetchEmployee(employeeId)
        setEmployee(employee)
        setIsLoading(false)
      } catch (e: any) {
        setPageError(e)
      }
    }

    if (employeeId) {
      load(employeeId)
    } else {
      navigate('/404')
    }
  }, [employeeId, navigate])

  if (pageError) throw pageError

  return { employeeId, isLoading, employee }
}
