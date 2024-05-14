import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { AsyncSelect, Select } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genOptions from '@/utils/gen-options'

const FilterForm: React.FC<{ show?: boolean }> = ({ show }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [gender, setGender] = useOptionSearchParam('gender')
  const [city, setCity] = useOptionSearchParam('city')
  const [education, setEducation] = useOptionSearchParam('education')

  const minAge = Number(searchParams.get('min-age'))
  const maxAge = Number(searchParams.get('max-age'))

  const minRangeAge = Array.from({ length: 64 }, (_, i) => i + 17)
  const maxRangeAge = Array.from({ length: 64 }, (_, i) => i + 17)

  const minAgeOptions = minRangeAge.map((el) => ({
    label: el.toString(),
    value: el.toString(),
  }))

  const maxAgeOptions = maxRangeAge.map((el) => ({
    label: el.toString(),
    value: el.toString(),
  }))

  // Adjust max age options based on min age selection
  const adjustedMaxAgeOptions = minAge ? maxAgeOptions.filter((option) => Number(option.value) >= minAge) : maxAgeOptions

  // Adjust min age options based on max age selection
  const adjustedMinAgeOptions = maxAge ? minAgeOptions.filter((option) => Number(option.value) <= maxAge) : minAgeOptions

  const handleMinAgeChange = (value: string) => {
    const v = Number(value)
    if (v < 17) {
      searchParams.delete('min-age')
    } else {
      searchParams.set('min-age', v.toString())
    }
    setSearchParams(searchParams)
  }

  const handleMaxAgeChange = (value: string) => {
    const v = Number(value)
    console.log(value, v)
    if (v > 80 || v < (minAge || 17)) {
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
          <Select
            label="Gender"
            hideSearch
            withReset
            placeholder="All"
            options={genOptions(['male', 'female'])}
            value={gender?.value}
            onValueChange={setGender}
          />
          <AsyncSelect
            action={masterService.fetchCities}
            converter={emmbedToOptions}
            label="City"
            onValueChange={setCity}
            placeholder="All"
            value={city}
            withReset
            searchMinCharacter={3}
          />
          <AsyncSelect
            action={masterService.fetchEducationLevel}
            converter={emmbedToOptions}
            label="Education"
            onValueChange={setEducation}
            placeholder="All"
            value={education}
            withReset
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Min Age"
              placeholder="17"
              withReset
              onValueChange={handleMinAgeChange}
              options={adjustedMinAgeOptions}
              value={minAge.toString()}
            />
            <Select
              label="Max Age"
              placeholder="80"
              withReset
              onValueChange={handleMaxAgeChange}
              options={adjustedMaxAgeOptions}
              value={maxAge.toString()}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default FilterForm
