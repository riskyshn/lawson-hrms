import type { Dataset, INumberOfHired, INumberOfHiredDataTable, IPaginationResponse, IRecruitmentFunnel } from '@/types'
import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { BaseInputDateRange, Card, CardBody, Container, MainCard, MainCardHeader, PageHeader, Select, Spinner } from 'jobseeker-ui'
import { usePagination } from '@/hooks'
import { reportService } from '@/services'
import PageCard from '../components/PageCard'
import StatisticCards from '../components/StatisticCards'
import Table from '../components/Table'

// import TableUserActivity from '../components/TableUserActivity'

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
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${year}-${month}-${day}`
  }

  const [filterDate, setFilterDate] = useState<{ endDate: string; startDate: string }>({
    endDate: formatDate(lastDayOfMonth),
    startDate: formatDate(firstDayOfMonth),
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
      label: year.toString(),
      value: year.toString(),
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    responsive: true,
  }

  const dataBar = {
    datasets: [
      {
        backgroundColor: backgroundColors.slice(0, 5),
        data: data?.total ? data.total.map((item) => item.total) : [],
        label: '',
      },
    ],
    labels: data?.total ? data.total.map((item) => item.label) : [],
  }

  const optionsLine = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    responsive: true,
  }

  const dataLineChart = {
    datasets: [] as Dataset[],
    labels: (dataLine?.[0] || []).map((item) => item.label),
  }

  dataLineChart.datasets.push({
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgb(255, 99, 132)',
    data: (dataLine?.[0] || []).map((item) => item.total) || [],
    label: currentYear.toString(),
    tension: 0.4,
  })

  if (dataLine && dataLine.length > 1) {
    dataLineChart.datasets.push({
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgb(53, 162, 235)',
      data: (dataLine[1] || []).map((item) => item.total),
      label: selectedYear.toString(),
      tension: 0.4,
    })
  }

  const pagination = usePagination({
    pathname: '/report/summary',
    totalPage: dataNumberHired?.totalPages || 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBarChart(true)
        const recruitmentFunnelData = await reportService.fetchCandidateRecruitmentFunnel({
          end_date: filterDate.endDate,
          start_date: filterDate.startDate,
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
        const numberHiredData = await reportService.fetchCandidateNumberHiredChart({
          type: activeLabel.toLowerCase(),
          year: selectedYear,
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
        const numberHiredDataTable = await reportService.fetchCandidateNumberHired()
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

      setFilterDate({ endDate: formattedEndDate, startDate: formattedStartDate })
    }
  }

  // const dummyDataUserActivity = [
  //   {
  //     blacklisted: 1,
  //     hired: 12,
  //     interviewed: 20,
  //     locked: 3,
  //     name: 'Alice Johnson',
  //     postJob: 5,
  //     rejected: 30,
  //   },
  //   {
  //     blacklisted: 2,
  //     hired: 20,
  //     interviewed: 35,
  //     locked: 5,
  //     name: 'Bob Smith',
  //     postJob: 8,
  //     rejected: 50,
  //   },
  //   {
  //     blacklisted: 0,
  //     hired: 8,
  //     interviewed: 10,
  //     locked: 2,
  //     name: 'Carlos Ramirez',
  //     postJob: 3,
  //     rejected: 15,
  //   },
  //   {
  //     blacklisted: 1,
  //     hired: 15,
  //     interviewed: 25,
  //     locked: 4,
  //     name: 'Diana Lewis',
  //     postJob: 6,
  //     rejected: 40,
  //   },
  // ]

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Summary & Analytics' }]} title="Summary & Analytics" />

      <Container className="py-3 xl:pb-8">
        <StatisticCards filterDate={filterDate} />
        <Card className="mt-4 p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.percentage ? (
              data?.percentage.map((stage, i) => (
                <div key={i} className="border-r-4 border-blue-500 p-4">
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
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <h2 className="mb-4 text-2xl font-semibold sm:mb-0 sm:mr-4">Recruitment Funnel</h2>
              <BaseInputDateRange
                className="w-64 max-sm:w-full"
                displayFormat="DD-MM-YYYY"
                onValueChange={handleDateChange}
                placeholder="Start - End Date"
                value={filterDate}
              />
            </div>
            {loadingBarChart ? (
              <div className="flex h-full items-center justify-center">
                <Spinner className="block h-10 w-10 text-primary-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {typeof window !== 'undefined' && window.innerWidth <= 640 ? (
                  <Bar height={350} data={dataBar} options={optionsBar} />
                ) : (
                  <Bar data={dataBar} options={optionsBar} />
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* <MainCard
          body={<TableUserActivity items={dummyDataUserActivity} loading={loading} />}
          footer={[]}
          header={() => <MainCardHeader title="User Activity" />}
        /> */}
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                <h2 className="mb-2 text-2xl font-semibold sm:mb-0">Number of Hired</h2>
                <div className="flex items-center">
                  <CardBody className="p-0">
                    <div className="flex items-center justify-center gap-2 sm:justify-end sm:overflow-x-auto sm:px-3">
                      {['Quarter', 'Year'].map((label, index) => (
                        <div key={index} className="flex-shrink-0">
                          <PageCard activeLabel={activeLabel} label={label} onClick={handlePageCardClick} />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end p-3">
                      <Select
                        className="w-64"
                        onChange={handleYearChange}
                        options={yearOptions}
                        placeholder="Select a year"
                        value={selectedYear.toString()}
                      />
                    </div>
                  </CardBody>
                </div>
              </div>
              {loadingLineChart ? (
                <div className="flex h-full items-center justify-center">
                  <Spinner className="block h-10 w-10 text-primary-600" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {typeof window !== 'undefined' && window.innerWidth <= 640 ? (
                    <Line height={350} data={dataLineChart} options={optionsLine} />
                  ) : (
                    <Line data={dataLineChart} options={optionsLine} />
                  )}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        <MainCard
          body={<Table items={dataNumberHired?.content || []} loading={loading} />}
          footer={pagination.render()}
          header={() => <MainCardHeader title="Number of Hired" />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SummaryPage'
