import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { candidateService, vacancyService } from '@/services'
import { axiosErrorMessage, genYupOption, yupOptionError } from '@/utils'

type MoveAnotherVacancyModalProps = {
  applicantId?: string
  onRefresh?: () => void
  onClose?: () => void
  show?: boolean
}

const schema = yup.object().shape({ vacancy: genYupOption('Vacancy').required() })

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ applicantId, onRefresh, onClose, show }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await candidateService.moveToAnotherVacancy({
        applicantId,
        vacancyId: data.vacancy.value,
      })
      onRefresh?.()
      onClose?.()
      toast('Apply to another vacancy successfully created.', { color: 'success' })
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Move candidates to a more suitable job vacancy" onClose={onClose}>
        Move to Another Vacancy
      </ModalHeader>

      <div className="p-3">
        <AsyncSelect
          className="mb-3"
          label="Select Vacancy"
          labelRequired
          action={vacancyService.fetchVacancies}
          params={{ status: 'active' }}
          placeholder="Select Vacancy"
          converter={(res) => res.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
          error={yupOptionError(errors.vacancy)}
          value={getValues('vacancy')}
          onValueChange={(v) => {
            setValue('vacancy', v)
            trigger('vacancy')
          }}
        />
      </div>

      <ModalFooter>
        <Button type="button" className="w-24" color="error" variant="light" disabled={loading} onClick={onClose}>
          Close
        </Button>
        <Button type="submit" className="w-24" color="primary" disabled={loading} loading={loading}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default MoveAnotherVacancyModal
