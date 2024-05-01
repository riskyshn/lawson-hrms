import { vacancyService } from '@/services'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function useVacancyPage() {
  const { vacancyId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState<any>()
  const [vacancy, setVacancy] = useState<IVacancy>()

  const navigate = useNavigate()

  useEffect(() => {
    const load = async (vacancyId: string) => {
      setPageError(undefined)
      setIsLoading(true)
      try {
        const vacancy = await vacancyService.fetchVacancyDetail(vacancyId)
        setVacancy(vacancy)
        setIsLoading(false)
      } catch (e: any) {
        setPageError(e)
      }
    }

    if (vacancyId) {
      load(vacancyId)
    } else {
      navigate('/404')
    }
  }, [vacancyId, navigate])

  if (pageError) throw pageError

  return { isLoading, vacancy, vacancyId }
}
