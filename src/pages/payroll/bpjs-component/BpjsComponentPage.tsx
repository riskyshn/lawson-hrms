import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import numberToCurrency from '@/utils/number-to-currency'
import { Button, Card, CardBody, CardFooter, Input, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

const jkkOptions = [0.24, 0.54, 0.89, 1.27, 1.74].map((el) => ({ label: el + '%', value: el }))
const BpjsComponentPage: React.FC = () => {
  const [pageData, setPageData] = useState<IBPJSComponent>()
  const [pageError, setPageError] = useState<any>()

  const [jkk, setJkk] = useState(0)
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await payrollService.fetchBpjsComponent()
        setPageData(data)
        setJkk(data.paidByEmployer?.jkk?.rate || 0)
      } catch (e) {
        setPageError(e)
      }
    }
    load()
  }, [])

  const submit = async () => {
    setLoading(true)
    try {
      const data = await payrollService.updateBpjsComponent({ bpjsComponentId: pageData?.bpjsComponentId, jkk: { rate: jkk } })
      setPageData(data)
      toast('BPJS component updated successfully.', { color: 'success' })
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'BPJS Component' }]}
        title="BPJS Component"
        subtitle="Setup Your BPJS Component Settings"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        {!pageData && (
          <div className="flex items-center justify-center py-48">
            <Spinner height={40} className="text-primary-600" />
          </div>
        )}

        {pageData && (
          <Card as="form">
            <CardBody className="grid grid-cols-1 gap-2">
              <div className="pb-2">
                <h3 className="text-lg font-semibold">BPJS Paid by Employer</h3>
                <p className="text-xs text-gray-500">Percentage from based salary Paid by Employer as allowance</p>
              </div>
              <Input label="Jaminan Hari Tua (JHT)" disabled value={`${pageData.paidByEmployer?.jht?.rate}%`} />
              <Select
                label="Jaminan Kecelakaan Kerja (JKK)"
                options={jkkOptions}
                hideSearch
                name="jkk"
                value={jkk}
                onChange={(v) => setJkk(Number(v))}
              />
              <Input label="Jaminan Kematian (JKM)" disabled value={`${pageData.paidByEmployer?.jkm?.rate}%`} />
              <Input
                label="Jaminan Pensiun (JP)"
                disabled
                required
                value={`${pageData.paidByEmployer?.jp?.rate}%`}
                help={`JP Maximum Cap ${numberToCurrency(pageData.paidByEmployer?.jp?.maxCap)}*`}
              />
              <Input
                label="Jaminan Kesehatan (KS)"
                disabled
                required
                value={`${pageData.paidByEmployer?.jks?.rate}%`}
                help={`JKS Maximum Cap ${numberToCurrency(pageData.paidByEmployer?.jks?.maxCap)}*`}
              />
            </CardBody>
            <CardBody className="grid grid-cols-1 gap-2">
              <div className="pb-2">
                <h3 className="text-lg font-semibold">BPJS Paid by Employee</h3>
                <p className="text-xs text-gray-500">Percentage from based salary paid by the employee</p>
              </div>
              <Input label="Jaminan Hari Tua (JHT)" disabled value={`${pageData.paidByEmployee?.jht?.rate}%`} />
              <Input
                label="Jaminan Pensiun (JP)"
                disabled
                required
                value={`${pageData.paidByEmployee?.jp?.rate}%`}
                help={`JP Maximum Cap ${numberToCurrency(pageData.paidByEmployee?.jp?.maxCap)}*`}
              />
              <Input
                label="Jaminan Kesehatan (KS)"
                disabled
                required
                value={`${pageData.paidByEmployee?.jks?.rate}%`}
                help={`JKS Maximum Cap ${numberToCurrency(pageData.paidByEmployee?.jks?.maxCap)}*`}
              />
            </CardBody>

            <CardFooter>
              <Button type="button" color="primary" disabled={loading} loading={loading} onClick={submit}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  )
}

export default BpjsComponentPage
