import { Button, Input } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-xl">Forgot Password</h1>

      <form className="flex flex-col gap-3">
        <Input label="Email Address" placeholder="your@exmple.com" />
        <Button block color="primary">
          Submit
        </Button>
        <hr />
        <Button block as={Link} componentProps={{ to: '/login' }} color="primary" variant="light">
          Back to login
        </Button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
