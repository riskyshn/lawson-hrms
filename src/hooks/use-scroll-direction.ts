import { useEffect, useState } from 'react'

const useScrollDirection = (): 'down' | 'up' | null => {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null)

  useEffect(() => {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop

    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollDirection
}

export default useScrollDirection