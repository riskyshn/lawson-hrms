import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Card, CardBody, CardFooter, Input, Select } from 'jobseeker-ui'
import React from 'react'

const BpjsComponentPage: React.FC = () => {
  const jkkOptions = [0.24, 0.54, 0.89, 1.27, 1.74].map((el) => ({ label: el + '%', value: el }))

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'BPJS Component' }]}
        title="BPJS Component"
        subtitle="Setup Your BPJS Component Settings"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form">
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">BPJS Paid by Employer</h3>
              <p className="text-xs text-gray-500">Percentage from based salary paid by company as allowance</p>
            </div>
            <Input label="Jaminan Hari Tua (JHT)" disabled value="3.7%" />
            <Select label="Jaminan Kecelakaan Kerja (JKK)" value={0.24} options={jkkOptions} hideSearch name="jkk" />
            <Input label="Jaminan Kematian (JKM)" disabled value="0.3%" />
            <Input label="Jaminan Pensiun (JP)" disabled required value="2%" help="JP Maximum Cap Rp 191.192,00*" />
            <Input label="Jaminan Kesehatan (KS)" disabled required value="4%" help="KS Maximum Cap Rp 480.000,00*" />
          </CardBody>
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">BPJS Paid by Employee</h3>
              <p className="text-xs text-gray-500">Percentage from based salary paid by the employee</p>
            </div>
            <Input label="Jaminan Hari Tua (JHT)" disabled value="3.7%" />
            <Input label="Jaminan Pensiun (JP)" disabled required value="2%" help="JP Maximum Cap Rp 95.596,00*" />
            <Input label="Jaminan Kesehatan (KS)" disabled required value="1%" help="KS Maximum Cap Rp 120.000,00*" />
          </CardBody>

          <CardFooter>
            <Button type="button" color="primary">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default BpjsComponentPage
