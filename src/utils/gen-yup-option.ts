import * as yup from 'yup'

export default function genYupOption(label: string) {
  return yup
    .object()
    .shape({ label: yup.string(), value: yup.string().label(label).required() })
    .label(label)
}
