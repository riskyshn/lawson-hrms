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

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Recruitment Funnel',
      },
    },
  }

  const labelsBar = ['Interview', 'Applicant', 'Assessment', 'Offering', 'Onboarding']

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Recruitment Funnel Percentage',
        data: [
          data?.interview?.percentage || 0,
          data?.applicant?.percentage || 0,
          data?.assessment?.percentage || 0,
          data?.offering?.percentage || 0,
          data?.onboarding?.percentage || 0,
        ],
        backgroundColor: 'rgba(105, 82, 224, 1)',
      },
    ],
  }

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Number of Hired',
      },
    },
  }

  const dataLineChart = {
    labels: dataLine.map((item) => item.month),
    datasets: [
      {
        label: 'Number of Hired',
        data: dataLine.map((item) => item.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: false,
      },
    ],
  }

  const pagination = usePagination({
    pathname: '/summary/number-of-hired/datatable',
    totalPage: dataNumberHired?.totalPages || 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [recruitmentFunnelData, numberHiredData, numberHiredDataTable] = await Promise.all([
          reportService.fetchRecruitmentFunnel(),
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

    fetchData()
  }, [])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Summary & Analytics' }]} title="Summary & Analytics" />

      <Container className="py-3 xl:pb-8">
        <StatisticCards />
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex justify-end">
              <BaseInputDate className="w-56" placeholder="Start - End Date" />
            </div>
            <Bar options={optionsBar} data={dataBar} />
          </CardBody>
        </Card>
        <MainCard header={() => <MainCardHeader title="User Activity" />} body={<Table items={[]} />} footer={[]} />
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col">
              <div className="flex items-center justify-end">
                <Select className="w-40" options={[]} placeholder="2024" />
                <div className="mb-2">
                  <CardBody className="p-0">
                    <div className="chrome-scrollbar flex gap-3 overflow-x-scroll p-3 pb-2">
                      {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                        <PageCard key={index} label={label} activeLabel={'Attendance'} />
                      ))}
                    </div>
                  </CardBody>
                </div>
              </div>
              <div className="flex items-center justify-end">
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
