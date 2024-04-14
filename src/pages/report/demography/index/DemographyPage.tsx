import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { reportService } from '@/services'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BaseInputDate, Card, CardBody, Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const backgroundColors = [
  'rgba(80, 45, 145, 1)',
  'rgba(10, 132, 255, 1)',
  'rgba(100, 209, 254, 1)',
  'rgba(105, 82, 224, 1)',
  'rgba(138, 127, 232, 1)',
  'rgba(180, 215, 251, 1)',
  'rgba(178, 178, 178, 1)',
]

const fetchData = async (fetchFunction: any) => {
  try {
    const response = await fetchFunction()
    return {
      labels: response.map((item: any) => item.label),
      data: response.map((item: any) => item.total),
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      labels: [],
      data: [],
    }
  }
}

const DemographyPage = () => {
  const [chartData, setChartData] = useState({
    province: { labels: [], datasets: [] },
    age: { labels: [], datasets: [] },
    education: { labels: [], datasets: [] },
    gender: { labels: [], datasets: [] },
    experience: { labels: [], datasets: [] },
  })

  useEffect(() => {
    const fetchAllData = async () => {
      const [province, age, education, gender, experience] = await Promise.all([
        fetchData(reportService.fetchProvince),
        fetchData(reportService.fetchAge),
        fetchData(reportService.fetchEducation),
        fetchData(reportService.fetchGender),
        fetchData(reportService.fetchExperience),
      ])

      const chartKeys = ['province', 'age', 'education', 'gender', 'experience']
      const chartResults = [province, age, education, gender, experience]

      const newChartData = chartKeys.reduce((acc: any, key, index) => {
        const { labels, data } = chartResults[index]
        acc[key] = {
          labels,
          datasets: [
            {
              data,
              backgroundColor: backgroundColors.slice(0, data.length),
            },
          ],
        }
        return acc
      }, {})

      setChartData(newChartData)
    }

    fetchAllData()
  }, [])

  const renderPieChart = (title: any, data: any, placeholderOptions: any) => (
    <div className="w-full rounded-lg border p-4 text-center">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <BaseInputDate className="mb-2" placeholder="Start - End Date" />
      <Select placeholder={`All ${title}`} options={placeholderOptions} className="mb-2" />
      <Pie data={data} />
    </div>
  )

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Candidate Demography' }]} title="Candidate Demography" />

      <Container className="py-3 xl:pb-8">
        <Card>
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="relative z-10 rounded-t-lg border-b bg-white/80 p-4 backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {renderPieChart('Province', chartData.province, [])}
                {renderPieChart('Age', chartData.age, [])}
                {renderPieChart('Education', chartData.education, [])}
                {renderPieChart('Gender', chartData.gender, [])}
                {renderPieChart('Experience', chartData.experience, [])}
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default DemographyPage
