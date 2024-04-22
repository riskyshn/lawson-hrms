import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input } from 'jobseeker-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import ResendEmailButton from './components/ResendEmailButton'

const schema = yup.object({
  email: yup.string().email().required().label('Email address'),
})

export const Component: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      setErrorMessage('')
      await authService.forgotPasswordRequest(data)
      setIsSuccess(true)
      setIsComplete(true)
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsSuccess(false)
    }
    setIsLoading(false)
  })

  const email = getValues('email')

  return (
    <div className="flex flex-col gap-3 p-6">
      <h1 className="text-center text-xl font-semibold uppercase tracking-widest">Forgot Password</h1>

      {!!errorMessage && (
        <Alert color="error" className="text-center">
          {errorMessage}
        </Alert>
      )}

      {isSuccess && (
        <Alert color="primary" className="text-center">
          Password reset instructions have been sent to your email address: <strong>{email}</strong>. If you don't receive an email within a
          few minutes, please check your spam folder.
          <ResendEmailButton email={email || ''} minutes={3} />
        </Alert>
      )}

      {!isComplete && (
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <Input label="Email Address" labelRequired placeholder="your@exmple.com" error={errors.email?.message} {...register('email')} />
          <Button block color="primary" className="font-semibold uppercase tracking-widest" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </form>
      )}

      <div className="text-center">
        <Link to="/auth/login" className="text-xs font-semibold transition-colors hover:text-primary-600">
          Back to login page
        </Link>
      </div>
    </div>
  )
}

Component.displayName = 'ForgotPasswordPage'
