import { useLayout, useScrollDirection } from 'jobseeker-ui'
import { useEffect, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import Container from './Container'

type PropTypes = React.PropsWithChildren<{
  distance: number
  containerClassName?: string
}>

const ScrollVisibilityContainer: React.FC<PropTypes> = ({ children, distance, containerClassName }) => {
  const { sidebarMini } = useLayout()
  const [isShow, setIsShow] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scrollDirection: direction, setScrollDirection } = useScrollDirection()

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

  useEffect(() => {
    const handleScroll = (): void => {
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setScrollDirection('up')
      }, 500)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
