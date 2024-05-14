import type { ICandidate, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AsyncSelect } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { candidateService, masterService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import Table from './components/Table'

const CandidateRejectedPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<null | string>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()

  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()

  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [province, setProvince, rawProvince] = useOptionSearchParam('province')
  const [education, setEducation, rawEducation] = useOptionSearchParam('education')

  const pagination = usePagination({
    params: { education: rawEducation, province: rawProvince, search, vacancy: rawVacancy },
    pathname: '/candidates/rejected',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchReject(
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
      const data = await candidateService.fetchReject({
        education: education?.value,
        limit: 20,
        page: pagination.currentPage,
        province: province?.value,
        q: search,
        vacancyId: vacancy?.value,
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
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Rejected' }]} title="Candidate Rejected" />

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

export default CandidateRejectedPage
