import { Check } from 'lucide-react'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
}

const CreateJobStep = () => {
  return (
    <div className="w-full rounded-lg border bg-white">
      <Steps>
        <Step />
      </Steps>
    </div>
  )
}

const Steps = ({ children }: Props) => {
  return (
    <>
      <div className="grid grid-cols-3 rounded-lg bg-gray-50">{children}</div>
    </>
  )
}

const Step = (/* { children }: Props */) => {
  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-success-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex w-14 items-center justify-center rounded-lg bg-success-700 p-2 text-lg font-semibold text-white">1</div>
          <div>
            <span className="block font-semibold leading-none text-success-700">Vacancy Information</span>
            <small className="leading-none text-success-700">Setup Your Vacancy</small>
          </div>
        </div>
        <div>
          <Check className="text-success-700" />
        </div>
      </div>

      <div className="rounded-lg bg-white  p-4">
        <div className="flex items-center gap-3">
          <div className="flex w-14 items-center justify-center rounded-lg bg-jsc-secondary p-2 text-lg font-semibold text-white">2</div>
          <div>
            <span className="block font-semibold leading-none text-jsc-secondary">Process</span>
            <small className="leading-none">Set Recruitment Process</small>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="flex w-14 items-center justify-center rounded-lg bg-gray-200 p-2 text-lg font-semibold text-gray-500">3</div>
          <div>
            <span className="block font-semibold leading-none text-gray-500">Requirements</span>
            <small className="leading-none text-gray-500">Set Requirements</small>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateJobStep
