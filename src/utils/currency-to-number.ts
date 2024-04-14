export default function currencyToNumber(currency?: string | number | null): number {
  const currencyString = String(currency || '')
  const numericString = currencyString.replace(/[^\d.-]/g, '')
  let numericValue = parseFloat(numericString)
  if (isNaN(numericValue)) numericValue = 0
  return numericValue
}
