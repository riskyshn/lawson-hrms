export default function numberToCurrency(number?: number) {
  const { format } = new Intl.NumberFormat()
  if (typeof number == 'number') {
    return `Rp ${format(number)}`
  }
  return ''
}
