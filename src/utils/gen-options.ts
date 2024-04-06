export default function genOptions(items: (string | [string | number, string])[]) {
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

    return { label, value }
  })
}
