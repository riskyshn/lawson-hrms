import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { candidateService, masterService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { AsyncSelect, Button, useToast } from 'jobseeker-ui'
import { FileSpreadsheetIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PreviewPdfResumeModal from '../../components/PreviewPdfResumeModal'
import PreviewVideoResumeModal from '../../components/PreviewVideoResumeModal'
import Table from './components/Table'

const CandidatePoolPage: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)
  const [searchParams, setSearchParam] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const search = searchParams.get('search') || undefined
  const [pageData, setPageData] = useState<IPaginationResponse<ICandidate>>()
  const [pageError, setPageError] = useState<any>()
  const [onChangeData, setOnChangeData] = useState<string>()
  const toast = useToast()

  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [province, setProvince, rawProvince] = useOptionSearchParam('province')
  const [education, setEducation, rawEducation] = useOptionSearchParam('education')

  const pagination = usePagination({
    pathname: '/candidates/pool',
    totalPage: pageData?.totalPages,
    params: { search, vacancy: rawVacancy, province: rawProvince, education: rawEducation },
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

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true)
      const excelData = await candidateService.downloadCandidate({
        q: search,
        page: pagination.currentPage,
        limit: 20,
        education: education?.value,
        vacancyId: vacancy?.value,
        province: province?.value,
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
      setIsExporting(false)
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error' })
      setIsExporting(false)
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        title="Candidate Pool"
        breadcrumb={[{ text: 'Candidates' }, { text: 'Cadiadate Pool' }]}
        actions={
          <Button
            onClick={handleExportToExcel}
            color="success"
            className="gap-2"
            rightChild={<FileSpreadsheetIcon size={18} />}
            disabled={isExporting}
            loading={isExporting}
          >
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

export default CandidatePoolPage
