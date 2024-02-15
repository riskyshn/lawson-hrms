import { Breadcrumb, BreadcrumbProps } from 'jobseeker-ui'
import { twMerge } from 'tailwind-merge'

type PropTypes = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: BreadcrumbProps['links']
  className?: string
}

const PageHeader: React.FC<PropTypes> = ({ title, subtitle, actions, breadcrumb, className }) => {
  return (
    <>
      {breadcrumb && <Breadcrumb className="border-b bg-white px-3 py-2" links={breadcrumb} />}
      <div className={twMerge('flex p-3', className)}>
        <div className="flex-1">
          <h1 className="mb-3 text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </>
  )
}

export default PageHeader
