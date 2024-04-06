import { Button, Input } from 'jobseeker-ui'

const ResetPasswordPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-xl">Reset Password</h1>

      <form className="flex flex-col gap-3">
        <Input label="Email Address" placeholder="your@exmple.com" />
        <Input label="New Password" type="password" placeholder="••••••••" />
        <Input label="Confirm Password" type="password" placeholder="••••••••" />
        <Button block color="primary" className="font-semibold uppercase tracking-widest">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
