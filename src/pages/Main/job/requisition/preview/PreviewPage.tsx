import Container from '@/components/Elements/Container'
import PageHeader from '@/components/UI/PageHeader'
import { Button, Card, CardBody, CardFooter, CardHeader, Textarea } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const PreviewPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Preview Requisition' }]}
        title="Preview Job Requisition"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 p-3 pt-0 xl:pb-8">
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
                  <td className="w-full border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2 ">JSC_0000001</td>
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
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="w-full border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2 ">JSC_0000001</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Recruitment Process</h3>
          </CardHeader>
          <CardBody className="p-0">
            <table className="table w-full text-sm">
              <tbody>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="w-full border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2 ">JSC_0000001</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Requirements</h3>
          </CardHeader>
          <CardBody className="p-0">
            <table className="table w-full text-sm">
              <tbody>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="w-full border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2">JSC_0000001</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <th className="whitespace-nowrap border-y px-3 py-2 text-left">FPTK Number</th>
                  <td className="border-y px-3 py-2">:</td>
                  <td className="border-y px-3 py-2 ">JSC_0000001</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Textarea label="Notes" placeholder="Add Your Notes Here" />
          </CardBody>

          <CardFooter className="gap-3">
            <Button type="submit" color="error" className="w-32">
              Reject
            </Button>
            <Button type="submit" color="primary" className="w-32">
              Approve
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default PreviewPage
