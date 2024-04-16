import { useEffect, useState } from 'react'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js'
import { BaseInputDate, Card, CardBody, Select } from 'jobseeker-ui'
import { Bar, Line } from 'react-chartjs-2'
import StatisticCards from '../../components/StatisticCards'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import MainCard from '@/components/Elements/Layout/MainCard'
import Table from '../../components/Table'
import PageCard from '../../components/PageCard'
import { reportService } from '@/services'
import usePagination from '@/hooks/use-pagination'
import { DateValueType } from 'react-tailwindcss-datepicker'
import TableUserActivity from '../../components/TableUserActivity'

interface RecruitmentFunnelData {
  interview?: { percentage?: number }
  applicant?: { percentage?: number }
  assessment?: { percentage?: number }
  offering?: { percentage?: number }
  onboarding?: { percentage?: number }
}

interface NumberHiredData {
  label: string
  total: number
}

interface Dataset {
  label: string
  data: any
  borderColor: string
  backgroundColor: string
  tension: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

const SummaryPage = () => {
  const [loading, setLoading] = useState(true)
  const [loadingBarChart, setLoadingBarChart] = useState(true)
  const [loadingLineChart, setLoadingLineChart] = useState(true)
  const [data, setData] = useState<RecruitmentFunnelData>({})
  const [dataLine, setDataLine] = useState<NumberHiredData[][]>([])
  const [dataNumberHired, setDataNumberHired] = useState<any>()
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

  const labelsBar = ['Interview', 'Applicant', 'Assessment', 'Offering', 'Onboarding']

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Data',
        data: [
          data?.interview?.percentage || 0,
          data?.applicant?.percentage || 0,
          data?.assessment?.percentage || 0,
          data?.offering?.percentage || 0,
          data?.onboarding?.percentage || 0,
        ],
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
    labels: dataLine[0]?.map((item) => item.label) || [],
    datasets: [] as Dataset[],
  }

  dataLineChart.datasets.push({
    label: currentYear.toString(),
    data: dataLine[0]?.map((item) => item.total) || [],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    tension: 0.4,
  })

  if (dataLine.length > 1) {
    dataLineChart.datasets.push({
      label: selectedYear.toString(),
      data: dataLine[1]?.map((item) => item.total) || [],
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
        setLoading(true)
        setLoadingBarChart(true)
        setLoadingLineChart(true)
        const [recruitmentFunnelData, numberHiredData, numberHiredDataTable] = await Promise.all([
          reportService.fetchRecruitmentFunnel({
            start_date: filterDate.startDate,
            end_date: filterDate.endDate,
          }),
          reportService.fetchNumberHiredChart({
            year: selectedYear,
            type: activeLabel.toLowerCase(),
          }),
          reportService.fetchNumberHired({
            year: selectedYear,
          }),
        ])
        setData(recruitmentFunnelData)
        setDataLine(numberHiredData)
        setDataNumberHired(numberHiredDataTable)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoading(false)
        setLoadingBarChart(false)
        setLoadingLineChart(false)
      }
    }

    fetchData()
  }, [filterDate, selectedYear, activeLabel])

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
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Recruitment Funnel</h2>
              <BaseInputDate className="w-64" placeholder="Start - End Date" onValueChange={handleDateChange} value={filterDate} />
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

export default SummaryPage
