import { Card } from '@jshrms/ui'
import { twJoin } from 'tailwind-merge'

const PageCard = (props: any) => {
  const { activeLabel, label, onClick } = props

  // Check if the current label matches the activeLabel
  const isActive = label === activeLabel

  return (
    <Card
      as="button"
      className={twJoin(
        'flex items-center justify-center gap-2 divide-y-0 rounded-lg border p-3',
        isActive ? 'border-primary-600 bg-primary-600 text-white' : 'hover:border-gray-300 hover:bg-gray-100',
      )}
      onClick={() => onClick(label)}
    >
      <span className="block w-full whitespace-nowrap text-center text-sm font-semibold">{label}</span>
    </Card>
  )
}

export default PageCard
