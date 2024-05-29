/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { DateValueType } from 'react-tailwindcss-datepicker'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { AsyncSelect, BaseInputDateRange, Card, CardBody, Container, PageHeader, Select, Spinner } from 'jobseeker-ui'
import { useOptionSearchParam } from '@/hooks'
import { masterService, organizationService, reportService } from '@/services'
import { IDataPoint } from '@/types'
import { emmbedToOptions } from '@/utils'

interface FilterDate {
  startDate: string
  endDate: string
}

// Define a type for the filter dates state
interface FilterDatesState {
  [key: string]: FilterDate
}

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

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
  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${year}-${month}-${day}`
  }

  const todayFormatted = formatDate(lastDayOfMonth)
  const defaultStartDate = formatDate(firstDayOfMonth)

  const [isBranchLoading, setIsBranchLoading] = useState(true)
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(true)
  const [isJobLevelLoading, setIsJobLevelLoading] = useState(true)
  const [isGenderLoading, setIsGenderLoading] = useState(true)
  const [isEmploymentStatusLoading, setIsEmploymentStatusLoading] = useState(true)

  const [loadingBarChartPosition, setLoadingBarChartPosition] = useState(true)
  const [loadingBarChartAge, setLoadingBarChartAge] = useState(true)
  const [positionData, setPositionData] = useState<IDataPoint[]>()
  const [ageData, setAgeData] = useState<IDataPoint[]>()
  const [pageError, setPageError] = useState<any>()

  const [filterDates, setFilterDates] = useState<FilterDatesState>({
    branch: { endDate: todayFormatted, startDate: defaultStartDate },
    department: { endDate: todayFormatted, startDate: defaultStartDate },
    jobLevel: { endDate: todayFormatted, startDate: defaultStartDate },
    gender: { endDate: todayFormatted, startDate: defaultStartDate },
    employmentStatus: { endDate: todayFormatted, startDate: defaultStartDate },
    age: { endDate: todayFormatted, startDate: defaultStartDate },
    position: { endDate: todayFormatted, startDate: defaultStartDate },
  })

  const [branch, setBranch] = useOptionSearchParam('branch')
  const [department, setDepartment] = useOptionSearchParam('department')
  const [jobLevel, setJobLevel] = useOptionSearchParam('jobLevel')
  const [gender, setGender] = useOptionSearchParam('gender')
  const [employmentStatus, setEmploymentStatus] = useOptionSearchParam('employmentStatus')

  type ChartData = {
    branch: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    department: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    jobLevel: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    gender: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    employmentStatus: { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
  }

  const [chartData, setChartData] = useState<ChartData>({
    branch: { datasets: [], labels: [] },
    department: { datasets: [], labels: [] },
    jobLevel: { datasets: [], labels: [] },
    gender: { datasets: [], labels: [] },
    employmentStatus: { datasets: [], labels: [] },
  })

  const fetchBranchData = async () => {
    setIsBranchLoading(true)
    const branchData = await fetchData(() =>
      reportService.fetchEmployeeBranch({
        end_date: filterDates.branch.endDate,
        branch: branch?.value,
        start_date: filterDates.branch.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      branch: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, branchData.data.length),
            data: branchData.data,
          },
        ],
        labels: branchData.labels,
      },
    }))

    setIsBranchLoading(false)
  }

  const fetchDepartmentData = async () => {
    setIsDepartmentLoading(true)
    const departmentData = await fetchData(() =>
      reportService.fetchEmployeeDepartment({
        end_date: filterDates.department.endDate,
        department: department?.value,
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

  const fetchJobLevelData = async () => {
    setIsJobLevelLoading(true)
    const jobLevelData = await fetchData(() =>
      reportService.fetchEmployeeJobLevel({
        end_date: filterDates.jobLevel.endDate,
        jobLevel: jobLevel?.value,
        start_date: filterDates.jobLevel.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      jobLevel: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, jobLevelData.data.length),
            data: jobLevelData.data,
          },
        ],
        labels: jobLevelData.labels,
      },
    }))

    setIsJobLevelLoading(false)
  }

  const fetchGenderData = async () => {
    setIsGenderLoading(true)
    const genderData = await fetchData(() =>
      reportService.fetchEmployeeGender({
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

  const fetchEmploymentStatusData = async () => {
    setIsEmploymentStatusLoading(true)
    const employmentStatusData = await fetchData(() =>
      reportService.fetchEmployeeJobType({
        end_date: filterDates.employmentStatus.endDate,
        jobType: employmentStatus?.value,
        start_date: filterDates.employmentStatus.startDate,
      }),
    )

    setChartData((prevChartData) => ({
      ...prevChartData,
      employmentStatus: {
        datasets: [
          {
            backgroundColor: backgroundColors.slice(0, employmentStatusData.data.length),
            data: employmentStatusData.data,
          },
        ],
        labels: employmentStatusData.labels,
      },
    }))

    setIsEmploymentStatusLoading(false)
  }

  useEffect(() => {
    fetchBranchData()
  }, [filterDates.branch, branch?.value])

  useEffect(() => {
    fetchDepartmentData()
  }, [filterDates.department, department?.value])

  useEffect(() => {
    fetchJobLevelData()
  }, [filterDates.jobLevel, jobLevel?.value])

  useEffect(() => {
    fetchGenderData()
  }, [filterDates.gender, gender?.value])

  useEffect(() => {
    fetchEmploymentStatusData()
  }, [filterDates.employmentStatus, employmentStatus?.value])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBarChartPosition(true)
        const employeePosition = await reportService.fetchEmployeePosition({
          end_date: filterDates.position.endDate,
          start_date: filterDates.position.startDate,
        })
        setPositionData(employeePosition)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoadingBarChartPosition(false)
      }
    }

    fetchData()
  }, [filterDates.position])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBarChartAge(true)
        const employeeAge = await reportService.fetchEmployeeAge({
          end_date: filterDates.age.endDate,
          start_date: filterDates.age.startDate,
        })
        setAgeData(employeeAge)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      } finally {
        setLoadingBarChartAge(false)
      }
    }

    fetchData()
  }, [filterDates.age])

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
          displayFormat="DD-MM-YYYY"
          onValueChange={(date) => handleDateChange(date, chartType)}
          placeholder="Start - End Date"
          value={filterDates[chartType]}
        />
        {chartType === 'branch' ? (
          <AsyncSelect
            action={organizationService.fetchBranches}
            converter={emmbedToOptions}
            onChange={setBranch}
            placeholder="All Branch"
            value={branch}
            withReset
          />
        ) : chartType === 'employmentStatus' ? (
          <AsyncSelect
            params={{ status: 1 }}
            action={organizationService.fetchJobTypes}
            className="text-left"
            converter={emmbedToOptions}
            name="employmentStatus"
            onValueChange={setEmploymentStatus}
            placeholder="All Employment Status"
            value={employmentStatus}
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
        ) : chartType === 'jobLevel' ? (
          <AsyncSelect
            action={organizationService.fetchJobLevels}
            className="text-left"
            converter={emmbedToOptions}
            name="jobLevel"
            onValueChange={setJobLevel}
            placeholder="All Job Level"
            value={jobLevel}
            withReset
          />
        ) : (
          <Select className="mb-2" options={placeholderOptions} placeholder={`All ${title}`} />
        )}

        {chartType === 'branch' && (
          <>
            {isBranchLoading ? (
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

        {chartType === 'jobLevel' && (
          <>
            {isJobLevelLoading ? (
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

        {chartType === 'employmentStatus' && (
          <>
            {isEmploymentStatusLoading ? (
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

  const optionsBar = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    responsive: true,
  }

  const dataBarPosition = {
    datasets: [
      {
        backgroundColor: backgroundColors.slice(0, 5),
        data: positionData ? positionData.map((item) => item.total) : [],
        label: '',
      },
    ],
    labels: positionData ? positionData.map((item) => item.label) : [],
  }

  const dataBarAge = {
    datasets: [
      {
        backgroundColor: backgroundColors.slice(0, 5),
        data: ageData ? ageData.map((item) => item.total) : [],
        label: '',
      },
    ],
    labels: ageData ? ageData.map((item) => item.label) : [],
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Employee Demography' }]} title="Employee Demography" />
      <Container className="py-3 xl:pb-8">
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <h2 className="mb-4 text-2xl font-semibold sm:mb-0 sm:mr-4">Position</h2>
              <BaseInputDateRange
                className="w-64 max-sm:w-full"
                displayFormat="DD-MM-YYYY"
                onValueChange={(date) => handleDateChange(date, 'position')}
                placeholder="Start - End Date"
                value={filterDates['position']}
              />
            </div>
            {loadingBarChartPosition ? (
              <div className="flex h-full items-center justify-center">
                <Spinner className="block h-10 w-10 text-primary-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {typeof window !== 'undefined' && window.innerWidth <= 640 ? (
                  <Bar id="bar-chart-1" height={350} data={dataBarPosition} options={optionsBar} />
                ) : (
                  <Bar id="bar-chart-1" data={dataBarPosition} options={optionsBar} />
                )}
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="my-4 p-8">
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <h2 className="mb-4 text-2xl font-semibold sm:mb-0 sm:mr-4">Age</h2>
              <BaseInputDateRange
                className="w-64 max-sm:w-full"
                displayFormat="DD-MM-YYYY"
                onValueChange={(date) => handleDateChange(date, 'age')}
                placeholder="Start - End Date"
                value={filterDates['age']}
              />
            </div>
            {loadingBarChartAge ? (
              <div className="flex h-full items-center justify-center">
                <Spinner className="block h-10 w-10 text-primary-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {typeof window !== 'undefined' && window.innerWidth <= 640 ? (
                  <Bar id="bar-chart-2" height={350} data={dataBarAge} options={optionsBar} />
                ) : (
                  <Bar id="bar-chart-2" data={dataBarAge} options={optionsBar} />
                )}
              </div>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardBody className="overflow-x-auto p-0 2xl:overflow-x-visible">
            <div className="relative z-10 rounded-t-lg border-b bg-white/80 p-4 backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {renderPieChart('Branch', chartData.branch, [], 'branch')}
                {renderPieChart('Department', chartData.department, [], 'department')}
                {renderPieChart('Job Level', chartData.jobLevel, [], 'jobLevel')}
                {renderPieChart('Gender', chartData.gender, [], 'gender')}
                {renderPieChart('Employment Status', chartData.employmentStatus, [], 'employmentStatus')}
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

Component.displayName = 'DemographyPage'
