import type { ICandidate, IUploadedProcessDocument } from '@/types'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Container, PageHeader, Spinner } from 'jobseeker-ui'
import { twMerge } from 'tailwind-merge'
import { candidateService, processService } from '@/services'
import CandidateDetailCard from '../components/CandidateDetailCard'
import ProfileCard from '../components/ProfileCard'

const CandidateProfilePage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId?: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<ICandidate>()
  const [documentsData, setDocuments] = useState<IUploadedProcessDocument[]>()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'candidate-information'
  const [pageError, setPageError] = useState<any>()

  useEffect(() => {
    if (!candidateId) return
    const controller = new AbortController()

    const load = async () => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchCandidate(candidateId)
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load()

    return () => {
      controller.abort()
    }
  }, [candidateId])

  useEffect(() => {
    if (!candidateId) return
    const controller = new AbortController()

    const loadDocument = async () => {
      setIsLoading(true)
      try {
        const documents = await processService.getDocumentRequest(candidateId)

        setDocuments(documents)
        setIsLoading(false)
      } catch (e: any) {
        console.error('Error fetching documents:', e)
      }
    }

    loadDocument()

    return () => {
      controller.abort()
    }
  }, [candidateId])

  const breadcrumb = [{ text: 'Candidates' }, { text: 'Profile' }]
  if (pageData?.name) breadcrumb.push({ text: pageData.name })

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} />

      <Container className="grid grid-cols-1 gap-3 py-3 xl:pb-8">
        {isLoading && (
          <div className="flex items-center justify-center py-48">
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {!isLoading && pageData && (
          <>
            <ProfileCard items={pageData}>
              <div className="flex overflow-x-auto border-b border-gray-200">
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'candidate-information' && 'border-primary-600',
                  )}
                  to={`/candidates/profile/${pageData.id}`}
                >
                  Candidate Information
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'resume' && 'border-primary-600',
                  )}
                  to={`/candidates/profile/${pageData.id}?tab=resume`}
                >
                  Resume/CV
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'education' && 'border-primary-600',
                  )}
                  to={`/candidates/profile/${pageData.id}?tab=education`}
                >
                  Education
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'experience' && 'border-primary-600',
                  )}
                  to={`/candidates/profile/${pageData.id}?tab=experience`}
                >
                  Working Experience
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'document' && 'border-primary-600',
                  )}
                  to={`/candidates/profile/${pageData.id}?tab=document`}
                >
                  Documents
                </Link>
              </div>
            </ProfileCard>

            {tab === 'candidate-information' && (
              <CandidateDetailCard flag={'candidate-information'} items={pageData} title={'Personal Information'} />
            )}
            {tab === 'resume' && <CandidateDetailCard flag={'resume'} items={pageData} title={'Resume/CV'} />}
            {tab === 'education' && <CandidateDetailCard flag={'education'} items={pageData} title={'Education'} />}
            {tab === 'experience' && <CandidateDetailCard flag={'experience'} items={pageData} title={'Working Experience'} />}
            {tab === 'document' && <CandidateDetailCard documents={documentsData} flag={'document'} items={pageData} title={'Documents'} />}
          </>
        )}
      </Container>
    </>
  )
}

export default CandidateProfilePage
