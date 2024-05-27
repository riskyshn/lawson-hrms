import type { IApplicantDataTable, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AsyncSelect, Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { useOptionSearchParam, usePagination } from '@/hooks'
import { candidateService, masterService, vacancyService } from '@/services'
import { emmbedToOptions } from '@/utils'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<null | string>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<null | string>(null)

  const [searchParams, setSearchParam] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [pageData, setPageData] = useState<IPaginationResponse<IApplicantDataTable>>()
  const [pageError, setPageError] = useState<any>()
  const [onChangeData, setOnChangeData] = useState<string>()

  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [province, setProvince, rawProvince] = useOptionSearchParam('province')
  const [education, setEducation, rawEducation] = useOptionSearchParam('education')

  const pagination = usePagination({
    params: { education: rawEducation, province: rawProvince, search, vacancy: rawVacancy },
    pathname: '/candidates/shortlisted',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchShortlist(
          {
            education: education?.value,
            limit: 20,
            page: pagination.currentPage,
            province: province?.value,
            q: search,
            vacancyId: vacancy?.value,
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
  }, [search, vacancy?.value, education?.value, province?.value, pagination.currentPage, onChangeData])

  const handleRefresh = async () => {
    setIsLoading(true)

    try {
      const data = await candidateService.fetchShortlist({
        education: education?.value,
        limit: 20,
        page: pagination.currentPage,
        province: province?.value,
        q: search,
        vacancyId: vacancy?.value,
      })

      setPageData(data)
      setIsLoading(false)
    } catch (error) {
      setPageError(error)
      setIsLoading(false)
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Shortlisted' }]} title="Candidate Shortlisted" />

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
                  <div className="grid grid-cols-3 gap-3 p-3">
                    <AsyncSelect
                      action={vacancyService.fetchVacancies}
                      className="mb-2"
                      converter={(data) => data.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
                      onValueChange={setVacancy}
                      placeholder="Select Vacancy"
                      value={vacancy}
                      withReset
                    />
                    <AsyncSelect
                      action={masterService.fetchProvinces}
                      className="mb-2"
                      converter={emmbedToOptions}
                      disableInfiniteScroll
                      onValueChange={setProvince}
                      params={{ country: 'Indonesia' }}
                      placeholder="Province"
                      value={province}
                      withReset
                    />
                    <AsyncSelect
                      action={masterService.fetchEducationLevel}
                      className="mb-2"
                      converter={emmbedToOptions}
                      disableInfiniteScroll
                      onValueChange={setEducation}
                      placeholder="All Education"
                      value={education}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              onRefresh={handleRefresh}
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
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

Component.displayName = 'CandidateShortlistedPage'
