import { Button, Input } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-xl">Login</h1>

      <form className="flex flex-col gap-3">
        <Input label="Email Address" placeholder="your@exmple.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button block color="primary">
          Login
        </Button>
        <hr />
        <Button block as={Link} componentProps={{ to: '/forgot-password' }} color="primary" variant="light">
          Forgot Password
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
