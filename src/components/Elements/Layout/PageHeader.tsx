import { Breadcrumb, BreadcrumbProps } from 'jobseeker-ui'
import { twMerge } from 'tailwind-merge'

import Container from './Container'

type PropTypes = {
  actions?: React.ReactNode
  breadcrumb?: BreadcrumbProps['links']
  className?: string
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const PageHeader: React.FC<PropTypes> = ({ actions, breadcrumb, className, subtitle, title }) => {
  return (
    <>
      {breadcrumb && (
        <Container className="border-b bg-white py-2">
          <Breadcrumb links={breadcrumb} />
        </Container>
      )}

      {title && (
        <Container className={twMerge('flex flex-col gap-3 pb-3 pt-6 lg:flex-row', className)}>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center">{actions}</div>}
        </Container>
      )}
    </>
  )
}

export default PageHeader
