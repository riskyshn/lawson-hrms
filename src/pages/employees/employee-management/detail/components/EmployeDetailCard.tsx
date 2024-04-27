import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import numberToCurrency from '@/utils/number-to-currency'
import { Alert, Button, Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'

const EmployeDetailCard: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const previewImage = usePreviewImage()
  return (
    <>
      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Personal Data</h3>
          <p className="text-xs">Employee personal basic information data</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Name</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Gender</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.gender?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Religion</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.religion?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Email</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.email}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Phone Number</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.phoneNumber}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Place of Birth</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.cityOfBirth?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Date of Birth</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.birthDate}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Marital Status</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.maritalStatus?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Number of Children</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.numberOfChildren}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs">Employee identity and address information</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">National ID</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">
                  {employee.personalData?.linkNationalId && (
                    <Button
                      type="button"
                      size="small"
                      variant="light"
                      color="primary"
                      onClick={() => previewImage(employee.personalData?.linkNationalId)}
                    >
                      Preview National ID Image
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">National ID Number</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.nationalIdNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Postal Code</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.postalCode}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Nation ID Address</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.nationIdAddress}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Residential Address</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.personalData?.residentalAddress}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Employment Data</h3>
          <p className="text-xs">Employee data information related to company</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Employee ID</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employeeCode}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Role</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.role?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Employment Status</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.jobType?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Branch Placement</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.branch?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Department</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.department?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Position</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.position?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Job Level</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.jobLevel?.name}</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">PIC for Approval</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.picApproval?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Schedule</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.employment?.schedule?.name}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Payroll Information</h3>
          <p className="text-xs">Payroll Information Details</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Tax Method</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.taxMethod?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Base Salary</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{numberToCurrency(employee.payroll?.baseSalary)}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Allow for Overtime</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.allowOvertime ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Bank Information</h3>
          <p className="text-xs">Employee bank information details</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Bank Name</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bank?.bankName}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Account Number</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bank?.accountNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Account Holder Name</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bank?.accountHolderName}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Tax Information</h3>
          <p className="text-xs">The tax calculation type relevant to your company</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Employment Tax Status</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.taxConfig?.taxStatus?.name}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">NPWP Number</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.taxConfig?.npwpNumber}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">PTKP Status</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.taxConfig?.ptkpStatus}</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Category</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.taxConfig?.category}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">BPJS Information</h3>
          <p className="text-xs">Employee BPJS payment arrangements</p>
        </CardHeader>
        {!employee.payroll?.participateBpjs && (
          <Alert color="warning" className="rounded-none border-0">
            This employee is not enrolled in the BPJS KS Program.
          </Alert>
        )}
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-b p-3 text-left" colSpan={3}>
                  Paid by Employer
                </th>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployer?.jht?.rate || 0}%</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Jaminan Kecelakaan Kerja (JKK)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployer?.jkk?.rate || 0}%</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Jaminan Kematian (JKM)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployer?.jkm?.rate || 0}%</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Jaminan Pensiun (JP)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployer?.jp?.rate || 0}%</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Jaminan Kesehatan (JKS)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployer?.jks?.rate || 0}%</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap border-y p-3 text-left" colSpan={3}>
                  Paid by Employee
                </th>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Jaminan Hari Tua (JHT)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployee?.jht?.rate || 0}%</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Jaminan Pensiun (JP)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployee?.jp?.rate || 0}%</td>
              </tr>
              <tr>
                <th className="whitespace-nowrap p-3 text-left">Jaminan Kesehatan (JKS)</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">{employee.payroll?.bpjs?.paidByEmployee?.jks?.rate || 0}%</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default EmployeDetailCard
