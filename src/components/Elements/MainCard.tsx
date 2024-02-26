import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardFooter } from 'jobseeker-ui'
import ScrollVisibilityContainer from './ScrollVisibilityContainer'

type PropTypes = {
  header: React.ReactNode
  body: React.ReactNode
  footer: React.ReactNode
}

const MainCard: React.FC<PropTypes> = ({ header, body, footer }) => {
  const ref = useRef<any>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const handleresize = (): void => {
      if (ref.current) {
        const distanceFromTop = ref.current.getBoundingClientRect().top + window.pageYOffset
        setDistance(distanceFromTop)
      }
    }

    handleresize()

    window.addEventListener('resize', handleresize)

    return () => {
      window.removeEventListener('resize', handleresize)
    }
  }, [])

  return (
    <>
      <ScrollVisibilityContainer distance={distance - 64} containerClassName="border-b">
        <div className="grid grid-cols-1 rounded-t-lg bg-white/80 backdrop-blur">{header}</div>
      </ScrollVisibilityContainer>

      <Card>
        <div className="grid grid-cols-1 rounded-t-lg border-b bg-white/80 backdrop-blur">{header}</div>

        <CardBody ref={ref} className="overflow-x-auto p-0">
          {body}
        </CardBody>

        <CardFooter>{footer}</CardFooter>
      </Card>
    </>
  )
}

export default MainCard
