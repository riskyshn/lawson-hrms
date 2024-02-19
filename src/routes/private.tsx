import { Outlet } from 'react-router-dom'

interface Props {
  children?: JSX.Element | JSX.Element[] | string
}

// @TODO
// a private middleware to handle is user authenticated is here

const Private = ({ children }: Props) => {
  return <Outlet />
}

export default Private
