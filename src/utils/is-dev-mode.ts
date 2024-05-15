export function isDevMode(host: string) {
  return !!(
    host.split('.')[0]?.split('-')?.[0] === 'dev' ||
    host.startsWith('http://192.') ||
    host.startsWith('http://172.') ||
    host.startsWith('http://localhost')
  )
}
