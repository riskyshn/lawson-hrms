import type { IEmployee } from '@jshrms/shared/types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { employeeService } from '@jshrms/shared/services'

export default function useEmployeePage() {
  const { employeeCode } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState<any>()
  const [employee, setEmployee] = useState<IEmployee>()

  const navigate = useNavigate()

  useEffect(() => {
    const load = async (employeeCode: string) => {
      setPageError(undefined)
      setIsLoading(true)
      try {
        const employee = await employeeService.fetchEmployee(employeeCode)
        setEmployee(employee)
        setIsLoading(false)
      } catch (e: any) {
        setPageError(e)
      }
    }

    if (employeeCode) {
      load(employeeCode)
    } else {
      navigate('/404')
    }
  }, [employeeCode, navigate])

  if (pageError) throw pageError

  return { employee, employeeCode, isLoading }
}
