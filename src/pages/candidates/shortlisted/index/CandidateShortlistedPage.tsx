import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { candidateService, masterService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { AsyncSelect, useOptionSearchParam, usePagination } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import Table from './components/Table'

const CandidateShortlistedPage: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)

  const [searchParams, setSearchParam] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()
  const [onChangeData, setOnChangeData] = useState<string>()

  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [province, setProvince, rawProvince] = useOptionSearchParam('province')
  const [education, setEducation, rawEducation] = useOptionSearchParam('education')

  const pagination = usePagination({
    pathname: '/candidates/shortlisted',
    totalPage: pageData?.totalPages,
    params: { search, vacancy: rawVacancy, province: rawProvince, education: rawEducation },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchShortlist(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            education: education?.value,
            vacancyId: vacancy?.value,
            province: province?.value,
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

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Shortlisted' }]} title="Candidate Shortlisted" />

      <PreviewVideoResumeModal url={previewVideoModalUrl} onClose={() => setPreviewVideoModalUrl(null)} />
      <PreviewPdfResumeModal url={previewPdfModalUrl} onClose={() => setPreviewPdfModalUrl(null)} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Candidate List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Candidate</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (v) => setSearchParam({ search: v }),
              }}
              filterToogle={toggleOpen}
              filter={
                open && (
                  <div className="grid grid-cols-3 gap-3 p-3">
                    <AsyncSelect
                      placeholder="Select Vacancy"
                      className="mb-2"
                      withReset
                      action={vacancyService.fetchVacancies}
                      converter={(data) => data.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
                      value={vacancy}
                      onValueChange={setVacancy}
                    />
                    <AsyncSelect
                      placeholder="Province"
                      className="mb-2"
                      withReset
                      action={masterService.fetchProvinces}
                      disableInfiniteScroll
                      params={{ country: 'Indonesia' }}
                      converter={emmbedToOptions}
                      value={province}
                      onValueChange={setProvince}
                    />
                    <AsyncSelect
                      placeholder="All Education"
                      className="mb-2"
                      withReset
                      action={masterService.fetchEducationLevel}
                      disableInfiniteScroll
                      converter={emmbedToOptions}
                      value={education}
                      onValueChange={setEducation}
                    />
                  </div>
                )
              }
            />
          )}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              setPreviewVideoModalUrl={(url) => setPreviewVideoModalUrl(url)}
              setPreviewPdfModalUrl={(url) => setPreviewPdfModalUrl(url)}
              onDataChange={setOnChangeData}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default CandidateShortlistedPage
