import { Outlet } from 'react-router-dom'

type Props = {
  children?: string | JSX.Element | JSX.Element[] | undefined
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <>
      <div className={`w-full max-w-[1300px] px-8 ${className}`}>{children || <Outlet />}</div>
    </>
  )
}

export default Container
