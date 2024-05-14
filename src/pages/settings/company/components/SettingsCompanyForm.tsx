import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ImageFileUpload from '@jshrms/shared/components/Elements/FileUploads/ImageFileUpload'
import { organizationService } from '@jshrms/shared/services'
import { useAuthStore } from '@jshrms/shared/store'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { Alert, Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea, useToast } from '@jshrms/ui'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object().shape({
  greetingMsg: yup.string().required().label('Greeting Message'),
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
  nppNumber: yup.string().required().label('NPP Number'),
  npwpNumber: yup.string().required().label("Company's NPWP Number"),
})

const SettingsCompanyForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { company, refreshAuth } = useAuthStore()
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
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
      await refreshAuth()
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

        <Input defaultValue={company?.name} disabled label="Company Name" labelRequired placeholder="Company Name" required />

        <Input
          error={errors.nppNumber?.message}
          label="NPP Number"
          labelRequired
          placeholder="Example: 12345678912345"
          {...register('nppNumber')}
        />
        <Input
          error={errors.npwpNumber?.message}
          label="Company’s NPWP Number"
          labelRequired
          placeholder="Example: 12345678912345"
          {...register('npwpNumber')}
        />
        <InputWrapper error={errors.logoUrl?.message} label="Company Logo" labelRequired>
          <ImageFileUpload
            error={errors.logoUrl?.message}
            onChange={(value) => {
              setValue('logoUrl', value)
              trigger('logoUrl')
            }}
            onError={(message) => {
              setValue('logoUrl', ERROR_PREFIX_KEY + message)
              trigger('logoUrl')
            }}
            onStart={() => {
              setValue('logoUrl', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('logoUrl')}
          />
        </InputWrapper>
        <Textarea
          error={errors.greetingMsg?.message}
          label="Greeting Message"
          labelRequired
          placeholder="Add greeting message here"
          rows={6}
          {...register('greetingMsg')}
        />
      </CardBody>

      <CardFooter>
        <Button className="w-32" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Save Change
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SettingsCompanyForm
