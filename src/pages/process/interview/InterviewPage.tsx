import AsyncSelect from '@/components/Elements/AsyncSelect'
import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { processService, vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from './components/Table'

const InterviewPage: React.FC = () => {
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
    pathname: '/job/management',
    totalPage: pageData?.totalPages || 0,
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
            type: 'INTERVIEW',
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

  // const updateVacancy = useCallback(
  //   (vacancy: IVacancy) => {
  //     if (!pageData) return
  //     setPageData({ ...pageData, content: pageData.content.map((el) => (el.id === vacancy.id ? vacancy : el)) })
  //     setSwitchData((v) => !v)
  //   },
  //   [pageData],
  // )

  // const removeVacancy = useCallback(
  //   (id: string) => {
  //     if (!pageData) return
  //     setPageData({ ...pageData, content: pageData.content.filter((el) => el.id !== id) })
  //     setSwitchData((v) => !v)
  //   },
  //   [pageData],
  // )

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Interview' }]} title="Interview" />

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
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={() => setSwitchData((v) => !v)} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default InterviewPage
