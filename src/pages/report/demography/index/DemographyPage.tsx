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

const getData = async (fetchFunction: any, setStateFunction: any) => {
  try {
    const response = await fetchFunction()
    const labels = response.map((item: any) => item.label)
    const data = response.map((item: any) => item.total)
    const dataLength = data.length
    const datasetBackgroundColors = backgroundColors.slice(0, dataLength)

    setStateFunction({
      labels,
      datasets: [
        {
          data,
          backgroundColor: datasetBackgroundColors,
        },
      ],
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const DemographyPage = () => {
  const [dataProvince, setDataProvince] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  })

  const [dataAge, setDataAge] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  })

  const [dataEducation, setDataEducation] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  })

  const [dataGender, setDataGender] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  })

  const [dataExperience, setDataExperience] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  })

  useEffect(() => {
    getData(reportService.fetchProvince, setDataProvince)
    getData(reportService.fetchAge, setDataAge)
    getData(reportService.fetchEducation, setDataEducation)
    getData(reportService.fetchGender, setDataGender)
    getData(reportService.fetchExperience, setDataExperience)
  }, [])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Candidate Demography' }]} title="Candidate Demography" />

      <Container className="py-3 xl:pb-8">
        <Card>
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="relative z-10 rounded-t-lg border-b bg-white/80 p-4 backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Province</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Province" options={[]} className="mb-2" />
                    <Pie data={dataProvince} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Age</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Age" options={[]} className="mb-2" />
                    <Pie data={dataAge} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Education</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Education" options={[]} className="mb-2" />
                    <Pie data={dataEducation} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Gender</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Gender" options={[]} className="mb-2" />
                    <Pie data={dataGender} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Experience</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Experience" options={[]} className="mb-2" />
                    <Pie data={dataExperience} />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default DemographyPage
