import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'

const EmployeDetailCard: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  return (
    <>
      <Card className="mb-4">
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
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Religion</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Email</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Phone Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Place of Birth</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Date of Birth</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Marital Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Number of Children</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs text-gray-500">Employee identity address information</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Postal Code</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Nation ID Address</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Residential Address</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
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
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Role</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employment Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Branch Placement</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Department</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Position</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Job Level</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">PIC for Approval</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Schedule</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
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
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Base Salary</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Allow for Overtime</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
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
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Holder Name</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
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
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">NPWP Number</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">PTKP Status</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Category</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">BPJS Information</h3>
          <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Paid by Company</th>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kecelakaan Kerja (JKK)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kematian (JKM)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (KS)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Paid by Employee</th>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (KS)</th>
                <td className="border-y px-3 py-2">:</td>
                <td className="w-full border-y px-3 py-2">Test</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default EmployeDetailCard
