import ImageUploader from '@/components/Elements/ImageUploader'
import { organizationService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object().shape({
  nppNumber: yup.string().required().label('NPP Number'),
  npwpNumber: yup.string().required().label("Company's NPWP Number"),
  logoUrl: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Company Logo'),
  greetingMsg: yup.string().required().label('Greeting Message'),
})

const SettingsCompanyForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { company, refreshCompany } = useOrganizationStore()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!company) return
    setValue('nppNumber', company.nppNumber || '')
    setValue('npwpNumber', company.npwpNumber || '')
    setValue('greetingMsg', company.greetingMsg || '')
    setValue('logoUrl', company.logo?.file || '')
    trigger(['logoUrl', 'nppNumber', 'greetingMsg', 'npwpNumber'])
  }, [company, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('')
    setIsLoading(true)
    try {
      await organizationService.updateCompany(data)
      await refreshCompany()
      toast('Company information successfully updated!', { color: 'success' })
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Company Settings</h3>
          <p className="text-xs text-gray-500">Setup Your Company Information</p>
        </div>

        {errorMessage && (
          <Alert color="error" hideable>
            {errorMessage}
          </Alert>
        )}

        <Input label="Company Name" labelRequired placeholder="Company Name" required defaultValue={company?.name} disabled />

        <Input
          label="NPP Number"
          labelRequired
          placeholder="Example: 12345678912345"
          error={errors.nppNumber?.message}
          {...register('nppNumber')}
        />
        <Input
          label="Company’s NPWP Number"
          labelRequired
          placeholder="Example: 12345678912345"
          error={errors.npwpNumber?.message}
          {...register('npwpNumber')}
        />
        <InputWrapper label="Company Logo" labelRequired error={errors.logoUrl?.message}>
          <ImageUploader
            value={getValues('logoUrl')}
            error={errors.logoUrl?.message}
            onStart={() => {
              setValue('logoUrl', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('logoUrl', value)
              trigger('logoUrl')
            }}
            onError={(message) => {
              setValue('logoUrl', ERROR_PREFIX_KEY + message)
              trigger('logoUrl')
            }}
          />
        </InputWrapper>
        <Textarea
          label="Greeting Message"
          labelRequired
          placeholder="Add greeting message here"
          rows={6}
          error={errors.greetingMsg?.message}
          {...register('greetingMsg')}
        />
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32" disabled={isLoading} loading={isLoading}>
          Save Change
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SettingsCompanyForm
