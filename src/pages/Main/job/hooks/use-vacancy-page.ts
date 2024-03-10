import { vacancyService } from '@/services'
import { IVacancy } from '@/types/vacancy'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function useVacancyPage() {
  const { vacancyId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [vacancy, setVacancy] = useState<IVacancy>()

  const navigate = useNavigate()

  useEffect(() => {
    const load = async (vacancyId: string) => {
      setErrorMessage('')
      setIsLoading(true)
      try {
        const vacancy = await vacancyService.fetchVacancyDetail(vacancyId)
        setVacancy(vacancy)
      } catch (e: any) {
        if (e.response?.status === 404) {
          navigate('/404')
        } else {
          setErrorMessage(e.response?.data?.meta?.message || e.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (vacancyId) {
      setIsLoading(true)
      load(vacancyId)
    } else {
      navigate('/404')
    }
  }, [vacancyId, navigate])

  return { vacancyId, isLoading, errorMessage, vacancy }
}
