import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Dropzone, Input, Textarea } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
import { updateCompany } from '@/services/organization.service'
import { useAuthStore } from '@/store'

const SettingsCompanyForm: React.FC = () => {
  const { user } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    nppNumber: '',
    npwpNumber: '',
    logo: '',
    greetingMessage: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(user)
      await updateCompany(formData) // Call updateCompany function with form data
      console.log('Company updated successfully!')
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating company:', error)
      // Handle error, show error message, etc.
    }
  }

  console.log(user)

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Company Settings</h3>
          <p className="text-xs text-gray-500">Setup Your Company Information</p>
        </div>

        <Input label="Company Name" placeholder="Company Name" required value={formData.name} disabled />

        <Input
          name="nppNumber"
          value={formData.nppNumber}
          onChange={handleChange}
          type="number"
          placeholder="Example: 12345678912345"
          label="NPP Number"
          required
        />
        <Input
          name="npwpNumber"
          value={formData.npwpNumber}
          onChange={handleChange}
          type="number"
          placeholder="Example: 12345678912345"
          label="Company’s NPWP Number"
          required
        />
        <div>
          <label htmlFor="dropzone" className="text-xs">
            Upload Company Logo
          </label>
          <Dropzone id="dropzone" name="dropzone" />
        </div>
        <Textarea
          name="greetingMessage"
          value={formData.greetingMessage}
          onChange={handleChange}
          label="Greeting Message"
          placeholder="Add greeting message here"
          rows={6}
          required
        />
      </CardBody>

      <CardFooter>
        <Button as={Link} to="/settings/company" variant="light" color="primary" className="mr-3 w-32">
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-32">
          Save Change
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SettingsCompanyForm
