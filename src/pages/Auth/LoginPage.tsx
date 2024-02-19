import { Button, Input } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-xl">Login</h1>

      <form className="flex flex-col gap-3">
        <Input label="Email Address" placeholder="your@exmple.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button block color="primary" className="font-semibold uppercase tracking-widest">
          Login
        </Button>
        <div className="text-center">
          <Link to="/forgot-password" className="text-xs font-semibold transition-colors hover:text-primary-600">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
