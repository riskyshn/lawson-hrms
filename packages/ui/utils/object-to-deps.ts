export default function objectToDeps(obj?: { [key: string]: any }): string {
  if (!obj || typeof obj !== 'object') {
    return ''
  }

  try {
    return JSON.stringify(obj)
  } catch (e) {
    return ''
  }
}
