import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { processService, vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Select } from 'jobseeker-ui'
import { useSearchParams } from 'react-router-dom'
import Table from '../components/Table'

const OnboardingPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const vacancy = searchParams.get('vacancy') || undefined
  const stage = searchParams.get('stage') || undefined

  const { recruitmentStages } = useOrganizationStore()

  const { pageData, isLoading, onRefresh } = useAsyncSearch(
    processService.fetchProcess,
    { limit: 20, stage, vacancy, type: 'ONBOARDING' },
    search,
  )

  const pagination = usePagination({
    pathname: '/process/onboarding',
    totalPage: pageData?.totalPages,
    params: { search, vacancy },
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Onboarding' }]} title="Onboarding" />

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
              search={{ value: search || '', setValue: (search) => setSearchParam({ search }) }}
              onRefresh={onRefresh}
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
          body={<Table type="ONBOARDING" items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default OnboardingPage
