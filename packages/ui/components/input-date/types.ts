import type { DatepickerType, DateType, DateValueType } from 'react-tailwindcss-datepicker'

type BaseInputProps = Omit<DatepickerType, 'containerClassName' | 'toggleIcon' | 'onChange' | 'value' | 'useRange' | 'asSingle'> & {
  className?: string
  error?: string
  inputClassName?: string
  toggleClassName?: string
  onChange?: DatepickerType['onChange']
}

export type BaseInputDateRangeProps = BaseInputProps & {
  value?: DateValueType
  onValueChange?: (value: { startDate: Date; endDate: Date }) => void
}

export type BaseInputDateProps = BaseInputProps & {
  value?: DateType
  onValueChange?: (value: Date) => void
}

export type InputDateProps = Omit<BaseInputDateProps, 'inputId' | 'inputName'> & {
  id?: string
  name?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}

export type InputDateRangeProps = Omit<BaseInputDateRangeProps, 'inputId' | 'inputName'> & {
  id?: string
  name?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}
