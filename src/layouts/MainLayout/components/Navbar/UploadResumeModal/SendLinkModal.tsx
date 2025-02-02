import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { axiosErrorMessage } from '@/utils'

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
})

const SendLinkModal: React.FC<{ onClose?: () => void; onSubmited?: () => void; show?: boolean }> = ({ onClose, onSubmited, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      toast('Successfully send form link', { color: 'success' })

      onClose?.()
      onSubmited?.()
      setTimeout(() => {
        reset()
        setIsLoading(false)
      }, 500)
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!show}>
      <ModalHeader onClose={onClose} subTitle="Get candidate information by sending form to your candidates">
        Send Link
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input
          error={errors.email?.message}
          label="Candidate Email"
          labelRequired
          placeholder="i.e email@example.com"
          {...register('email')}
        />
      </div>
      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Send Link
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SendLinkModal
