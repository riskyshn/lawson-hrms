import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, LoadingScreen, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils'

const schema = yup.object().shape({
  password: yup.string().required().label('New Password'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password confirmation is not match'),
})

export const Component: React.FC = () => {
  const [searchParams] = useSearchParams()

  const [checkingToken, setCheckingToken] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [pageError, setPageError] = useState<any>()

  const toast = useToast()
  const navigate = useNavigate()

  const token = searchParams.get('token') || ''
  const email = searchParams.get('identify') || ''

  // Initialize React Hook Form
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!token || !email) {
      setPageError({ message: 'Invalid or missing token or email.', status: 400 })
      return
    }

    const checkToken = async () => {
      try {
        await authService.checkforgotPasswordToken({ token })
        setCheckingToken(false)
      } catch {
        setPageError({ message: 'The token has expired or is invalid. Please request a new one.', status: 419 })
      }
    }

    checkToken()
  }, [token, email])

  // Handle form submission
  const onSubmit = handleSubmit(async ({ password }) => {
    setIsLoading(true)
    try {
      await authService.resetPassword({ email, password, passwordConfirmation: password, token })
      toast('Password reset successfully. You can now log in with your new password.', { color: 'success' })
      navigate('/auth/login')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setIsLoading(false)
    }
  })

  if (pageError) throw pageError

  return (
    <div className="p-6">
      <h1 className="text-center text-xl">Reset Password</h1>
      <LoadingScreen show={checkingToken} />
      {!checkingToken && (
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <Input disabled label="Email Address" name="email" value={email} />
          <Input
            error={errors.password?.message}
            label="New Password"
            labelRequired
            placeholder="••••••••"
            type="password"
            {...register('password')}
          />
          <Input
            error={errors.passwordConfirmation?.message}
            label="Confirm Password"
            labelRequired
            placeholder="••••••••"
            type="password"
            {...register('passwordConfirmation')}
          />
          <Button
            block
            className="font-semibold uppercase tracking-widest"
            color="primary"
            disabled={isLoading}
            loading={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}

Component.displayName = 'ResetPasswordPage'
