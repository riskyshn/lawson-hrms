import { usePayrollStore } from '@/store'

export default function getCategory(input?: string): string {
  const {
    master: { pph21 },
  } = usePayrollStore.getState()

  const mapping: Record<string, string> = {}

  for (const i of pph21) {
    mapping[i.name] = i.category
  }

  // @ts-expect-error
  return mapping[input] || ''
}
