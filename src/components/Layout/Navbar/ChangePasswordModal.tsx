import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useToast } from '@jshrms/ui'
import * as yup from 'yup'
import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const schema = yup.object().shape({
  newPassword: yup.string().required().label('New Password'),
  newPasswordConfirmation: yup.string().oneOf([yup.ref('newPassword')], 'New Password confirmation is not match'),
  oldPassword: yup.string().required().label('Old Password'),
})

const ChangePasswordModal: React.FC<{ onClose?: () => void; show?: boolean }> = ({ onClose, show }) => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      await authService.changePassword(data)
      toast('Successfully update password', { color: 'success' })

      onClose?.()
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
      <ModalHeader onClose={onClose}>Change Password</ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input
          error={errors.oldPassword?.message}
          label="Old Password"
          labelRequired
          placeholder="••••••••"
          type="password"
          {...register('oldPassword')}
        />
        <Input
          error={errors.newPassword?.message}
          label="New Password"
          labelRequired
          placeholder="••••••••"
          type="password"
          {...register('newPassword')}
        />
        <Input
          error={errors.newPasswordConfirmation?.message}
          label="Confirm New Password"
          labelRequired
          placeholder="••••••••"
          type="password"
          {...register('newPasswordConfirmation')}
        />
      </div>
      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChangePasswordModal
