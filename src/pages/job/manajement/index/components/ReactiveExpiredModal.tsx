import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputDate, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import moment from 'moment'
import * as yup from 'yup'
import { vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const schema = yup.object({
  expiredDate: yup.date().required().label('Join Date'),
})

type PropTypes = {
  item?: IVacancy | null
  onClose?: () => void
  onRefresh?: () => void
}

const ReactiveExpiredModal: React.FC<PropTypes> = ({ item, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ expiredDate }) => {
    if (!item) return
    setLoading(true)
    try {
      await vacancyService.updateVacancyStatus(item.oid, 'active', {
        expiredDate: moment(expiredDate).format('YYYY-MM-DD'),
      })
      toast(`Successfully reactive expired vacancy.`, { color: 'success' })
      onClose?.()
      onRefresh?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle="Edit expired date for this vacancy">
        Reactive Job Vacancy
      </ModalHeader>
      <div className="p-3">
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.expiredDate?.message}
          label="Expired Date"
          minDate={moment().add(1, 'day').toDate()}
          labelRequired
          onValueChange={(v) => {
            setValue('expiredDate', v)
            trigger('expiredDate')
          }}
          value={getValues('expiredDate')}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button className="min-w-24" color="error" disabled={loading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" disabled={loading} loading={loading} type="submit">
          Reactive
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ReactiveExpiredModal
