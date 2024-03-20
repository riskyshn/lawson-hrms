export default function getCategory(input?: string): string {
  const mapping = {
    'TK/0': 'A',
    'TK/1': 'A',
    'K/0': 'A',
    'TK/2': 'B',
    'TK/3': 'B',
    'K/1': 'B',
    'K/2': 'B',
    'K/3': 'C',
  }

  // @ts-expect-error
  return mapping[input] || ''
}
