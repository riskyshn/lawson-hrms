import Container from '@/components/UI/Container'
import CreateJobStep from './CreateJobStep'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
}

const CreateJobLayout = ({ children }: Props) => {
  return (
    <>
      <Container>
        <CreateJobStep />
        <>{children}</>
      </Container>
    </>
  )
}

export default CreateJobLayout
