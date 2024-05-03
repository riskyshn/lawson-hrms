/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import { masterService, organizationService, reportService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { AsyncSelect, BaseInputDateRange, Card, CardBody, Select, Spinner } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'

interface FilterDate {
  startDate: string
  endDate: string
}

// Define a type for the filter dates state
interface FilterDatesState {
  [key: string]: FilterDate
}

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
      data: response.map((item: any) => item.total),
      labels: response?.map((item: any) => item.label) || [],
    }
  } catch (error: any) {
    console.error('Error fetching data:', error.message)
    return {
      data: [],
      labels: [],
    }
  }
}

export const Component: React.FC = () => {
  const todayFormatted = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date('1990-01-01').toISOString().split('T')[0]

  const [isProvinceLoading, setIsProvinceLoading] = useState(true)
  const [isAgeLoading, setIsAgeLoading] = useState(true)
  const [isEducationLoading, setIsEducationLoading] = useState(true)
  const [isGenderLoading, setIsGenderLoading] = useState(true)
  const [isExperienceLoading, setIsExperienceLoading] = useState(true)
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(true)

  const [filterDates, setFilterDates] = useState<FilterDatesState>({
    age: { endDate: todayFormatted, startDate: defaultStartDate },
    department: { endDate: todayFormatted, startDate: defaultStartDate },
    education: { endDate: todayFormatted, startDate: defaultStartDate },
    experience: { endDate: todayFormatted, startDate: defaultStartDate },
    gender: { endDate: todayFormatted, startDate: defaultStartDate },
    province: { endDate: todayFormatted, startDate: defaultStartDate },
  })

  const [searchParams, setSearchParam] = useSearchParams()
  const [province, setProvince] = useOptionSearchParam('province')
  const [education, setEducation] = useOptionSearchParam('education')
  const [gender, setGender] = useOptionSearchParam('gender')
  const [age] = useOptionSearchParam('age')
  const [experience] = useOptionSearchParam('experience')
  const [department, setDepartment] = useOptionSearchParam('department')

  type ChartData = {
    age: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    department: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    education: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    experience: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    gender: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    province: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
  }

  const [chartData, setChartData] = useState<ChartData>({
    age: { datasets: [], labels: [] },
    department: { datasets: [], labels: [] },
    education: { datasets: [], labels: [] },
    experience: { datasets: [], labels: [] },
    gender: { datasets: [], labels: [] },
    province: { datasets: [], labels: [] },
  })

  const fetchProvinceData = async () => {
    setIsProvinceLoading(true)
    const provinceData = await fetchData(() =>
      reportService.fetchProvince({
        end_date: filterDates.province.endDate,
        province: province?.value,
        start_date: filterDates.province.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      province: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, provinceData.data.length),
            data: provinceData.data,
          },
        ],
        labels: provinceData.labels,
      },
    }))

    setIsProvinceLoading(false)
  }

  const fetchAgeData = async () => {
    setIsAgeLoading(true)
    const ageData = await fetchData(() =>
      reportService.fetchAge({
        end_date: filterDates.age.endDate,
        range: age?.value,
        start_date: filterDates.age.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      age: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, ageData.data.length),
            data: ageData.data,
          },
        ],
        labels: ageData.labels,
      },
    }))

    setIsAgeLoading(false)
  }

  const fetchEducationData = async () => {
    setIsEducationLoading(true)
    const educationData = await fetchData(() =>
      reportService.fetchEducation({
        education: education?.value,
        end_date: filterDates.education.endDate,
        start_date: filterDates.education.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      education: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, educationData.data.length),
            data: educationData.data,
          },
        ],
        labels: educationData.labels,
      },
    }))

    setIsEducationLoading(false)
  }

  const fetchGenderData = async () => {
    setIsGenderLoading(true)
    const genderData = await fetchData(() =>
      reportService.fetchGender({
        end_date: filterDates.gender.endDate,
        gender: gender?.value,
        start_date: filterDates.gender.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      gender: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, genderData.data.length),
            data: genderData.data,
          },
        ],
        labels: genderData.labels,
      },
    }))

    setIsGenderLoading(false)
  }

  const fetchExperienceData = async () => {
    setIsExperienceLoading(true)
    const experienceData = await fetchData(() =>
      reportService.fetchExperience({
        end_date: filterDates.experience.endDate,
        range: experience?.value,
        start_date: filterDates.experience.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      experience: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, experienceData.data.length),
            data: experienceData.data,
          },
        ],
        labels: experienceData.labels,
      },
    }))

    setIsExperienceLoading(false)
  }

  const fetchDepartmentData = async () => {
    setIsDepartmentLoading(true)
    const departmentData = await fetchData(() =>
      reportService.fetchDepartment({
        department: department?.value,
        end_date: filterDates.department.endDate,
        start_date: filterDates.department.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      department: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, departmentData.data.length),
            data: departmentData.data,
          },
        ],
        labels: departmentData.labels,
      },
    }))

    setIsDepartmentLoading(false)
  }

  useEffect(() => {
    fetchProvinceData()
  }, [filterDates.province, province?.value])

  useEffect(() => {
    fetchAgeData()
  }, [filterDates.age, age?.value])

  useEffect(() => {
    fetchEducationData()
  }, [filterDates.education, education?.value])

  useEffect(() => {
    fetchGenderData()
  }, [filterDates.gender, gender?.value])

  useEffect(() => {
    fetchExperienceData()
  }, [filterDates.experience, experience?.value])

  useEffect(() => {
    fetchDepartmentData()
  }, [filterDates.department, department?.value])

  const handleDateChange = (selectedDate: DateValueType, chartType: string) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDates((prevFilterDates: any) => ({
        ...prevFilterDates,
        [chartType]: { endDate: formattedEndDate, startDate: formattedStartDate },
      }))
    }
  }

  const renderPieChart = (title: any, data: any, placeholderOptions: any, chartType: string) => {
    const isNoData = data?.labels?.length === 0 || data?.datasets[0]?.data.every((d: any) => d === 0)
    return (
      <div className="w-full rounded-lg border p-4 text-center">
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <BaseInputDateRange
          className="mb-2"
          onValueChange={(date) => handleDateChange(date, chartType)}
          placeholder="Start - End Date"
          value={filterDates[chartType]}
        />
        {chartType === 'province' ? (
          <AsyncSelect
            action={masterService.fetchProvinces}
            className="mb-2 text-left"
            converter={emmbedToOptions}
            name="province"
            onValueChange={setProvince}
            params={{ country: 'Indonesia' }}
            placeholder="Province"
            value={province}
            withReset
          />
        ) : chartType === 'education' ? (
          <AsyncSelect
            action={masterService.fetchEducationLevel}
            className="text-left"
            converter={emmbedToOptions}
            name="education"
            onValueChange={setEducation}
            placeholder="All Education"
            value={education}
            withReset
          />
        ) : chartType === 'gender' ? (
          <AsyncSelect
            action={masterService.fetchGenders}
            className="text-left"
            converter={emmbedToOptions}
            disableInfiniteScroll
            hideSearch
            name="gender"
            onValueChange={setGender}
            placeholder="Select Gender"
            value={gender}
            withReset
          />
        ) : chartType === 'age' ? (
          <Select
            className="text-left"
            name="age"
            onChange={(e) => {
              searchParams.set('age', e)
              setSearchParam(searchParams)
            }}
            options={[
              { label: '17-23', value: '17-23' },
              { label: '24-29', value: '24-29' },
              { label: '30-35', value: '30-35' },
              { label: '36-41', value: '36-41' },
              { label: '42-47', value: '42-47' },
              { label: '48-53', value: '48-53' },
              { label: '>=58', value: '>=58' },
            ]}
            placeholder="Select Age"
            value={age?.value}
            withReset
          />
        ) : chartType === 'experience' ? (
          <Select
            className="text-left"
            name="experience"
            onChange={(e: any) => {
              searchParams.set('experience', e)
              setSearchParam(searchParams)
            }}
            options={[
              { label: '1-3', value: '1-3' },
              { label: '4-6', value: '4-6' },
              { label: '7-9', value: '7-9' },
              { label: '10-12', value: '10-12' },
              { label: '13-15', value: '13-15' },
              { label: '16-19', value: '16-19' },
            ]}
            placeholder="Select Experience"
            value={experience?.value}
            withReset
          />
        ) : chartType === 'department' ? (
          <AsyncSelect
            action={organizationService.fetchDepartments}
            className="text-left"
            converter={emmbedToOptions}
            name="department"
            onValueChange={setDepartment}
            placeholder="All Department"
            value={department}
            withReset
          />
        ) : (
          <Select className="mb-2" options={placeholderOptions} placeholder={`All ${title}`} />
        )}

        {chartType === 'province' && (
          <>
            {isProvinceLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}

        {chartType === 'education' && (
          <>
            {isEducationLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}

        {chartType === 'gender' && (
          <>
            {isGenderLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}

        {chartType === 'age' && (
          <>
            {isAgeLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}

        {chartType === 'experience' && (
          <>
            {isExperienceLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}

        {chartType === 'department' && (
          <>
            {isDepartmentLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner className="text-white-600" height={20} />
              </div>
            ) : isNoData ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-center text-sm">No data found.</p>
              </div>
            ) : (
              <Pie data={data} />
            )}
          </>
        )}
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {renderPieChart('Province', chartData.province, [], 'province')}
                {renderPieChart('Age', chartData.age, [], 'age')}
                {renderPieChart('Education', chartData.education, [], 'education')}
                {renderPieChart('Gender', chartData.gender, [], 'gender')}
                {renderPieChart('Experience', chartData.experience, [], 'experience')}
                {renderPieChart('Department', chartData.department, [], 'department')}
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

Component.displayName = 'DemographyPage'
