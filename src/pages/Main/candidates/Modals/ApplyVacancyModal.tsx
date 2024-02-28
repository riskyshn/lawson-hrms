import MainModal from '@/components/Elements/MainModal'
import { Button, Select } from 'jobseeker-ui'
import { useState } from 'react'

const ApplyVacancyModal = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => setShow(true)}>ApplyVacancyModal</Button>

      <MainModal className="max-w-xl py-12" show={show} onClose={() => setShow(false)}>
        <div className="mb-8">
          <h4 className="mb-2 text-center text-2xl font-semibold">Apply to Vacancy</h4>
          <p className="text-center">Move candidates to a more suitable job vacancy</p>
        </div>
        <Select label="Select Vacancy" placeholder="Back-End Developer, Cashier, Barista " options={[]} className="mb-3" />
        <Button block color="primary" className="mx-auto w-2/3">
          Select Vacancy
        </Button>
      </MainModal>
    </>
  )
}

export default ApplyVacancyModal
