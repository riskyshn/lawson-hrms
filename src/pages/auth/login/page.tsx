import { useState } from 'react'
import { Alert, Button, Input } from 'jobseeker-ui'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuthStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'

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
          <Alert color="error" className="text-center">
            {errorMessage}
          </Alert>
        )}

        <div>
          <Input
            label="Email Address"
            placeholder="your@exmple.com"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </div>

        <Button
          type="submit"
          block
          disabled={isLoading}
          loading={isLoading}
          color="primary"
          className="font-semibold uppercase tracking-widest"
        >
          Login
        </Button>

        <div className="text-center">
          <Link to="/auth/forgot-password" className="text-xs font-semibold transition-colors hover:text-primary-600">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  )
}

Component.displayName = 'LoginPage'
