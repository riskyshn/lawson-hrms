import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { Select } from 'jobseeker-ui'
import Table from './components/Table'
import { useEffect, useState } from 'react'
import PreviewVideoResumeModal from '../../Modals/PreviewVideoResumeModal'
import PreviewPdfResumeModal from '../../Modals/PreviewPdfResumeModal'
import usePagination from '@/hooks/use-pagination'
import { candidateService } from '@/services'
import { useSearchParams } from 'react-router-dom'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import { useOrganizationStore } from '@/store'

const CandidateBlacklistedPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()

  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()
  const position = searchParams.get('position') || undefined
  const province = searchParams.get('province') || undefined
  const education = searchParams.get('education') || undefined

  const { master } = useOrganizationStore()

  const pagination = usePagination({
    pathname: '/candidates/blacklisted',
    totalPage: pageData?.totalPages || 0,
    params: { search, position, province, education },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchBlacklist(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            education: education,
            position: position,
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
  }, [search, position, education, province, pagination.currentPage, onChangeData])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Blacklist' }]} title="Candidate Blacklist" />

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
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <Select
                      placeholder="All Position"
                      withReset
                      value={position}
                      onChange={(e) => {
                        searchParams.set('position', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={master.positions.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
                    {/* <AsyncSelect
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
                    /> */}
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

export default CandidateBlacklistedPage
