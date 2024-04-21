import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { masterService, reportService } from '@/services'
import { useMasterStore, useOrganizationStore } from '@/store'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { BaseInputDateRange, Card, CardBody, Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'

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
  } catch (error: any) {
    console.error('Error fetching data:', error.message)
    return {
      labels: [],
      data: [],
    }
  }
}

const DemographyPage = () => {
  const todayFormatted = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date('1990-01-01').toISOString().split('T')[0]
  const [isLoading, setIsLoading] = useState(true)

  const [filterDates, setFilterDates] = useState<any>({
    province: { startDate: defaultStartDate, endDate: todayFormatted },
    age: { startDate: defaultStartDate, endDate: todayFormatted },
    education: { startDate: defaultStartDate, endDate: todayFormatted },
    gender: { startDate: defaultStartDate, endDate: todayFormatted },
    experience: { startDate: defaultStartDate, endDate: todayFormatted },
    department: { startDate: defaultStartDate, endDate: todayFormatted },
  })

  const [searchParams, setSearchParam] = useSearchParams()
  const filterProvince = searchParams.get('province') || undefined
  const filterEducation = searchParams.get('education') || undefined
  const filterGender = searchParams.get('gender') || undefined
  const filterAge = searchParams.get('age') || undefined
  const filterExperience = searchParams.get('experience') || undefined
  const filterDepartment = searchParams.get('department') || undefined

  const { educatioLevels, genders } = useMasterStore()
  const { master } = useOrganizationStore()

  const [chartData, setChartData] = useState({
    province: { labels: [], datasets: [] },
    age: { labels: [], datasets: [] },
    education: { labels: [], datasets: [] },
    gender: { labels: [], datasets: [] },
    experience: { labels: [], datasets: [] },
    department: { labels: [], datasets: [] },
  })

  const fetchAllData = async () => {
    setIsLoading(true)

    const [province, age, education, gender, experience, department] = await Promise.all([
      fetchData(() =>
        reportService.fetchProvince({
          start_date: filterDates.province.startDate,
          end_date: filterDates.province.endDate,
          province: filterProvince,
        }),
      ),
      fetchData(() =>
        reportService.fetchAge({
          start_date: filterDates.age.startDate,
          end_date: filterDates.age.endDate,
          range: filterAge,
        }),
      ),
      fetchData(() =>
        reportService.fetchEducation({
          start_date: filterDates.education.startDate,
          end_date: filterDates.education.endDate,
          education: filterEducation,
        }),
      ),
      fetchData(() =>
        reportService.fetchGender({
          start_date: filterDates.gender.startDate,
          end_date: filterDates.gender.endDate,
          gender: filterGender,
        }),
      ),
      fetchData(() =>
        reportService.fetchExperience({
          start_date: filterDates.experience.startDate,
          end_date: filterDates.experience.endDate,
          range: filterExperience,
        }),
      ),
      fetchData(() =>
        reportService.fetchDepartment({
          start_date: filterDates.department.startDate,
          end_date: filterDates.department.endDate,
          department: filterDepartment,
        }),
      ),
    ])

    const chartKeys = ['province', 'age', 'education', 'gender', 'experience', 'department']
    const chartResults = [province, age, education, gender, experience, department]

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
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDates, filterProvince, filterEducation, filterGender, filterAge, filterExperience, filterDepartment])

  const handleDateChange = (selectedDate: DateValueType, chartType: string) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDates((prevFilterDates: any) => ({
        ...prevFilterDates,
        [chartType]: { startDate: formattedStartDate, endDate: formattedEndDate },
      }))
    }
  }

  const renderPieChart = (title: any, data: any, placeholderOptions: any, chartType: string) => {
    const isNoData = data.labels.length === 0 || data.datasets[0].data.every((d: any) => d === 0)

    return (
      <div className="w-full rounded-lg border p-4 text-center">
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <BaseInputDateRange
          className="mb-2"
          placeholder="Start - End Date"
          onValueChange={(date) => handleDateChange(date, chartType)}
          value={filterDates[chartType]}
        />
        {title === 'Province' ? (
          <AsyncSelect
            className="mb-2 text-left"
            placeholder="Province"
            withReset
            fetcher={masterService.fetchProvinces}
            fetcherParams={{ country: 'Indonesia' }}
            searchMinCharacter={0}
            converter={(data) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="province"
            value={filterProvince}
            onChange={(v: any) => {
              searchParams.set('province', v)
              setSearchParam(searchParams)
            }}
          />
        ) : title === 'Education' ? (
          <Select
            className="text-left"
            placeholder="All Education"
            withReset
            value={filterEducation}
            onChange={(e: any) => {
              searchParams.set('education', e)
              setSearchParam(searchParams)
            }}
            options={educatioLevels.map((el) => ({ label: el.name, value: el.oid }))}
          />
        ) : title === 'Gender' ? (
          <Select
            className="text-left"
            placeholder="Select Gender"
            withReset
            options={genders.map((el) => ({ label: el.name, value: el.oid }))}
            name="genderId"
            value={filterGender}
            onChange={(e: any) => {
              searchParams.set('gender', e)
              setSearchParam(searchParams)
            }}
          />
        ) : title === 'Age' ? (
          <Select
            className="text-left"
            placeholder="Select Age"
            withReset
            options={[
              { label: '17-23', value: '17-23' },
              { label: '24-29', value: '24-29' },
              { label: '30-35', value: '30-35' },
              { label: '36-41', value: '36-41' },
              { label: '42-47', value: '42-47' },
              { label: '48-53', value: '48-53' },
              { label: '>=58', value: '>=58' },
            ]}
            name="age"
            value={filterAge}
            onChange={(e: any) => {
              searchParams.set('age', e)
              setSearchParam(searchParams)
            }}
          />
        ) : title === 'Experience' ? (
          <Select
            className="text-left"
            placeholder="Select Experience"
            withReset
            options={[
              { label: '1-3', value: '1-3' },
              { label: '4-6', value: '4-6' },
              { label: '7-9', value: '7-9' },
              { label: '10-12', value: '10-12' },
              { label: '13-15', value: '13-15' },
              { label: '16-19', value: '16-19' },
            ]}
            name="experience"
            value={filterExperience}
            onChange={(e: any) => {
              searchParams.set('experience', e)
              setSearchParam(searchParams)
            }}
          />
        ) : title === 'Department' ? (
          <Select
            className="text-left"
            placeholder="All Department"
            withReset
            value={filterDepartment}
            onChange={(e: any) => {
              searchParams.set('department', e)
              setSearchParam(searchParams)
            }}
            options={master.departments.map((el: any) => ({ label: el.name, value: el.oid }))}
          />
        ) : (
          <Select placeholder={`All ${title}`} options={placeholderOptions} className="mb-2" />
        )}
        {isNoData ? <p className="my-8 text-center text-sm">No data found.</p> : <Pie data={data} />}
      </div>
    )
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Report' }, { text: 'Candidate Demography' }]} title="Candidate Demography" />

      <Container className="py-3 xl:pb-8">
        <Card>
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="relative z-10 rounded-t-lg border-b bg-white/80 p-4 backdrop-blur">
              {isLoading ? (
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {renderPieChart('Province', chartData.province, [], 'province')}
                  {renderPieChart('Age', chartData.age, [], 'age')}
                  {renderPieChart('Education', chartData.education, [], 'education')}
                  {renderPieChart('Gender', chartData.gender, [], 'gender')}
                  {renderPieChart('Experience', chartData.experience, [], 'experience')}
                  {renderPieChart('Department', chartData.department, [], 'department')}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default DemographyPage
