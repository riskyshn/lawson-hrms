import type { ICandidate, IPaginationResponse, IVacancy } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Select } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { candidateService, vacancyService } from '@/services'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import Table from './components/Table'

const CandidateManagementPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<null | string>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [vacancies, setVacancies] = useState<IVacancy[]>([])

  const vacancy = searchParams.get('vacancy') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    params: { search, vacancy },
    pathname: '/candidates/management',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchCandidateManagement(
          {
            limit: 20,
            page: pagination.currentPage,
            q: search,
            vacancyId: vacancy,
          },
          signal,
        )
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [search, vacancy, pagination.currentPage, onChangeData])

  useEffect(() => {
    fetchVacancies()
  }, [])

  const fetchVacancies = async () => {
    try {
      const data = await vacancyService.fetchVacancies()
      setVacancies(data.content)
    } catch (error) {
      console.error('Error fetching vacancies:', error)
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const data = await candidateService.fetchCandidateManagement({
        limit: 20,
        page: pagination.currentPage,
        q: search,
        vacancyId: vacancy,
      })
      setPageData(data)
      setIsLoading(false)
    } catch (e: any) {
      if (e.message !== 'canceled') setPageError(e)
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Candidate Management' }]} title="Candidate Management" />

      <PreviewVideoResumeModal onClose={() => setPreviewVideoModalUrl(null)} url={previewVideoModalUrl} />
      <PreviewPdfResumeModal onClose={() => setPreviewPdfModalUrl(null)} url={previewPdfModalUrl} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              onDataChange={setOnChangeData}
              setPreviewPdfModalUrl={(url) => setPreviewPdfModalUrl(url)}
              setPreviewVideoModalUrl={(url) => setPreviewVideoModalUrl(url)}
            />
          }
          footer={pagination.render()}
          header={(open, toggleOpen) => (
            <MainCardHeader
              filter={
                open && (
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <Select
                      className="mb-3"
                      onChange={(e) => {
                        searchParams.set('vacancy', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={vacancies.map((vacancy) => ({ label: vacancy.vacancyName, value: vacancy.oid }))}
                      placeholder="Select Vacancy"
                      value={vacancy}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              onRefresh={handleRefresh}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Candidate</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Candidate List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default CandidateManagementPage
