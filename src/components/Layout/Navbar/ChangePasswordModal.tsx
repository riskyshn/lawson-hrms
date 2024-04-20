import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  oldPassword: yup.string().required().label('Old Password'),
  newPassword: yup.string().required().label('New Password'),
  confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'New Password confirmation is not match'),
})

const ChangePasswordModal: React.FC<{ show?: boolean; onClose?: () => void }> = ({ show, onClose }) => {
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
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader onClose={onClose}>Change Password</ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input
          label="Old Password"
          labelRequired
          type="password"
          placeholder="••••••••"
          error={errors.oldPassword?.message}
          {...register('oldPassword')}
        />
        <Input
          label="New Password"
          labelRequired
          type="password"
          placeholder="••••••••"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <Input
          label="Confirm New Password"
          labelRequired
          type="password"
          placeholder="••••••••"
          error={errors.confirmNewPassword?.message}
          {...register('confirmNewPassword')}
        />
      </div>
      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChangePasswordModal
