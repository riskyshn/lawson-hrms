import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import PreviewPdfResumeModal from '../../Modals/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../Modals/PreviewVideoResumeModal'
import Table from './components/Table'
import { candidateService } from '@/services'
import { useSearchParams } from 'react-router-dom'
import MainCardHeader from '@/components/Elements/MainCardHeader'

const CandidateManagementPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [searchParams, setSearchParam] = useSearchParams()
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined

  const position = searchParams.get('position') || undefined
  const province = searchParams.get('province') || undefined
  const education = searchParams.get('education') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    pathname: '/candidates/management',
    totalPage: pageData?.totalPages || 0,
    params: { search, position, province, education },
  })
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchCandidateManagement(
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
  }, [search, position, education, province, pagination.currentPage])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Candidate Management' }]} title="Candidate Management" />

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
                      placeholder="All Vacancy"
                      withReset
                      // value={vacancy}
                      onChange={(e) => {
                        searchParams.set('vacancy', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={[]}
                      // options={master.departments.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
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
                      placeholder="All Vacancy"
                      withReset
                      // value={vacancy}
                      onChange={(e) => {
                        searchParams.set('vacancy', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={[]}
                      // options={master.departments.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
                  </div>
                )
              }
            />
                )
              }
            />
          )}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              items={pageData?.content || []}
              loading={isLoading}
              setPreviewVideoModalUrl={(url) => setPreviewVideoModalUrl(url)}
              setPreviewPdfModalUrl={(url) => setPreviewPdfModalUrl(url)}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default CandidateManagementPage
