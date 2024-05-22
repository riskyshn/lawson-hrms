import type { IEmployee } from '@/types'
import React from 'react'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'

const PayrollDetailCard: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  return (
    <>
      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Salary</h3>
          <p className="text-xs">Salary information data</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              <tr className="odd:bg-gray-50">
                <th className="whitespace-nowrap p-3 text-left">Base Salary</th>
                <td className="p-3">:</td>
                <td className="w-full p-3">Rp. {employee.payroll?.baseSalary}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Benefits Components</h3>
          <p className="text-xs">Benefits Components information data</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              {employee.components?.benefits?.map((detail, index) => (
                <React.Fragment key={index}>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">{detail.component?.name}</th>
                    <td className="p-3"></td>
                    <td className="w-full p-3"></td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Amount Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.amountType?.name}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Amount</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">
                      {detail.amountType?.name === 'Percentage' ? `${detail.amount}%` : `Rp. ${detail.amount}`}
                    </td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Max Cap</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">Rp. {detail.maxCap}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Application Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.applicationType?.name}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Tax Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.taxType?.name}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className=" overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Deductions Components</h3>
          <p className="text-xs">Deductions Components information data</p>
        </CardHeader>
        <CardBody className="p-0">
          <table className="table w-full text-sm">
            <tbody>
              {employee.components?.deductions?.map((detail, index) => (
                <React.Fragment key={index}>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">{detail.component?.name}</th>
                    <td className="p-3"></td>
                    <td className="w-full p-3"></td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Amount Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.amountType?.name}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Amount</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">
                      {detail.amountType?.name === 'Percentage' ? `${detail.amount}%` : `Rp. ${detail.amount}`}
                    </td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Max Cap</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">Rp. {detail.maxCap}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Application Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.applicationType?.name}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Tax Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{detail.taxType?.name}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}

export default PayrollDetailCard
