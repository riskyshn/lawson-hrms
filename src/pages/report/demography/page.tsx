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
      labels: response?.map((item: any) => item.label) || [],
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

export const Component: React.FC = () => {
  const todayFormatted = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date('1990-01-01').toISOString().split('T')[0]

  const [isProvinceLoading, setIsProvinceLoading] = useState(true)
  const [isAgeLoading, setIsAgeLoading] = useState(true)
  const [isEducationLoading, setIsEducationLoading] = useState(true)
  const [isGenderLoading, setIsGenderLoading] = useState(true)
  const [isExperienceLoading, setIsExperienceLoading] = useState(true)
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(true)

  const [filterDates, setFilterDates] = useState<any>({
    province: { startDate: defaultStartDate, endDate: todayFormatted },
    age: { startDate: defaultStartDate, endDate: todayFormatted },
    education: { startDate: defaultStartDate, endDate: todayFormatted },
    gender: { startDate: defaultStartDate, endDate: todayFormatted },
    experience: { startDate: defaultStartDate, endDate: todayFormatted },
    department: { startDate: defaultStartDate, endDate: todayFormatted },
  })

  const [searchParams, setSearchParam] = useSearchParams()
  const [province, setProvince] = useOptionSearchParam('province')
  const [education, setEducation] = useOptionSearchParam('education')
  const [gender, setGender] = useOptionSearchParam('gender')
  const [age] = useOptionSearchParam('age')
  const [experience] = useOptionSearchParam('experience')
  const [department, setDepartment] = useOptionSearchParam('department')

  type ChartData = {
    province: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
    age: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
    education: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
    gender: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
    experience: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
    department: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }
  }

  const [chartData, setChartData] = useState<ChartData>({
    province: { labels: [], datasets: [] },
    age: { labels: [], datasets: [] },
    education: { labels: [], datasets: [] },
    gender: { labels: [], datasets: [] },
    experience: { labels: [], datasets: [] },
    department: { labels: [], datasets: [] },
  })

  const fetchProvinceData = async () => {
    setIsProvinceLoading(true)
    const provinceData = await fetchData(() =>
      reportService.fetchProvince({
        start_date: filterDates.province.startDate,
        end_date: filterDates.province.endDate,
        province: province?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      province: {
        labels: provinceData.labels,
        datasets: [
          {
            data: provinceData.data,
            backgroundColor: backgroundColors.slice(0, provinceData.data.length),
          },
        ],
      },
    }))

    setIsProvinceLoading(false)
  }

  const fetchAgeData = async () => {
    setIsAgeLoading(true)
    const ageData = await fetchData(() =>
      reportService.fetchAge({
        start_date: filterDates.age.startDate,
        end_date: filterDates.age.endDate,
        range: age?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      age: {
        labels: ageData.labels,
        datasets: [
          {
            data: ageData.data,
            backgroundColor: backgroundColors.slice(0, ageData.data.length),
          },
        ],
      },
    }))

    setIsAgeLoading(false)
  }

  const fetchEducationData = async () => {
    setIsEducationLoading(true)
    const educationData = await fetchData(() =>
      reportService.fetchEducation({
        start_date: filterDates.education.startDate,
        end_date: filterDates.education.endDate,
        education: education?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      education: {
        labels: educationData.labels,
        datasets: [
          {
            data: educationData.data,
            backgroundColor: backgroundColors.slice(0, educationData.data.length),
          },
        ],
      },
    }))

    setIsEducationLoading(false)
  }

  const fetchGenderData = async () => {
    setIsGenderLoading(true)
    const genderData = await fetchData(() =>
      reportService.fetchGender({
        start_date: filterDates.gender.startDate,
        end_date: filterDates.gender.endDate,
        gender: gender?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      gender: {
        labels: genderData.labels,
        datasets: [
          {
            data: genderData.data,
            backgroundColor: backgroundColors.slice(0, genderData.data.length),
          },
        ],
      },
    }))

    setIsGenderLoading(false)
  }

  const fetchExperienceData = async () => {
    setIsExperienceLoading(true)
    const experienceData = await fetchData(() =>
      reportService.fetchExperience({
        start_date: filterDates.experience.startDate,
        end_date: filterDates.experience.endDate,
        range: experience?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      experience: {
        labels: experienceData.labels,
        datasets: [
          {
            data: experienceData.data,
            backgroundColor: backgroundColors.slice(0, experienceData.data.length),
          },
        ],
      },
    }))

    setIsExperienceLoading(false)
  }

  const fetchDepartmentData = async () => {
    setIsDepartmentLoading(true)
    const departmentData = await fetchData(() =>
      reportService.fetchDepartment({
        start_date: filterDates.department.startDate,
        end_date: filterDates.department.endDate,
        department: department?.value,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      department: {
        labels: departmentData.labels,
        datasets: [
          {
            data: departmentData.data,
            backgroundColor: backgroundColors.slice(0, departmentData.data.length),
          },
        ],
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
        [chartType]: { startDate: formattedStartDate, endDate: formattedEndDate },
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
          placeholder="Start - End Date"
          onValueChange={(date) => handleDateChange(date, chartType)}
          value={filterDates[chartType]}
        />
        {chartType === 'province' ? (
          <AsyncSelect
            className="mb-2 text-left"
            placeholder="Province"
            withReset
            action={masterService.fetchProvinces}
            params={{ country: 'Indonesia' }}
            converter={emmbedToOptions}
            name="province"
            value={province}
            onValueChange={setProvince}
          />
        ) : chartType === 'education' ? (
          <AsyncSelect
            className="text-left"
            placeholder="All Education"
            withReset
            action={masterService.fetchEducationLevel}
            converter={emmbedToOptions}
            name="education"
            value={education}
            onValueChange={setEducation}
          />
        ) : chartType === 'gender' ? (
          <AsyncSelect
            className="text-left"
            placeholder="Select Gender"
            withReset
            hideSearch
            disableInfiniteScroll
            action={masterService.fetchGenders}
            converter={emmbedToOptions}
            name="gender"
            value={gender}
            onValueChange={setGender}
          />
        ) : chartType === 'age' ? (
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
            value={age?.value}
            onChange={(e) => {
              searchParams.set('age', e)
              setSearchParam(searchParams)
            }}
          />
        ) : chartType === 'experience' ? (
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
            value={experience?.value}
            onChange={(e: any) => {
              searchParams.set('experience', e)
              setSearchParam(searchParams)
            }}
          />
        ) : chartType === 'department' ? (
          <AsyncSelect
            className="text-left"
            placeholder="All Department"
            withReset
            action={organizationService.fetchDepartments}
            converter={emmbedToOptions}
            name="department"
            value={department}
            onValueChange={setDepartment}
          />
        ) : (
          <Select placeholder={`All ${title}`} options={placeholderOptions} className="mb-2" />
        )}

        {chartType === 'province' && (
          <>
            {isProvinceLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner height={20} className="text-white-600" />
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
                <Spinner height={20} className="text-white-600" />
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
                <Spinner height={20} className="text-white-600" />
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
                <Spinner height={20} className="text-white-600" />
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
                <Spinner height={20} className="text-white-600" />
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
                <Spinner height={20} className="text-white-600" />
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
