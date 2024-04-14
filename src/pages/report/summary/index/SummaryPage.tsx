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

interface RecruitmentFunnelData {
  interview?: { percentage?: number }
  applicant?: { percentage?: number }
  assessment?: { percentage?: number }
  offering?: { percentage?: number }
  onboarding?: { percentage?: number }
}

interface NumberHiredData {
  month: string
  total: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

const SummaryPage = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<RecruitmentFunnelData>({})
  const [dataLine, setDataLine] = useState<NumberHiredData[]>([])
  const [dataNumberHired, setDataNumberHired] = useState<any>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })

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
    labels: dataLine.map((item) => item.month),
    datasets: [
      {
        label: 'Data',
        data: dataLine.map((item) => item.total),
        borderColor: 'rgba(37, 140, 244, 1)',
        backgroundColor: 'rgba(37, 140, 244, 1)',
      },
    ],
  }

  const pagination = usePagination({
    pathname: '/summary/number-of-hired/datatable',
    totalPage: dataNumberHired?.totalPages || 0,
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const [recruitmentFunnelData, numberHiredData, numberHiredDataTable] = await Promise.all([
        reportService.fetchRecruitmentFunnel({
          start_date: filterDate?.startDate,
          end_date: filterDate?.endDate,
        }),
        reportService.fetchNumberHiredChart(),
        reportService.fetchNumberHired(),
      ])
      setData(recruitmentFunnelData)
      setDataLine(numberHiredData)
      setDataNumberHired(numberHiredDataTable)
    } catch (e: any) {
      if (e.message !== 'canceled') setPageError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filterDate])

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ startDate: formattedStartDate, endDate: formattedEndDate })
    }
  }

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
            <Bar options={optionsBar} data={dataBar} />
          </CardBody>
        </Card>
        <MainCard header={() => <MainCardHeader title="User Activity" />} body={<Table items={[]} />} footer={[]} />
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Number of Hired</h2>
                <div className="flex items-center">
                  <Select className="w-40" options={[]} placeholder="2024" />
                  <div className="mb-2">
                    <CardBody className="p-0">
                      <div className="flex gap-3 overflow-x-scroll p-3 pb-2">
                        {['Month', 'Quarter', 'Year'].map((label, index) => (
                          <PageCard key={index} label={label} activeLabel={'Month'} />
                        ))}
                      </div>
                    </CardBody>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-3">
                <Select className="w-64" options={[]} placeholder="All" />
              </div>
            </div>
            <Line options={optionsLine} data={dataLineChart} />
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
