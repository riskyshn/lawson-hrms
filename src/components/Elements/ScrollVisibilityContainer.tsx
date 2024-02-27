import { useEffect, useState } from 'react'
import { useLayout } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import useScrollDirection from '@/hooks/use-scroll-direction'
import Container from './Container'

type PropTypes = React.PropsWithChildren<{
  distance: number
  containerClassName?: string
}>

const ScrollVisibilityContainer: React.FC<PropTypes> = ({ children, distance, containerClassName }) => {
  const { sidebarMini } = useLayout()
  const [isShow, setIsShow] = useState(false)
  const direction = useScrollDirection()

  const containerProps = {
    children,
    className: containerClassName,
  }

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > distance) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }

    onScroll()

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [distance])

  return (
    <div
      className={twJoin(sidebarMini ? 'lg:pl-16' : 'lg:pl-64', 'fixed left-0 right-0 top-0 z-30 bg-white p-0 pt-16 transition-all')}
      style={{
        transform: `translateY(${isShow && direction == 'up' ? '0' : '-100'}%)`,
      }}
    >
      <Container {...containerProps} />
    </div>
  )
}

export default ScrollVisibilityContainer
