import { Card } from 'jobseeker-ui'
import { Monitor } from 'lucide-react'

const TalentPoolCard: React.FC = () => {
  return (
    <Card className="divide-y-0 bg-gray-100">
      <div className="rounded-lg rounded-b-3xl bg-jsc-secondary p-3 pb-28 text-white">
        <span className="block text-xl font-semibold">Talent Pool</span>
        <span className="block text-sm">You Have 200+ Talents</span>
      </div>

      <div className="-mt-24 grid grid-cols-2 gap-3 p-3">
        <div className="flex flex-col items-center gap-3 rounded-lg border bg-white px-3 py-4 text-center">
          <span className="block text-lg">Product</span>
          <span className="block">
            <Monitor className="text-primary-600" />
          </span>
          <span className="block text-sm">132 Talents</span>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-lg border bg-white px-3 py-4 text-center">
          <span className="block text-lg">Product</span>
          <span className="block">
            <Monitor className="text-primary-600" />
          </span>
          <span className="block text-sm">132 Talents</span>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-lg border bg-white px-3 py-4 text-center">
          <span className="block text-lg">Product</span>
          <span className="block">
            <Monitor className="text-primary-600" />
          </span>
          <span className="block text-sm">132 Talents</span>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-lg border bg-white px-3 py-4 text-center">
          <span className="block text-lg">Product</span>
          <span className="block">
            <Monitor className="text-primary-600" />
          </span>
          <span className="block text-sm">132 Talents</span>
        </div>
      </div>
    </Card>
  )
}

export default TalentPoolCard
