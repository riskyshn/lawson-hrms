import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import LoadingScreen from '@/components/UI/LoadingScreen'
import { payrollService } from '@/services'
import { Card, CardHeader } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailRunRequestPage: React.FC = () => {
  const [pageData, setPageData] = useState<IPayrollRequest>()
  const [pageError, setPageError] = useState<any>()

  const { payrollRequestId } = useParams()

  useEffect(() => {
    if (!payrollRequestId) return
    const load = async () => {
      try {
        const data = await payrollService.fetchPayrollRequest(payrollRequestId)
        setPageData(data)
      } catch (e) {
        setPageError(e)
      }
    }
    load()
  }, [payrollRequestId])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Run Payroll Request' }, { text: 'Detail' }]}
        title="Detail Payroll Request"
        subtitle="You can review or manage employee payroll components."
      />

      <LoadingScreen show={!pageData} />

      {pageData && pageData.status?.oid == '0' && (
        <Container className="py-3 xl:pb-8">
          <Card>
            <CardHeader>
              <LoadingScreen show>
                <p className="mt-3 block text-center">
                  This payroll request is currently waiting for all data to be generated.
                  <br />
                  Once all data is available, you can review or manage employee payroll components.
                </p>
              </LoadingScreen>
            </CardHeader>
          </Card>
        </Container>
      )}
    </>
  )
}

export default DetailRunRequestPage
