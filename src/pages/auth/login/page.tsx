import { useAuthStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input } from 'jobseeker-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required().label('Email address'),
  password: yup.string().required().label('Password'),
})

export const Component: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm({ resolver: yupResolver(schema) })
  const authstore = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      await authstore.login(data)
      navigate('/')
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <div className="p-6">
      <h1 className="mb-3 text-center text-xl font-semibold uppercase tracking-widest">Login</h1>

      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {!!errorMessage && (
          <Alert className="text-center" color="error">
            {errorMessage}
          </Alert>
        )}

        <div>
          <Input
            error={form.formState.errors.email?.message}
            label="Email Address"
            placeholder="your@exmple.com"
            {...form.register('email')}
          />

          <Input
            error={form.formState.errors.password?.message}
            label="Password"
            placeholder="••••••••"
            type="password"
            {...form.register('password')}
          />
        </div>

        <Button
          block
          className="font-semibold uppercase tracking-widest"
          color="primary"
          disabled={isLoading}
          loading={isLoading}
          type="submit"
        >
          Login
        </Button>

        <div className="text-center">
          <Link className="text-xs font-semibold transition-colors hover:text-primary-600" to="/auth/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  )
}

Component.displayName = 'LoginPage'
