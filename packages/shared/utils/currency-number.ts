export function currencyToNumber(currency?: null | number | string): number {
  const currencyString = String(currency || '')
  const numericString = currencyString.replace(/[^\d.-]/g, '')
  let numericValue = parseFloat(numericString)
  if (isNaN(numericValue)) numericValue = 0
  return numericValue
}

export function numberToCurrency(number?: number) {
  const { format } = new Intl.NumberFormat()
  if (typeof number == 'number') {
    return `Rp ${format(number)}`
  }
  return ''
}
