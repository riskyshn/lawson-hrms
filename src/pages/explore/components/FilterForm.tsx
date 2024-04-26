import Container from '@/components/Elements/Layout/Container'
import { Select } from 'jobseeker-ui'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const rangeAge = Array.from({ length: 64 }, (_, i) => i + 17)

const ageOptions = rangeAge.map((el) => ({ label: el.toString(), value: el.toString() }))

const FilterForm: React.FC<{ show?: boolean }> = ({ show }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const minAge = Number(searchParams.get('min-age'))
  const maxAge = Number(searchParams.get('max-age'))

  const handleMinAgeChange = (value: string) => {
    const v = Number(value)
    if (v < 17) {
      searchParams.delete('min-age')
    } else {
      searchParams.set('min-age', v.toString())
    }
    setSearchParams(searchParams)
  }

  const handleMaxAgeChange = (value: string | number) => {
    const v = Number(value)
    if (v > 80) {
      searchParams.delete('max-age')
    } else {
      searchParams.set('max-age', v.toString())
    }
    setSearchParams(searchParams)
  }

  if (!show) return null

  return (
    <div className="flex items-center justify-center border-b bg-white transition-spacing">
      <Container>
        <div className="grid grid-cols-1 gap-3 py-3 md:grid-cols-2 xl:grid-cols-4">
          <Select label="Gender" options={[]} />
          <Select label="City" options={[]} />
          <Select label="Education" options={[]} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Min Age" value={minAge.toString()} onValueChange={handleMinAgeChange} options={ageOptions} />
            <Select label="Max Age" value={maxAge.toString()} onValueChange={handleMaxAgeChange} options={ageOptions} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default FilterForm
