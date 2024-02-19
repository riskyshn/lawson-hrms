interface Props {
  children?: JSX.Element | JSX.Element[] | string
}

// @TODO
// a guest middleware to handle is user authenticated is here

const Guest = ({ children }: Props) => {
  return <>{children}</>
}

export default Guest
