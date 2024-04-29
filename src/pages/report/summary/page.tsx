import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { reportService } from '@/services'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { BaseInputDateRange, Card, CardBody, Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { DateValueType } from 'react-tailwindcss-datepicker'
import PageCard from '../components/PageCard'
import StatisticCards from '../components/StatisticCards'
import Table from '../components/Table'
import TableUserActivity from '../components/TableUserActivity'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

export const Component: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [loadingBarChart, setLoadingBarChart] = useState(true)
  const [loadingLineChart, setLoadingLineChart] = useState(true)
  const [data, setData] = useState<IRecruitmentFunnel>()
  const [dataLine, setDataLine] = useState<INumberOfHired>()
  const [dataNumberHired, setDataNumberHired] = useState<IPaginationResponse<INumberOfHiredDataTable>>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })

  const [activeLabel, setActiveLabel] = useState('Year')

  const handlePageCardClick = (selectedLabel: any) => {
    setActiveLabel(selectedLabel)
  }

  const startYear = 2010
  const endYear = 2024
  const yearOptions = []

  for (let year = endYear; year >= startYear; year--) {
    yearOptions.push({
      value: year.toString(),
      label: year.toString(),
    })
  }

  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const handleYearChange = (selectedOption: any) => {
    setSelectedYear(selectedOption)
  }

  const backgroundColors = [
    'rgba(80, 45, 145, 1)',
    'rgba(10, 132, 255, 1)',
    'rgba(100, 209, 254, 1)',
    'rgba(105, 82, 224, 1)',
    'rgba(138, 127, 232, 1)',
    'rgba(180, 215, 251, 1)',
    'rgba(178, 178, 178, 1)',
  ]

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const dataBar = {
    labels: data?.total ? data.total.map((item) => item.label) : [],
    datasets: [
      {
        label: '',
        data: data?.total ? data.total.map((item) => item.total) : [],
        backgroundColor: backgroundColors.slice(0, 5),
      },
    ],
  }

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const dataLineChart = {
    labels: (dataLine?.[0] || []).map((item) => item.label),
    datasets: [] as Dataset[],
  }

  dataLineChart.datasets.push({
    label: currentYear.toString(),
    data: (dataLine?.[0] || []).map((item) => item.total) || [],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    tension: 0.4,
  })

  if (dataLine && dataLine.length > 1) {
    dataLineChart.datasets.push({
      label: selectedYear.toString(),
      data: (dataLine[1] || []).map((item) => item.total),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.4,
    })
  }

  const pagination = usePagination({
    pathname: '/summary/number-of-hired/datatable',
    totalPage: dataNumberHired?.totalPages || 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBarChart(true)
        const recruitmentFunnelData = await reportService.fetchRecruitmentFunnel({
          start_date: filterDate.startDate,
          end_date: filterDate.endDate,
        })
        setData(recruitmentFunnelData)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoadingBarChart(false)
      }
    }

    fetchData()
  }, [filterDate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLineChart(true)
        const numberHiredData = await reportService.fetchNumberHiredChart({
          year: selectedYear,
          type: activeLabel.toLowerCase(),
        })
        setDataLine(numberHiredData)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoadingLineChart(false)
      }
    }

    fetchData()
  }, [selectedYear, activeLabel])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const numberHiredDataTable = await reportService.fetchNumberHired()
        setDataNumberHired(numberHiredDataTable)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ startDate: formattedStartDate, endDate: formattedEndDate })
    }
  }

  const dummyDataUserActivity = [
    {
      name: 'Alice Johnson',
      postJob: 5,
      hired: 12,
      rejected: 30,
      interviewed: 20,
      locked: 3,
      blacklisted: 1,
    },
    {
      name: 'Bob Smith',
      postJob: 8,
      hired: 20,
      rejected: 50,
      interviewed: 35,
      locked: 5,
      blacklisted: 2,
    },
    {
      name: 'Carlos Ramirez',
      postJob: 3,
      hired: 8,
      rejected: 15,
      interviewed: 10,
      locked: 2,
      blacklisted: 0,
    },
    {
      name: 'Diana Lewis',
      postJob: 6,
      hired: 15,
      rejected: 40,
      interviewed: 25,
      locked: 4,
      blacklisted: 1,
    },
  ]

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Summary & Analytics' }]} title="Summary & Analytics" />

      <Container className="py-3 xl:pb-8">
        <StatisticCards filterDate={filterDate} />
        <Card className="mt-4 p-8">
          <div className="grid grid-cols-4 gap-4">
            {data?.percentage ? (
              data?.percentage.map((stage) => (
                <div className="border-r-4 border-blue-500 p-4">
                  <p className="text-md">{stage.label}</p>
                  <p className="text-2xl font-semibold">{stage.total}%</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </Card>
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Recruitment Funnel</h2>
              <BaseInputDateRange className="w-64" placeholder="Start - End Date" onValueChange={handleDateChange} value={filterDate} />
            </div>
            {loadingBarChart ? (
              <div className="flex h-full items-center justify-center">
                <div
                  className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"
                  role="status"
                  aria-label="Loading..."
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <Bar options={optionsBar} data={dataBar} />
            )}
          </CardBody>
        </Card>
        <MainCard
          header={() => <MainCardHeader title="User Activity" />}
          body={<TableUserActivity items={dummyDataUserActivity} loading={loading} />}
          footer={[]}
        />
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Number of Hired</h2>
                <div className="flex items-center">
                  <div>
                    <CardBody className="p-0">
                      <div className="flex items-center justify-end gap-3 overflow-x-scroll px-3">
                        {/* {['Month', 'Quarter', 'Year'].map((label, index) => ( */}
                        {['Quarter', 'Year'].map((label, index) => (
                          <PageCard key={index} label={label} activeLabel={activeLabel} onClick={handlePageCardClick} />
                        ))}
                      </div>
                      <div className="flex items-center justify-end p-3">
                        <Select
                          className="w-64"
                          options={yearOptions}
                          placeholder="Select a year"
                          onChange={handleYearChange}
                          value={selectedYear.toString()}
                        />
                      </div>
                    </CardBody>
                  </div>
                </div>
              </div>
            </div>
            {loadingLineChart ? (
              <div className="flex h-full items-center justify-center">
                <div
                  className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"
                  role="status"
                  aria-label="Loading..."
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <Line options={optionsLine} data={dataLineChart} />
            )}
          </CardBody>
        </Card>
        <MainCard
          header={() => <MainCardHeader title="Number of Hired" />}
          body={<Table items={dataNumberHired?.content || []} loading={loading} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SummaryPage'
