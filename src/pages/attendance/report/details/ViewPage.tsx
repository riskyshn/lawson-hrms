import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { useState } from 'react'
// import { Link, useSearchParams } from 'react-router-dom'
import { BaseInputDate } from 'jobseeker-ui'
import ProfileCard from '../components/ProfileCard'
// import { twMerge } from 'tailwind-merge'
// import DetailsTable from '../components/DetailsTable'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import { DateValueType } from 'react-tailwindcss-datepicker'
// import usePagination from '@/hooks/use-pagination'

const ViewPage: React.FC = () => {
  // const [onChangeData, setOnChangeData] = useState<string>()
  // const [pageData, setPageData] = useState<IPaginationResponse<IAttendance>>()
  // const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })
  // const [isLoading, setIsLoading] = useState(true)

  // const pagination = usePagination({
  //   pathname: '/attendance/report',
  //   totalPage: pageData?.totalPages || 0,
  // })

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ startDate: formattedStartDate, endDate: formattedEndDate })
    }
  }

  // if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }, { text: 'Details' }]}
        title="Attendance Report"
        subtitle="Employee Attendance Report"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <ProfileCard />
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Attendance List"
              // subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={<>{/* You have <span className="text-primary-600">{pageData?.totalElements} Attendance</span> in total today */}</>}
              filterToogle={toggleOpen}
              filter={
                open && (
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <BaseInputDate placeholder="Start - End Date" onValueChange={handleDateChange} value={filterDate} />
                  </div>
                )
              }
            />
          )}
          body={[]}
          footer={[]}
          // body={<DetailsTable items={pageData?.content || ['test']} onDataChange={setOnChangeData} />}
          // footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default ViewPage
