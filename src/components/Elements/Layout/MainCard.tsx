import { Card, CardBody, CardFooter } from 'jobseeker-ui'
import React, { useEffect, useRef, useState } from 'react'
import ScrollVisibilityContainer from './ScrollVisibilityContainer'

type PropTypes = {
  header: ((isOpenFilter: boolean, toggleOpenFilter: () => void) => React.ReactNode) | React.ReactNode
  body: React.ReactNode
  footer: React.ReactNode
}

const MainCard: React.FC<PropTypes> = ({ header, body, footer }) => {
  const ref = useRef<any>(null)
  const [scrollY, setScrollY] = useState(0)
  const [distance, setDistance] = useState(0)
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  useEffect(() => {
    const handleresize = (): void => {
      if (ref.current) {
        const distanceFromTop = ref.current.getBoundingClientRect().top + window.pageYOffset
        setDistance(distanceFromTop)
      }
    }

    const handlescroll = (): void => {
      setScrollY(window.scrollY)
    }

    handleresize()
    handlescroll()
    window.addEventListener('scroll', handlescroll)
    window.addEventListener('resize', handleresize)

    return () => {
      window.removeEventListener('resize', handleresize)
      window.removeEventListener('scroll', handlescroll)
    }
  }, [])

  const toggleOpenFilter = () => {
    if (isOpenFilter) {
      setIsOpenFilter(false)
    } else {
      setIsOpenFilter(true)
    }
  }

  return (
    <>
      <ScrollVisibilityContainer distance={distance - 64} containerClassName="border-b">
        <div className="grid grid-cols-1 rounded-t-lg bg-white/80 backdrop-blur">
          {typeof header === 'function' ? header(isOpenFilter, toggleOpenFilter) : header}
        </div>
      </ScrollVisibilityContainer>

      <Card>
        <div className="relative z-10 grid grid-cols-1 rounded-t-lg border-b bg-white/80 backdrop-blur">
          {typeof header === 'function' ? header(isOpenFilter && scrollY < distance - 64, toggleOpenFilter) : header}
        </div>

        <CardBody ref={ref} className="overflow-x-auto p-0 2xl:overflow-x-visible">
          {body}
        </CardBody>

        <CardFooter>{footer}</CardFooter>
      </Card>
    </>
  )
}

export default MainCard
