import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BaseInputDate, Card, CardBody, Select } from 'jobseeker-ui'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const DemographyPage: React.FC = () => {
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
                    <Pie data={data} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Age</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Age" options={[]} className="mb-2" />
                    <Pie data={data} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Education</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Education" options={[]} className="mb-2" />
                    <Pie data={data} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Gender</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Gender" options={[]} className="mb-2" />
                    <Pie data={data} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Department</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Department" options={[]} className="mb-2" />
                    <Pie data={data} />
                  </div>
                </div>
                <div>
                  <div className="w-full rounded-lg border p-4 text-center">
                    <h2 className="mb-2 text-lg font-semibold">Experience</h2>
                    <BaseInputDate className="mb-2" placeholder="Start - End Date" />
                    <Select placeholder="All Experience" options={[]} className="mb-2" />
                    <Pie data={data} />
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
