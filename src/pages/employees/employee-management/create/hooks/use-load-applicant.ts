import { candidateService } from '@/services'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useLoadApplicant() {
  const [searchParams] = useSearchParams()
  const applicantId = searchParams.get('applicantId') || ''

  const [isLoading, setIsLoading] = useState(!!applicantId)
  const [applicant, setApplicant] = useState<ICandidateToCreateEmployee>()
  const [pageError, setPageError] = useState<any>()

  useEffect(() => {
    const load = async (applicantId: string) => {
      setPageError(undefined)
      setIsLoading(true)
      try {
        const applicant = await candidateService.fetchCandidateToCreateEmployeeByApplicanId(applicantId)
        setApplicant(applicant)
        setIsLoading(false)
      } catch (e: any) {
        setPageError(e)
      }
    }

    if (applicantId) load(applicantId)
  }, [applicantId])

  if (pageError) throw pageError

  return { applicant, applicantId, isLoading }
}
