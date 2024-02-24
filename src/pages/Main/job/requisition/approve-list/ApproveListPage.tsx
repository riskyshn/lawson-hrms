import Container from '@/components/Elements/Container'
import PageHeader from '@/components/UI/PageHeader'
import { BaseInput, Button, Card, CardBody, CardFooter, Select } from 'jobseeker-ui'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const ApproveListPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Approve List' }]}
        title="Setup Approval"
        subtitle="Setup Approval Process for Your Job Requisition"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form">
          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Approval</h3>

            <Select placeholder="Please Select Aprover" options={[]} />

            <div className="flex gap-1">
              <BaseInput placeholder="Name 1" />
              <Button color="error" iconOnly>
                <MinusCircleIcon size={16} />
              </Button>
            </div>
            <div className="flex gap-1">
              <BaseInput placeholder="Name 2" />
              <Button color="error" iconOnly>
                <MinusCircleIcon size={16} />
              </Button>
            </div>
            <Button block variant="light" color="primary">
              <PlusCircleIcon size={16} />
            </Button>
          </CardBody>

          <CardFooter className="gap-3">
            <Button type="submit" color="error" variant="light" className="w-32">
              Back
            </Button>
            <Button type="submit" color="primary" className="w-32">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default ApproveListPage
