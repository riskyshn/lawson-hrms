export type Config = {
  decimalSeparator?: ',' | '.'
  fixed?: number
}

const defaultConfig: Config = {
  decimalSeparator: '.',
  fixed: 0,
}

export default function shortenNumber(num: number | string | undefined, config = defaultConfig) {
  if (!num || num.toString().trim() === '') {
    return '0'
  }
  const { decimalSeparator = ',', fixed } = config
  const parsedNum = typeof num === 'string' ? Number(num) : num

  const suffixes = ['', 'k', 'm', 'b', 't']
  let suffixIndex = 0
  let formattedNum = parsedNum
  while (formattedNum >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedNum /= 1000
    suffixIndex++
  }
  return formattedNum.toFixed(fixed).replace('.', decimalSeparator) + suffixes[suffixIndex]
}
