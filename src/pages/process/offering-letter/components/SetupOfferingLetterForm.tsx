// import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Dropzone, Input, Textarea } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
// import { updateCompany } from '@/services/organization.service'

const SetupOfferingLetterForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [formData, setFormData] = useState({
  //   name: '',
  //   nppNumber: '',
  //   npwpNumber: '',
  //   logo: '',
  //   greetingMessage: '',
  // })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // await updateCompany(formData)
      console.log('Company updated successfully!')
    } catch (error) {
      console.error('Error updating company:', error)
    }
  }

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Setup Offering Letter</h3>
          <p className="text-xs text-gray-500">Adjust your offering letter template</p>
        </div>
        <p className="text-xs">
          Letter Head<span className="text-red-600">*</span>
        </p>
        <Dropzone />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Greetings" />
          <Input label="Candidate Name" disabled />
        </div>
        <Textarea label="Body" />
        <Input label="Salary & Benefits" disabled />
        <Textarea label="Additional Information" />
        <Input label="Signee Role" />
        <Input label="Signee Full Name" />

        <p className="text-xs">Upload Signature</p>
        <Dropzone />
      </CardBody>

      <CardFooter>
        <Button as={Link} to="/process/offering-letter/preview" variant="light" color="primary" className="mr-3">
          Preview Template
        </Button>
        <Button as={Link} to="/process/offering-letter" type="submit" color="primary" className="w-32">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SetupOfferingLetterForm
