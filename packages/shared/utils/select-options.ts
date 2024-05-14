import * as yup from 'yup'

export function genOptions(items: ([number | string, string] | string)[]) {
  return items.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item
          .toLowerCase()
          .split('_')
          .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
          .join(' '),
        value: item,
      }
    }
    const [value, label] = item

    return { label, value: String(value) }
  })
}

export function genYupOption(label: string) {
  return yup
    .object()
    .shape({ label: yup.string(), value: yup.string().label(label).required() })
    .label(label)
}

export function yupOptionError(item: any) {
  return item?.value?.message || item?.message
}
