import type { IGeneralDataEmmbed } from '@/types'
import { OptionProps } from '@jshrms/ui'

export default function emmbedToOption(data?: IGeneralDataEmmbed): OptionProps | undefined {
  if (!data) return undefined
  return {
    // @ts-expect-error
    label: data.name || data.title || data.label,
    value: data.oid,
  }
}
