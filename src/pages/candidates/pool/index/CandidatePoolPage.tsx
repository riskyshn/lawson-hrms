import { useEffect, useState } from 'react'
import { Button, Select, useToast } from 'jobseeker-ui'
import { FileSpreadsheetIcon } from 'lucide-react'
import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import Table from './components/Table'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import { candidateService, masterService } from '@/services'
import { useSearchParams } from 'react-router-dom'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import { useMasterStore, useOrganizationStore } from '@/store'
import AsyncSelect from '@/components/Elements/AsyncSelect'

const CandidatePoolPage: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)
  const [searchParams, setSearchParam] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const search = searchParams.get('search') || undefined
  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()
  const [onChangeData, setOnChangeData] = useState<string>()
  const toast = useToast()

  const position = searchParams.get('position') || undefined
  const province = searchParams.get('province') || undefined
  const education = searchParams.get('education') || undefined

  const { master } = useOrganizationStore()
  const { educatioLevels } = useMasterStore()

  const pagination = usePagination({
    pathname: '/candidates/pool',
    totalPage: pageData?.totalPages || 0,
    params: { search, position, province, education },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await candidateService.fetchPool(
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

  const handleExportToExcel = async () => {
    try {
      const excelData = await candidateService.downloadCandidate({
        q: search,
        page: pagination.currentPage,
        limit: 20,
        education: education,
        position: position,
        province: province,
      })

      if (!excelData) {
        console.error('Empty response received.')
        return
      }

      const decodedData = atob(excelData)
      const uint8Array = new Uint8Array(decodedData.length)
      for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i)
      }

      const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'candidates.xlsx'

      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      toast('Download successfully.', { color: 'success' })
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error', position: 'top-right' })
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        title="Candidate Pool"
        breadcrumb={[{ text: 'Candidates' }, { text: 'Cadiadate Pool' }]}
        actions={
          <Button onClick={handleExportToExcel} color="success" className="gap-2" rightChild={<FileSpreadsheetIcon size={18} />}>
            Export To Excel
          </Button>
        }
      />

      <PreviewVideoResumeModal url={previewVideoModalUrl} onClose={() => setPreviewVideoModalUrl(null)} />
      <PreviewPdfResumeModal url={previewPdfModalUrl} onClose={() => setPreviewPdfModalUrl(null)} />

      <Container className="relative flex flex-col gap-3 pb-3 xl:pb-8">
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
                      placeholder="All Position"
                      withReset
                      value={position}
                      onChange={(e) => {
                        searchParams.set('position', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={master.positions.map((el) => ({ label: `${el.name}`, value: el.oid }))}
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

export default CandidatePoolPage
