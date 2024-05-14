import React from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@jshrms/ui'
import numberToCurrency from '@/utils/number-to-currency'
import PreviewRecruitmentStageCard from './PreviewRecruitmentStageCard'

const PreviewVacancy: React.FC<{ isLoading: boolean; vacancy?: IVacancy }> = ({ isLoading, vacancy }) => {
  if (isLoading || !vacancy) return LoadingSkeleton
  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Vacancy Information</h3>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{vacancy.rrNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Position Name</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">{vacancy.vacancyName}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Department</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">{vacancy.department?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Branch</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">{vacancy.branch?.name}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Job Summary</h3>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">City</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{vacancy.city?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Number of <br /> Employee Needed
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">{vacancy.numberOfEmployeeNeeded}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Range Salary</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">
                  {numberToCurrency(vacancy.minimumSalary)} - {numberToCurrency(vacancy.maximumSalary)}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Task, Responsibility <br /> & Others*
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{vacancy.other}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      {vacancy.recruitmentProcess && <PreviewRecruitmentStageCard process={vacancy.recruitmentProcess} />}

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Requirements</h3>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Gender
                  {vacancy.genderRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{vacancy.genderRequirement?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Min. Education
                  {vacancy.minimalEducationRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">{vacancy.minimalEducationRequirement?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Age
                  {vacancy.ageRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2">
                  {vacancy.ageRequirement?.minimumAgeRequirement} - {vacancy.ageRequirement?.maximumAgeRequirement}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Province
                  {vacancy.provinceRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{vacancy.provinceRequirement?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  City
                  {vacancy.cityRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{vacancy.cityRequirement?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Min. GPA
                  {vacancy.gpaRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{vacancy.gpaRequirement?.minimumGpa}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Min. Experience
                  {vacancy.minimumExperienceRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{vacancy.minimumExperienceRequirement?.minimumExperience}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">
                  Max. Salary
                  {vacancy.maximumSalaryRequirement?.mustMeetCriteria && <span className="text-error-600">*</span>}
                </th>
                <td className="border-y px-3 py-2">:</td>
                <td className="border-y px-3 py-2 ">{numberToCurrency(vacancy.maximumSalaryRequirement?.maximumSalary)}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

const LoadingSkeleton = Array.from(Array(4)).map((_, i) => (
  <Card key={i}>
    <CardHeader>
      <Skeleton className="h-6 w-1/3" />
    </CardHeader>
    <CardBody className="flex flex-col gap-3 p-3">
      <Skeleton className="h-6" count={4} />
    </CardBody>
  </Card>
))

export default PreviewVacancy
