export default function truncateFilename(filename: string, maxLength: number = 40): string {
  if (filename.length <= maxLength) {
    return filename
  } else {
    const extensionIndex = filename.lastIndexOf('.')
    const extension = filename.substring(extensionIndex + 1)
    const truncatedName = filename.substring(0, maxLength - 7 - extension.length) // 7 accounts for '..._.'
    return truncatedName + '..._.' + extension
  }
}
