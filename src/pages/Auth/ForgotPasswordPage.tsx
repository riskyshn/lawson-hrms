import { Button, Input } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  return (
    <div className="p-6">
      <h1 className="mb-3 text-center text-xl font-semibold uppercase tracking-widest">Forgot Password</h1>

      <form className="flex flex-col gap-3">
        <Input label="Email Address" placeholder="your@exmple.com" />
        <Button block color="primary" className="font-semibold uppercase tracking-widest">
          Submit
        </Button>
        <div className="text-center">
          <Link to="/auth/login" className="text-xs font-semibold transition-colors hover:text-primary-600">
            Back to login page
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
