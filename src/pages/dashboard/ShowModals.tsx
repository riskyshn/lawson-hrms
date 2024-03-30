import { Button, Modal, ModalHeader } from 'jobseeker-ui'
import { useState } from 'react'

const ShowModals = () => {
  const [a, setA] = useState(false)

  return (
    <div>
      <Modal show={a} onClose={() => setA(false)}>
        <ModalHeader subTitle="This is subtitle modal" onClose={() => setA(false)}>
          Default Modal
        </ModalHeader>
      </Modal>

      <Button onClick={() => setA(true)}>Default</Button>
    </div>
  )
}

export default ShowModals
