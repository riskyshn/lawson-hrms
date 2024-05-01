import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { organizationService, processService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { AsyncSelect } from 'jobseeker-ui'
import { useSearchParams } from 'react-router-dom'

import Table from '../components/Table'

const InterviewPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [stage, setStage, rawStage] = useOptionSearchParam('stage')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(
    processService.fetchProcess,
    { limit: 20, stage: stage?.value, type: 'INTERVIEW', vacancy: vacancy?.value },
    search,
  )

  const pagination = usePagination({
    params: { search, state: rawStage, vacancy: rawVacancy },
    pathname: '/process/interview',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Interview' }]} title="Interview" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} type="ASSESSMENT" />}
          footer={pagination.render()}
          header={(open, toggleOpen) => (
            <MainCardHeader
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      action={vacancyService.fetchVacancies}
                      className="mb-2"
                      converter={(data) => data.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
                      onValueChange={setVacancy}
                      placeholder="All Vacancy"
                      value={vacancy}
                      withReset
                    />
                    <AsyncSelect
                      action={organizationService.fetchRecruitmentStages}
                      className="mb-2"
                      converter={emmbedToOptions}
                      onValueChange={setStage}
                      placeholder="All Stage"
                      value={stage}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              onRefresh={onRefresh}
              search={{ setValue: (search) => setSearchParam({ search }), value: search || '' }}
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

export default InterviewPage
