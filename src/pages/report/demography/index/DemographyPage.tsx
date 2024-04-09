import React from 'react'
import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js'
import { BaseInputDate, Card, CardBody, Select } from 'jobseeker-ui'
import { Bar, Line } from 'react-chartjs-2'
import StatisticCards from '../../components/StatisticCards'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import MainCard from '@/components/Elements/MainCard'
import Table from '../../components/Table'
import PageCard from '../../components/PageCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

const dataLine = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
    },
  ],
}

const DemographyPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Summary & Analitycs' }]} title="Summary & Analytics" />

      <Container className="py-3 xl:pb-8">
        <StatisticCards />
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex justify-end">
              <BaseInputDate className="w-56" placeholder="Start - End Date" />
            </div>
            <Bar options={options} data={data} />
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
            <Line options={optionsLine} data={dataLine} />
          </CardBody>
        </Card>
        <MainCard header={() => <MainCardHeader title="Number of Hired" />} body={<Table items={[]} />} footer={[]} />
      </Container>
    </>
  )
}

export default DemographyPage
