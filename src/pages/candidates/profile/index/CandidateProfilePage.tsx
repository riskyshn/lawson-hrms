import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { Spinner } from 'jobseeker-ui'
import ProfileCard from '../components/ProfileCard'
import CandidateDetailCard from '../components/CandidateDetailCard'
import { useEffect, useState } from 'react'
import { candidateService, processService } from '@/services'

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
            <Spinner height={40} className="text-primary-600" />
          </div>
        )}

        {!isLoading && pageData && (
          <>
            <ProfileCard items={pageData}>
              <div className="flex border-b border-gray-200">
                <Link
                  to={`/candidates/profile/${pageData.id}`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'candidate-information' && 'border-primary-600',
                  )}
                >
                  Candidate Information
                </Link>
                <Link
                  to={`/candidates/profile/${pageData.id}?tab=resume`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'resume' && 'border-primary-600',
                  )}
                >
                  Resume/CV
                </Link>
                <Link
                  to={`/candidates/profile/${pageData.id}?tab=education`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'education' && 'border-primary-600',
                  )}
                >
                  Education
                </Link>
                <Link
                  to={`/candidates/profile/${pageData.id}?tab=experience`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'experience' && 'border-primary-600',
                  )}
                >
                  Working Experience
                </Link>
                <Link
                  to={`/candidates/profile/${pageData.id}?tab=document`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'document' && 'border-primary-600',
                  )}
                >
                  Documents
                </Link>
              </div>
            </ProfileCard>

            {tab === 'candidate-information' && (
              <CandidateDetailCard items={pageData} title={'Personal Information'} flag={'candidate-information'} />
            )}
            {tab === 'resume' && <CandidateDetailCard items={pageData} title={'Resume/CV'} flag={'resume'} />}
            {tab === 'education' && <CandidateDetailCard items={pageData} title={'Education'} flag={'education'} />}
            {tab === 'experience' && <CandidateDetailCard items={pageData} title={'Working Experience'} flag={'experience'} />}
            {tab === 'document' && <CandidateDetailCard items={pageData} documents={documentsData} title={'Documents'} flag={'document'} />}
          </>
        )}
      </Container>
    </>
  )
}

export default CandidateProfilePage
