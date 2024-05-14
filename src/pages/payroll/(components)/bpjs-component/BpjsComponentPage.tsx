import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Input, Select, useToast } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncAction from '@/core/hooks/use-async-action'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import numberToCurrency from '@/utils/number-to-currency'

const jkkOptions = [0.24, 0.54, 0.89, 1.27, 1.74].map((el) => ({ label: el + '%', value: String(el) }))
const BpjsComponentPage: React.FC = () => {
  const [jkk, setJkk] = useState(0)
  const [loading, setLoading] = useState(false)

  const [bpjsComponent, componentLoading, refresh] = useAsyncAction(payrollService.fetchBpjsComponent)

  const toast = useToast()

  useEffect(() => {
    if (bpjsComponent) setJkk(bpjsComponent?.paidByEmployer?.jkk?.rate || 0)
  }, [bpjsComponent])

  const submit = async () => {
    setLoading(true)
    try {
      await payrollService.updateBpjsComponent({ bpjsComponentId: bpjsComponent?.bpjsComponentId, jkk: { rate: jkk } })
      refresh()
      toast('BPJS component updated successfully.', { color: 'success' })
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'BPJS Component' }]}
        subtitle="Setup Your BPJS Component Settings"
        title="BPJS Component"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form">
          <LoadingScreen show={componentLoading} spinnerSize={80} strokeWidth={1} />

          {!componentLoading && (
            <>
              <CardBody className="grid grid-cols-1 gap-2">
                <div className="pb-2">
                  <h3 className="text-lg font-semibold">BPJS Paid by Employer</h3>
                  <p className="text-xs text-gray-500">Percentage from based salary Paid by Employer as allowance</p>
                </div>
                <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent?.paidByEmployer?.jht?.rate}%`} />
                <Select
                  hideSearch
                  label="Jaminan Kecelakaan Kerja (JKK)"
                  name="jkk"
                  onChange={(v) => setJkk(Number(v))}
                  options={jkkOptions}
                  value={String(jkk)}
                />
                <Input disabled label="Jaminan Kematian (JKM)" value={`${bpjsComponent?.paidByEmployer?.jkm?.rate}%`} />
                <Input
                  disabled
                  help={`JP Maximum Cap ${numberToCurrency(bpjsComponent?.paidByEmployer?.jp?.maxCap)}*`}
                  label="Jaminan Pensiun (JP)"
                  required
                  value={`${bpjsComponent?.paidByEmployer?.jp?.rate}%`}
                />
                <Input
                  disabled
                  help={`JKS Maximum Cap ${numberToCurrency(bpjsComponent?.paidByEmployer?.jks?.maxCap)}*`}
                  label="Jaminan Kesehatan (KS)"
                  required
                  value={`${bpjsComponent?.paidByEmployer?.jks?.rate}%`}
                />
              </CardBody>
              <CardBody className="grid grid-cols-1 gap-2">
                <div className="pb-2">
                  <h3 className="text-lg font-semibold">BPJS Paid by Employee</h3>
                  <p className="text-xs text-gray-500">Percentage from based salary paid by the employee</p>
                </div>
                <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent?.paidByEmployee?.jht?.rate}%`} />
                <Input
                  disabled
                  help={`JP Maximum Cap ${numberToCurrency(bpjsComponent?.paidByEmployee?.jp?.maxCap)}*`}
                  label="Jaminan Pensiun (JP)"
                  required
                  value={`${bpjsComponent?.paidByEmployee?.jp?.rate}%`}
                />
                <Input
                  disabled
                  help={`JKS Maximum Cap ${numberToCurrency(bpjsComponent?.paidByEmployee?.jks?.maxCap)}*`}
                  label="Jaminan Kesehatan (KS)"
                  required
                  value={`${bpjsComponent?.paidByEmployee?.jks?.rate}%`}
                />
              </CardBody>
            </>
          )}

          <CardFooter>
            <Button color="primary" disabled={loading || componentLoading} loading={loading} onClick={submit} type="button">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default BpjsComponentPage
