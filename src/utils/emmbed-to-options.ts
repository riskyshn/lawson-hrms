import type { IGeneralDataEmmbed } from '@/types'
import { OptionProps } from '@jshrms/ui'

export default function emmbedToOptions(resp?: { content?: Array<IGeneralDataEmmbed> }): OptionProps[] {
  return (
    resp?.content?.map((el) => ({
      // @ts-expect-error
      label: el.name || el.title || el.label,
      value: el.oid,
    })) || []
  )
}
