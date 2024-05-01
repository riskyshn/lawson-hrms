import Container from '@/components/Elements/Layout/Container'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { payrollService } from '@/services'
import { Card, CardHeader } from 'jobseeker-ui'
import { AlertOctagonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PayrollRequestDetail from '../../components/PayrollRequestDetail'

const DetailRunRequestPage: React.FC = () => {
  const [pageData, setPageData] = useState<IPayrollRequest>()
  const [pageError, setPageError] = useState<any>()

  const { payrollRequestId } = useParams()

  useEffect(() => {
    if (!payrollRequestId) return

    const load = async (oid: string) => {
      try {
        const data = await payrollService.fetchPayrollRequest(oid)
        setPageData(data)
        return data
      } catch (e) {
        setPageError(e)
      }
    }

    load(payrollRequestId)
    const timer = setInterval(async () => {
      const data = await load(payrollRequestId)
      if (data?.statusRunner !== 'WAITING' && data?.statusRunner !== 'ON_PROGRESS') {
        clearInterval(timer)
      }
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [payrollRequestId])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Run Payroll Request' }, { text: 'Detail' }]}
        subtitle="You can review or manage employee payroll components."
        title="Detail Payroll Request"
      />

      <Container className="py-3 xl:pb-8">
        <LoadingScreen show={!pageData} />

        {pageData && pageData.statusRunner == 'WAITING' && (
          <Card>
            <CardHeader>
              <LoadingScreen show>
                <p className="mt-3 block text-center">Please wait while the payroll request is being processed...</p>
              </LoadingScreen>
            </CardHeader>
          </Card>
        )}

        {pageData && pageData.statusRunner == 'ON_PROCESS' && (
          <Card>
            <CardHeader>
              <LoadingScreen show>
                <p className="mt-3 block text-center">The payroll request is currently being processed. Please wait...</p>
              </LoadingScreen>
            </CardHeader>
          </Card>
        )}

        {pageData && pageData.statusRunner == 'FAILED' && (
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center justify-center py-40">
                <AlertOctagonIcon className="mb-3 block text-error-600" size={84} strokeWidth={1} />
                <p className="mt-3 block text-center">
                  Oops! Something went wrong while processing the payroll request. Please try again later.
                </p>
              </div>
            </CardHeader>
          </Card>
        )}

        {pageData && pageData.statusRunner == 'COMPLETED' && <PayrollRequestDetail item={pageData} />}
      </Container>
    </>
  )
}

export default DetailRunRequestPage
