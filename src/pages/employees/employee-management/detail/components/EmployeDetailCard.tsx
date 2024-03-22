import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'
import getCategory from '../../utils/get-category'

const EmployeDetailCard: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Personal Data</h3>
          <p className="text-xs text-gray-500">Employee personal basic information data</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Name</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Gender</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.gender?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Religion</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.religion?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Email</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.email}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Phone Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.phoneNumber}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Place of Birth</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.cityOfBirth?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Date of Birth</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.birthDate}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Marital Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.maritalStatus?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Number of Children</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.numberOfChildren}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs text-gray-500">Employee identity and address information</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.linkNationalId}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.nationalIdNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Postal Code</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.postalCode}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Nation ID Address</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.nationIdAddress}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Residential Address</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.personalData?.residentalAddress}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Employment Data</h3>
          <p className="text-xs text-gray-500">Employee data information related to company</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employee ID</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employeeId}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Role</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.role?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employment Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.jobType?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Branch Placement</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.branch?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Department</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.department?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Position</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.position?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Job Level</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.jobLevel?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">PIC for Approval</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.picApproval?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Schedule</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.employment?.schedule?.name}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Payroll Information</h3>
          <p className="text-xs text-gray-500">Payroll Information Details</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Tax Method</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.taxMethod}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Base Salary</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.baseSalary}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Allow for Overtime</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.allowOvertime ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Bank Information</h3>
          <p className="text-xs text-gray-500">Employee bank information details</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Bank Name</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bank?.bankName}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bank?.accountNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Holder Name</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bank?.accountHolderName}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Tax Information</h3>
          <p className="text-xs text-gray-500">The tax calculation type relevant to your company</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employment Tax Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.taxConfig?.taxStatus}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">NPWP Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.taxConfig?.npwpNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">PTKP Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.taxConfig?.ptkpStatus}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Category</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{getCategory(employee.payroll?.taxConfig?.ptkpStatus)}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">BPJS Information</h3>
          <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left" colSpan={3}>
                  Paid by Company
                </th>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByCompany?.jht || 'N/A'}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kecelakaan Kerja (JKK)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByCompany?.jkk || 'N/A'}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kematian (JKM)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByCompany?.jkm || 'N/A'}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByCompany?.jp || 'N/A'}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (JKS)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByCompany?.jks || 'N/A'}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left" colSpan={3}>
                  Paid by Employee
                </th>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByEmployee?.jht || 'N/A'}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByEmployee?.jp || 'N/A'}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (JKS)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">{employee.payroll?.bpjs?.paidByEmployee?.jks || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default EmployeDetailCard
