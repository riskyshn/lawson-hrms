import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { processService, vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from '../components/Table'

const AssessmentPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const vacancy = searchParams.get('vacancy') || undefined
  const stage = searchParams.get('stage') || undefined

  const { recruitmentStages } = useOrganizationStore()

  const [pageData, setPageData] = useState<IPaginationResponse<IDataTableApplicant>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  const [switchData, setSwitchData] = useState(false)

  const pagination = usePagination({
    pathname: '/process/assessment',
    totalPage: pageData?.totalPages,
    params: { search, vacancy, stage },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await processService.fetchProcess(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            stage,
            vacancy,
            type: 'ASSESSMENT',
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
  }, [search, vacancy, stage, pagination.currentPage, switchData])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Assessment' }]} title="Assessment" />

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
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      placeholder="All Vacancy"
                      withReset
                      fetcher={vacancyService.fetchVacancies}
                      fetcherParams={{ limit: '99999' }}
                      searchMinCharacter={0}
                      converter={(data: IVacancy[]) => data.map((el) => ({ label: el.vacancyName || '', value: el.oid }))}
                      value={vacancy}
                      onChange={(e) => {
                        searchParams.set('vacancy', e.toString())
                        setSearchParam(searchParams)
                      }}
                    />
                    <Select
                      placeholder="All Stage"
                      withReset
                      value={stage}
                      onChange={(e) => {
                        searchParams.set('stage', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={recruitmentStages.map((el) => ({ label: el.name, value: el.oid }))}
                    />
                  </div>
                )
              }
            />
          )}
          body={<Table type="ASSESSMENT" items={pageData?.content || []} loading={isLoading} onRefresh={() => setSwitchData((v) => !v)} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default AssessmentPage
