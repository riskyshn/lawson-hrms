import React, { useEffect, useState } from 'react'
import { Button, Input, useToast } from 'jobseeker-ui'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'

const schema = yup.object().shape({
  password: yup.string().required().label('New Password'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password confirmation is not match'),
})

const ResetPasswordPage: React.FC = () => {
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!token || !email) {
      setPageError({ status: 400, message: 'Invalid or missing token or email.' })
      return
    }

    const checkToken = async () => {
      try {
        await authService.checkforgotPasswordToken({ token })
        setCheckingToken(false)
      } catch (e) {
        setPageError({ status: 410, message: 'Expired or invalid token. Please request a new one.' })
      }
    }

    checkToken()
  }, [token, email])

  // Handle form submission
  const onSubmit = handleSubmit(async ({ password }) => {
    setIsLoading(true)
    try {
      await authService.resetPassword({ email, token, password })
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
          <Input label="Email Address" name="email" value={email} disabled />
          <Input
            label="New Password"
            labelRequired
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            labelRequired
            type="password"
            placeholder="••••••••"
            error={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />
          <Button
            type="submit"
            block
            color="primary"
            className="font-semibold uppercase tracking-widest"
            disabled={isLoading}
            loading={isLoading}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}

export default ResetPasswordPage
