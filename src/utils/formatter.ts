export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
}

export function shortenNumber(num: number | string | undefined, config = { decimalSeparator: '.', fixed: 0 }) {
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

export function truncateFilename(filename: string, maxLength: number = 40): string {
  if (filename.length <= maxLength) {
    return filename
  } else {
    const extensionIndex = filename.lastIndexOf('.')
    const extension = filename.substring(extensionIndex + 1)
    const truncatedName = filename.substring(0, maxLength - 7 - extension.length) // 7 accounts for '..._.'
    return truncatedName + '..._.' + extension
  }
}

export function urlToFilename(url: string): string {
  const path = new URL(url).pathname
  const filename = path.substring(path.lastIndexOf('/') + 1)
  const decodedFilename = decodeURIComponent(filename)
  return decodedFilename
}
