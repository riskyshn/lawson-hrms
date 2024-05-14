import { forwardRef } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'
import { useLayout } from '../../contexts'

const SidebarContent = forwardRef<HTMLDivElement, React.PropsWithChildren<{ className?: string }>>(({ className, children }, ref) => {
  const { sidebarMini, toggleSidebarMini } = useLayout()
  return (
    <div ref={ref} className="flex w-full flex-1 flex-col overflow-hidden">
      <div className={twMerge('h-full w-full flex-1 overflow-y-auto', className)}>{children}</div>

      <div className="hidden w-full border-t lg:block">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
          onClick={() => toggleSidebarMini()}
        >
          <ArrowLeftIcon size={20} strokeWidth={2.5} className={twJoin(sidebarMini ? ' rotate-180' : '', 'block transition-transform')} />
        </button>
      </div>
    </div>
  )
})

SidebarContent.displayName = 'SidebarContent'

export default SidebarContent
