import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Select } from 'jobseeker-ui'
import Table from './components/Table'
import { useEffect, useState } from 'react'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import usePagination from '@/hooks/use-pagination'
import { useSearchParams } from 'react-router-dom'
import { candidateService, masterService, vacancyService } from '@/services'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import { useMasterStore } from '@/store'

const CandidateOfferedPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()

  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()
  const [vacancies, setVacancies] = useState<any[]>([])

  const vacancy = searchParams.get('vacancy') || undefined
  const province = searchParams.get('province') || undefined
  const education = searchParams.get('education') || undefined

  const { educatioLevels } = useMasterStore()

  const pagination = usePagination({
    pathname: '/candidates/offered',
    totalPage: pageData?.totalPages || 0,
    params: { search, vacancy, province, education },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchOffer(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            education: education,
            vacancyId: vacancy,
            province: province,
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
  }, [search, vacancy, education, province, pagination.currentPage, onChangeData])

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

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Offered' }]} title="Candidate Offered" />

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
                    <Select
                      placeholder="Select Vacancy"
                      withReset
                      options={vacancies.map((vacancy) => ({ value: vacancy.oid, label: vacancy.vacancyName }))}
                      className="mb-3"
                      value={vacancy}
                      onChange={(e) => {
                        searchParams.set('vacancy', e.toString())
                        setSearchParam(searchParams)
                      }}
                    />
                    <AsyncSelect
                      className="mb-2"
                      placeholder="Province"
                      withReset
                      fetcher={masterService.fetchProvinces}
                      fetcherParams={{ country: 'Indonesia' }}
                      searchMinCharacter={0}
                      converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
                      name="province"
                      value={province}
                      onChange={(v) => {
                        searchParams.set('province', v.toString())
                        setSearchParam(searchParams)
                      }}
                    />
                    <Select
                      placeholder="All Education"
                      withReset
                      value={education}
                      onChange={(e) => {
                        searchParams.set('education', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={educatioLevels.map((el) => ({ label: `${el.name}`, value: el.oid }))}
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

export default CandidateOfferedPage
