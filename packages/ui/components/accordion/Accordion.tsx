import type { AccordionProps } from './types'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'

const Accordion: React.FC<AccordionProps> = ({ items, className, ...props }) => {
  const [active, setActive] = useState<number | null>(null)

  const handleClick = (index: number) => {
    if (active === index) {
      setActive(null)
    } else {
      setActive(index)
    }
  }

  return (
    <div className={twMerge('divide-y overflow-hidden rounded-lg border', className)} {...props}>
      {items.map(({ header, body }, index) => (
        <div key={index} className="accordion-item">
          <button
            type="button"
            onClick={() => handleClick(index)}
            className={twJoin(
              active === index && 'bg-gray-50 text-primary-600',
              'flex w-full items-center justify-between px-3 py-4 font-semibold transition-colors',
            )}
          >
            <span>{header}</span>
            <ChevronDown size={16} className={twJoin(active === index && 'rotate-180', 'transition-transform')} />
          </button>
          <div className={twJoin(active !== index && 'h-0 overflow-hidden opacity-0', 'transition-opacity')}>
            <div className="p-3 text-sm">{body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
