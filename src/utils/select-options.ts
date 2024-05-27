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

export function genYupOption(label: string, options?: { required?: boolean }) {
  const { required = true } = options || {}
  const value = required
    ? yup.string().label(label).required()
    : (yup.string().label(label).optional().default('') as unknown as yup.StringSchema<string, yup.AnyObject, undefined, ''>)

  return yup.object({ label: yup.string(), value }).label(label)
}

export function yupOptionError(item: any) {
  return item?.value?.message || item?.message
}
