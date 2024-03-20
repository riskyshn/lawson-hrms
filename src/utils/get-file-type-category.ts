export default function getFileTypeCategory(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase()

  if (extension) {
    if (extension.match(/(jpg|jpeg|png|gif|bmp)$/)) {
      return 'image'
    } else if (extension.match(/(mp4|avi|wmv|mov|flv)$/)) {
      return 'video'
    } else if (extension.match(/(doc|docx|xls|xlsx|ppt|pptx|pdf|txt)$/)) {
      return 'document'
    }
  }

  return 'unknown'
}
