import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Card, CardBody, CardFooter, CardHeader, Dropzone } from 'jobseeker-ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import HireModal from '../../Modals/HireModal'

const OfferingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const handleNextButtonClick = () => {
    setShowModal(true)
  }
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Assessment' }, { text: 'Offering Letter' }]} title="Offering Letter" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card>
          <CardHeader className="py-8 text-center">
            <h3 className="text-2xl font-semibold">Offering Letter</h3>
            <p className="text-sm">Please review this document below </p>
          </CardHeader>
          <CardBody className="p-0">
            <iframe src={'/sample.pdf'} className="block h-96 w-full rounded-lg bg-white" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="py-8 text-center">
            <h3 className="text-2xl font-semibold">Upload Document</h3>
            <p className="text-sm">Company Name requires you to submit a signed offering letter in-order to complete the hiring process</p>
          </CardHeader>
          <CardBody className="p-0">
            <Dropzone />
          </CardBody>
          <CardFooter className="gap-3">
            <Button as={Link} to="/process/assessment" type="button" color="primary" variant="light" className="w-32">
              Prev
            </Button>
            <Button type="button" color="primary" className="w-32" onClick={handleNextButtonClick}>
              Next
            </Button>
          </CardFooter>
        </Card>
      </Container>

      <HireModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default OfferingPage
