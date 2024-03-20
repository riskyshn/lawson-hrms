export default function urlToFilename(url: string): string {
  const path = new URL(url).pathname
  const filename = path.substring(path.lastIndexOf('/') + 1)
  const decodedFilename = decodeURIComponent(filename)
  return decodedFilename
}
