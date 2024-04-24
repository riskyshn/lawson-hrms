import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
})

const SendLinkModal: React.FC<{ show?: boolean; onClose?: () => void; onSubmited?: () => void }> = ({ show, onClose, onSubmited }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Get candidate information by sending form to your candidates" onClose={onClose}>
        Send Link
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input
          label="Candidate Email"
          labelRequired
          placeholder="i.e email@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="min-w-24" disabled={isLoading} loading={isLoading}>
          Send Link
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SendLinkModal
